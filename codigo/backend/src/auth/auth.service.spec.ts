import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ProducerService } from '../kafka/producer.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { Tokens } from './types';

const user = {
  email: 'test@gmail.com',
  password: 'super-secret-password',
};

// const producerServiceMock = {
//   produce: jest.fn(),
// };

const prisma = {
  user: {
    updateMany: jest.fn(),
  },
};

describe('Auth Flow', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let producer: ProducerService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        // ClientsModule.register([
        //   { name: 'AUTH_MICROSERVICE', transport: Transport.KAFKA },
        // ]),
      ],
      providers: [
        AuthService,
        ProducerService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    prisma = moduleRef.get<PrismaService>(PrismaService);
    authService = moduleRef.get<AuthService>(AuthService);
    producer = moduleRef.get<ProducerService>(ProducerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    // it('should signup', async () => {
    //   const tokens: AuthDto = {
    //     email: user.email,
    //     password: user.password,
    //     name: '',
    //     username: '',
    //     acceptTerms: true,
    //   };
    //   await authService.signupLocal(tokens);

    //   jest.spyOn(producer, 'produce').mockResolvedValue();
    //   jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

    //   expect(producerServiceMock.produce).toHaveBeenCalledWith({
    //     topic: 'auth-consumer',
    //     messages: [{ value: JSON.stringify(tokens) }],
    //   });
    // });

    it('should throw on duplicate user signup', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signupLocal({
          email: user.email,
          password: user.password,
          name: '',
          username: '',
          acceptTerms: true,
        });
      } catch (error) {
        expect(error.status).toBe(undefined);
      }

      expect(tokens).toBeUndefined();
    });
  });

  describe('signin', () => {
    it('should throw if no existing user', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signinLocal({
          email: user.email,
          password: user.password,
        });
      } catch (error) {
        expect(error.status).toBe(undefined);
      }

      expect(tokens).toBeUndefined();
    });

    // it('should login', async () => {
    //   await authService.signupLocal({
    //     email: user.email,
    //     password: user.password,
    //     name: '',
    //     username: '',
    //     acceptTerms: false,
    //   });

    //   const tokens = await authService.signinLocal({
    //     email: user.email,
    //     password: user.password,
    //   });

    //   expect(tokens.access_token).toBeTruthy();
    //   expect(tokens.refresh_token).toBeTruthy();
    // });

    it('should throw if password incorrect', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.signinLocal({
          email: user.email,
          password: user.password + 'a',
        });
      } catch (error) {
        expect(error.status).toBe(undefined);
      }

      expect(tokens).toBeUndefined();
    });
  });

  describe('logout', () => {
    // it('should pass if call to non existent user', async () => {
    //   const result = await authService.logout('4');
    //   expect(prisma.user.updateMany).toHaveBeenCalledWith({
    //     where: {
    //       id: '4',
    //       hashedRt: {
    //         not: null,
    //       },
    //     },
    //     data: {
    //       hashedRt: null,
    //     },
    //   });
    //   expect(result).toBeDefined();
    // });

    // it('should logout', async () => {
    //   await authService.signupLocal({
    //     email: user.email,
    //     password: user.password,
    //     name: '',
    //     username: '',
    //     acceptTerms: false,
    //   });

    //   let userFromDb: User | null;

    //   userFromDb = await prisma.user.findFirst({
    //     where: {
    //       email: user.email,
    //     },
    //   });
    //   expect(userFromDb?.hashedRt).toBeTruthy();

    //   // logout
    //   await authService.logout(userFromDb!.id);

    //   userFromDb = await prisma.user.findFirst({
    //     where: {
    //       email: user.email,
    //     },
    //   });

    //   expect(userFromDb?.hashedRt).toBeFalsy();
    // });
  });

  describe('refresh', () => {
    it('should throw if no existing user', async () => {
      let tokens: Tokens | undefined;
      try {
        tokens = await authService.refreshTokens('1', '');
      } catch (error) {
        expect(error.status).toBe(undefined);
      }

      expect(tokens).toBeUndefined();
    });

    // it('should throw if user logged out', async () => {
    //   // signup and save refresh token
    //   const _tokens = await authService.signupLocal({
    //     email: user.email,
    //     password: user.password,
    //     name: '',
    //     username: '',
    //     acceptTerms: false,
    //   });

    //   const rt = _tokens.refresh_token;

    //   // get user id from refresh token
    //   // also possible to get using prisma like above
    //   // but since we have the rt already, why not just decoding it
    //   const decoded = decode(rt);
    //   const userId = String(decoded?.sub);

    //   // logout the user so the hashedRt is set to null
    //   await authService.logout(userId);

    //   let tokens: Tokens | undefined;
    //   try {
    //     tokens = await authService.refreshTokens(userId, rt);
    //   } catch (error) {
    //     expect(error.status).toBe(undefined);
    //   }

    //   expect(tokens).toBeUndefined();
    // });

    // it('should throw if refresh token incorrect', async () => {
    //   const _tokens = await authService.signupLocal({
    //     email: user.email,
    //     password: user.password,
    //     name: '',
    //     username: '',
    //     acceptTerms: false,
    //   });
    //   console.log({
    //     _tokens,
    //   });

    //   const rt = _tokens.refresh_token;

    //   const decoded = decode(rt);
    //   const userId = String(decoded?.sub);

    //   let tokens: Tokens | undefined;
    //   try {
    //     tokens = await authService.refreshTokens(userId, rt + 'a');
    //   } catch (error) {
    //     expect(error.status).toBe(403);
    //   }

    //   expect(tokens).toBeUndefined();
    // });

    // it('should refresh tokens', async () => {
    //   // log in the user again and save rt + at
    //   const _tokens = await authService.signupLocal({
    //     email: user.email,
    //     password: user.password,
    //     name: '',
    //     username: '',
    //     acceptTerms: false,
    //   });

    //   const rt = _tokens.refresh_token;
    //   const at = _tokens.access_token;

    //   const decoded = decode(rt);
    //   const userId = String(decoded?.sub);

    //   // since jwt uses seconds signature we need to wait for 1 second to have new jwts
    //   await new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(true);
    //     }, 1000);
    //   });

    //   const tokens = await authService.refreshTokens(userId, rt);
    //   expect(tokens).toBeDefined();

    //   // refreshed tokens should be different
    //   expect(tokens.access_token).not.toBe(at);
    //   expect(tokens.refresh_token).not.toBe(rt);
    // });
  });
});
