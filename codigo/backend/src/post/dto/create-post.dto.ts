import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
}

export class UpdatePostDTO {
  @ApiProperty({example: 'Updated Title', description:'Title' })
  @IsOptional()
  title: string

  @ApiProperty({example: 'Updated descrtption', description: 'Description'})
  @IsOptional()
  description: string

  @ApiProperty({ example: 'Updated Image', description: 'Image' })
  @IsOptional()
  image: string;

  @ApiProperty({ example: 'Updated Content', description: 'Content' })
  @IsOptional()
  content: string;
}
