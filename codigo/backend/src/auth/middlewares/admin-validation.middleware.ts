import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';

export class AdminMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      throw new UnauthorizedException('Admin authorization required.');
    }

    next();
  }
}
