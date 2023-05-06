import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO {
  @ApiProperty({
    example: 'This post is very interesting',
    description: 'Comment made by an user to a post',
  })
  content: string;
}
