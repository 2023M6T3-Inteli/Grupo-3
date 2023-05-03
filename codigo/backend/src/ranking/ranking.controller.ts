import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { RankingService } from './ranking.service';
import { PrismaService } from 'prisma/prisma.service';

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService, private prisma: PrismaService) {}

  @Post(":id")
  @ApiResponse({
    status: 200,
    description: 'Everything works as expected',
    type: CreateRankingDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbbiden',
  })
  @ApiOperation({description: 'This endpoint adds a score to the user who posts more'})
  async addScore(@Param('id') id: string) {
    return this.rankingService.addScore(id);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Everything works as expected',
    type: CreateRankingDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbbiden',
  })
  findAll() {
    return this.rankingService.findAll();
  }
}
