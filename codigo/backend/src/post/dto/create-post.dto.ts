import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "@prisma/client";
import { IsOptional } from "class-validator";

export class CreatePostDTO {
  @ApiProperty({ example: 'My Post', description: 'Title' })
  @IsOptional()
  title: string;

  @ApiProperty({ example: 'This is my example post', description: 'Description' })
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

  @ApiProperty({example: 'This post is very interesting', description: 'Comments of the post'})
  @IsOptional()
  comments: Comments
}

