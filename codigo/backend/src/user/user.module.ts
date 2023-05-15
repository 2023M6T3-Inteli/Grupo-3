import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { CaslModule } from 'src/casl/casl.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [CaslModule],
  controllers: [UserController],
  providers: [
    UserService,
    CaslAbilityFactory,
    // { provide: APP_GUARD, useClass: AdminGuard },
  ],
  exports: [UserService],
})
export class UserModule {}
