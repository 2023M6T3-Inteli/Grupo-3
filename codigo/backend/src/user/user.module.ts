import { MiddlewareConsumer, Module, NestMiddleware } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AdminMiddleware } from 'src/auth/middlewares/admin-validation.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestMiddleware{
  use(req: any, res: any, next: (error?: any) => void) {
    throw new Error('Method not implemented.');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes('/users/delete/:id','/users/admin');
  }
}
