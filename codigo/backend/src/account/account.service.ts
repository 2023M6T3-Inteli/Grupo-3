/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) { }

  async updateUserTags(userId: string, tags: string[]): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    console.log(user);

    // if (user && user.isFirstLogin) {
    //   // Atualize as tags do usuário
    //   await this.prisma.user.update({
    //     where: { id: userId },
    //     data: {
    //       isFirstLogin: false, // Atualize o campo isFirstLogin para false
    //     },
    //   });
    // } else {
    //   throw new Error('Usuário inválido ou não é o primeiro login.');
    // }
  }

}
