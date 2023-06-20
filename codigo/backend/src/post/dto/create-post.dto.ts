/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDTO } from '../../user/dto/create-dto';
import {
  CreateCommentDTO,
  CreateUserPostDTO,
  LikesDto,
} from './create-comment.dto';

export class CreatePostDTO {
  @ApiProperty({ example: 'My Post', description: 'Title' })
  @IsOptional()
  title: string;

  @ApiProperty({ example: '["React", "NodeJS"]', description: 'Tags' })
  @IsOptional()
  tags: string[];

  @ApiProperty({
    example: 'This is my example post',
    description: 'Description',
  })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'image.jpeg', description: 'Image of the content' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 'Content of the post', description: 'Content' })
  @IsOptional()
  content: string;
}
