/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetCurrentUser } from 'src/common/decorators';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /*@Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }*/

  @Post('setup/tags')
  async updateUserTags(
    @GetCurrentUserId() userId: string,
    @Body() tags: string[],
  ): Promise<void> {
    await this.accountService.updateUserTags(userId, tags);
  }

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }*/
}
