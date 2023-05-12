import { ApiProperty } from '@nestjs/swagger';
import { Comments, Likes, Tags, UserPost } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDTO extends User {
  @ApiProperty({ example: 'haxb3yziw1', description: 'id' })
  @IsOptional()
  id?: string;

  @IsEmail()
  @ApiProperty({ example: 'email@delltechnologies.com', description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'haxb3yziw1', description: 'password' })
  hashedPassword: string;

  @IsString()
  @ApiProperty({ example: 'haxb3yziw1', description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Annie', description: 'arroba' })
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'haxb3yziw1.png', description: 'Image' })
  image?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'San Francisco', description: 'Location' })
  location?: string;

  @IsBoolean()
  @ApiProperty({ example: true, description: 'terms' })
  acceptTerms: boolean;

  @IsBoolean()
  @ApiProperty({ example: false, description: 'Site Admin' })
  admin?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Software Engineer', description: 'Occupation' })
  role?: string;

  @IsString()
  @ApiProperty({ example: 'cv.pdf', description: 'Curriculo' })
  @IsOptional()
  curriculum?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: 1,
    description: 'Score according to number of posts',
  })
  score?: number;

  @ApiProperty({ example: [3], description: 'Usuário deu 3 likes' })
  likes?: Likes[];

  @ApiProperty({
    example: ['Muito bom', 'Muito ruim'],
    description: 'Comentários em post',
  })
  @IsOptional()
  comments?: Comments[];

  @ApiProperty({
    example: ['Python', 'JavaScript'],
    description: 'Tags do usuário',
  })
  @IsOptional()
  tags?: Tags[];

  @ApiProperty({
    example: ['post 1', 'post 2', 'post 3'],
    description: 'Posts do usuário',
  })
  @IsOptional()
  userPosts?: UserPost[];
}
