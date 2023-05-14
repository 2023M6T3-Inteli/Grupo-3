import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { LoginRequestBody } from './models/LoginRequestBody';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() {email, password}: LoginRequestBody, @Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @Get('signout')
  async signout(@Request() req: AuthRequest, @Response() res: AuthRequest ){
    return this.authService.logout(req, res)
  }
}
