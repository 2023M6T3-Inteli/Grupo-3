import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { RankingService } from './ranking.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from '../../src/auth/guards/jwt-auth.guard';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService,
    private prisma: PrismaService,
  ) {}

  @Post(':userId/increment-score')
  @ApiResponse({
    status: 200,
    description: 'Everything works as expected',
    type: CreateRankingDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbbiden',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'This endpoint adds a score to the user who posts more',
  })
  async addScore(@Param('userId') userId: string): Promise<User> {
    return this.rankingService.addScore(userId);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
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
