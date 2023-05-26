import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) { }
  async update(userID: string, tagsID: string,updateAccountDto: UpdateAccountDto) {
    const user = await this.prisma.user.findUnique({
      where: {id: userID}
    })

    const tag = await this.prisma.tags.findUnique({
      where: {
        id: tagsID
      }
    });

    const updatedTag = await this.prisma.tags.update({
      where: {
        id: tagsID
      },
      data: {
       
      }
    });

    const preference = await this.prisma.user.update({
      where: { id: userID },
      data: { tags: {  } }

    })
    return preference
  }

}
