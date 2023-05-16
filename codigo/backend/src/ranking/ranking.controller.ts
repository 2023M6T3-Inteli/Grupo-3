import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { RankingService } from './ranking.service';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private prisma: PrismaService,
  ) {}
  @Get()
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Everything works as expected',
    type: CreateRankingDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbbiden',
  })
  async findAll(): Promise<CreateRankingDto[]> {
    return this.rankingService.findAll();
  }
}
