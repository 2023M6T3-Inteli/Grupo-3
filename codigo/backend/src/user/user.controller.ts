import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { User } from './entities/user.entity';
import { ForbiddenError } from '@casl/ability';
import { AdminGuard } from 'src/guards/admin.guard';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private abilityFactory: CaslAbilityFactory,
  ) {}
  @Get()
  @ApiBearerAuth()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/profile/:username')
  @ApiBearerAuth()
  async findByUsername(@Param('username') username: string) {
    return this.userService.findByUsername(username);
  }

  @Patch(':id')
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }

  @Get('admin')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async getAdmin(@Request() req): Promise<User[]> {
    return this.userService.getAdminUsers();
  }

  @Delete('/delete/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string, @Request() req): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
