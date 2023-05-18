import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { RankingService } from './ranking.service';
;

@ApiTags('ranking')
@Controller('ranking')
export class RankingController {
  constructor(
    private readonly rankingService: RankingService
  ) {}

  @Get()
  @ApiBearerAuth()
  @Public() //coloquei aqui só enquanto não tem login integrado
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
