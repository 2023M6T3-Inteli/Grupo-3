import {
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  logout(req, res) {
    res.send({ message: 'Successfully logged out' });
  }
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async login(user: User): Promise<UserToken> {
    //Transforma o user em JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.username,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      //precisa checkar se a senha informada está de acordo com a hash do banco de dados
      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword,
      );

      if (isPasswordValid) {
        return {
          ...user,
          hashedPassword: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
