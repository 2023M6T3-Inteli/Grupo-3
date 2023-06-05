import {
  BadGatewayException,
  ForbiddenException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientKafka } from '@nestjs/microservices';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/binary';
import * as argon from 'argon2';
import { ProducerService } from 'src/kafka/producer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, AuthLoginDto } from './dto';
import { JwtPayload, Tokens } from './types';

export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private producerService: ProducerService,
    @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientKafka,
  ) {}

  async signupLocal(dto: AuthDto): Promise<Tokens> {
    await this.producerService.produce({
      topic: 'auth-consumer',
      messages: [{ value: JSON.stringify(dto)}],
    });

    const hashedPassword = await argon.hash(dto.password);

    const findUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (findUser) {
      throw new BadGatewayException('Email already exists!');
    }

    const findName = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (findName) {
      throw new BadGatewayException('Username already exists!');
    }

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hashedPassword,
          name: dto.name,
          username: dto.username,
          acceptTerms: dto.acceptTerms,
          admin: dto.admin,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async signinLocal(dto: AuthLoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (user.lastLogin == '') {
      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          lastLogin: new Date().toString(),
        },
      });
    } else {
      const lastLogin = new Date(user.lastLogin);
      const actualDate = new Date();

      const hours = Math.abs(lastLogin.valueOf() - actualDate.valueOf()) / 36e5;

      if (hours > 24 && hours < 48) {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: new Date().toString(),
            streak: user.streak + 1,
          },
        });
      } else if (hours > 48) {
        await this.prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            lastLogin: new Date().toString(),
            streak: 0,
          },
        });
      }
    }

    if (!user)
      throw new ForbiddenException(
        'E-mail or password does not exist. Access Denied!',
      );

    const passwordMatches = await argon.verify(
      user.hashedPassword,
      dto.password,
    );
    if (!passwordMatches)
      throw new ForbiddenException(
        'E-mail or password does not exist. Access Denied!',
      );

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
