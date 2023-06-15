/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { ProfileUser } from './dto/pick-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

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
  async findByUsername(@Param('username') username: string): Promise<ProfileUser> {
    return this.userService.findByUsername(username);
  }

  @Get('admin')
  // @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async getAdmin(@GetCurrentUserId() currentUser: string): Promise<ProfileUser[]> {
    return this.userService.getAdminUsers(currentUser);
  }

  @Delete('/delete/:id')
  // @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string, @GetCurrentUserId() currentUser: string): Promise<User> {
    return this.userService.deleteUser(id, currentUser);
  }

  @Get('setup')
  @ApiBearerAuth()
  async getAllTags() {
    return this.userService.getAllTags();
  }

  @Delete('tag/:userId')
  @ApiBearerAuth()
  async deleteTag(
    @Param('userId') userId: string,
    @Body() delTag: string,
    ): Promise<void> {
    await this.userService.deleteTag(userId, delTag);
  }

  @Delete('tags/:userId')
  @ApiBearerAuth()
  async deleteByUserId(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteByUserId(userId);
  }

  @Delete('tags/:postId')
  @ApiBearerAuth()
  async deleteByPostId(@Param('postId') postId: string): Promise<void> {
    await this.userService.deleteByPostId(postId);
  }

  @Post('setup/tags')
  @ApiBearerAuth()
  async updateUserTags(
    @GetCurrentUserId() userId: string,
    @Body() tags: string[],
  ): Promise<void> {
    await this.userService.updateUserTags(userId, tags);
  }
}
