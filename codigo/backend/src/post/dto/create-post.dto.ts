import { ApiProperty } from "@nestjs/swagger";
import { Comments } from "@prisma/client";

export class CreatePostDTO {
  @ApiProperty({ example: 'My Post', description: 'Title' })
  title: string;

  @ApiProperty({ example: 'This is my example post', description: 'Description' })
  description: string;

  @ApiProperty({ example: 'image.jpeg', description: 'Image of the content' })
  image: string;

  @ApiProperty({ example: 'Content of the post', description: 'Content' })
  content: string;

  @ApiProperty({ example: true, description: 'Is the post active or not?' })
  active: boolean;

  @ApiProperty({example: 'This post is very interesting', description: 'Comments of the post'})
  comments: Comments
}

