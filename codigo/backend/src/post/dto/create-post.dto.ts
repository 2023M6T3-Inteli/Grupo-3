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

  @ApiProperty({ example: true, description: 'Is the post active or not?' })
  @IsOptional()
  active: boolean;

  @ApiProperty({
    type: () => CreateCommentDTO,
    isArray: true,
    description: 'Comments of the post',
  })
  @IsOptional()
  comments: CreateCommentDTO[];

  @ApiProperty({
    type: () => CreateUserPostDTO,
    description: 'This attribute references the user that is the owner',
  })
  @IsOptional()
  userPost: CreateUserDTO;

  @ApiProperty({ type: () => LikesDto, description: 'Likes' })
  @IsOptional()
  likes: LikesDto;
}
