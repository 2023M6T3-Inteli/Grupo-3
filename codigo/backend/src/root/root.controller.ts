import { Controller, Get } from '@nestjs/common';
import { RootService } from './root.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
// Injeta a instância de 'RootService' no construtor
export class RootController {
  constructor(private readonly rootService: RootService) { }

// Define a rota GET na raiz utilizando o decorador '@Get'

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Everything works as expected'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbbiden',
  })
  health() {
    return "ping"
  }

// Define a rota GET '/health' utilizando o decorador '@Get'
  @Get("/health")
  @ApiResponse({
    status: 200,
    description: 'Everything works as expected'
  })
  @ApiResponse({
    status: 403,
    description: 'Forbbiden',
  })
  healthCheck() {
    return "pong"
  }
}