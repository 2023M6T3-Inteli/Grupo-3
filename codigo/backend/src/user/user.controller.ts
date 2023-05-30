/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  Post
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/admin.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CaslAbilityFactory } from '../casl/casl-ability.factory/casl-ability.factory';
import { ProfileUser } from './dto/pick-user.dto';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import { Profile } from 'passport';
import axios, { AxiosResponse } from 'axios';

async function login(username: string, password: string): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post('/api/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw error;
  }
}

const username = 'usuário';
const password = 'senha';

login(username, password)
  .then(data => {
    console.log('Login realizado com sucesso:', data);
    // Faça algo com os dados de login bem-sucedidos
  })
  .catch(error => {
    // Trate o erro de login aqui
  });

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
  async getAdmin(): Promise<ProfileUser[]> {
    return this.userService.getAdminUsers();
  }

  @Delete('/delete/:id')
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
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
