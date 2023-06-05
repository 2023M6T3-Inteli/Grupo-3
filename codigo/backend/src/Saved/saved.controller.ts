import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SavedService } from './saved.service';
import { CreateSavedDto } from './dto/create-saved.dto';
import { UpdateSavedDto } from './dto/update-saved.dto';

@Controller('saved')
export class SavedController {
  constructor(private readonly savedService: SavedService) {}

  @Get()
  findAll() {
    return this.savedService.getAllLikeds();
  }
}
