import { Injectable } from '@nestjs/common';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SavedService {
  constructor (private readonly prisma: PrismaService){}
  
  async getAllLikeds(){
    return await this.prisma.likes.findMany()
  }
  
}
