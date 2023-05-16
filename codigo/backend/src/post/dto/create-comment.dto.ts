import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCommentDTO {
  @ApiProperty({
    example: 'This post is very interesting',
    description: 'Comment made by an user to a post',
  })
  content: string;
}


export class CreateUserPostDTO {
  @ApiProperty({example: 'xansxyas', description: 'User ID'})
  @IsOptional()
  userID: string

  @IsOptional()
  id: string

  @IsOptional()
  postID: string
}