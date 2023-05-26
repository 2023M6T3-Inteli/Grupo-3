import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { GetCurrentUser } from 'src/common/decorators';

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

  @Put('update/:tags')
  async update(
    @Param('tags') tagsID: string, 
    @Body() updateAccountDto: UpdateAccountDto,
    @GetCurrentUser() userID:string) {
    return this.accountService.update(userID, tagsID, updateAccountDto);
  }

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }*/
}
