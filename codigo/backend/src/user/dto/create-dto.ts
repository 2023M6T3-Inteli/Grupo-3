import { ApiProperty } from '@nestjs/swagger';
import { Comments, Likes, MLTable, Tags, UserPost } from '@prisma/client';

export class CreateUserDTO {
  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  id?: string;

  @ApiProperty({example: 'email@delltechnologies.com', description: 'email'})
  email: string;

  @ApiProperty({example: 'haxb3yziw1', description: 'password'})
  hashedPassword: string;

  @ApiProperty({example: 'haxb3yziw1', description: 'name'})
  name: string;

  @ApiProperty({example: 'Annie', description: 'arroba'})
  username: string;

  @ApiProperty({example: 'haxb3yziw1', description: 'Image'})
  image?: string;

  @ApiProperty({example: 'San Francisco', description: 'Location'})
  location?: string;

  @ApiProperty({example: true, description: 'terms'})
  acceptTerms: boolean;

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  admin?: boolean;

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  role?: string;

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  curriculum?: string;

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  score?: number;

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  mltags: MLTable[];

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  likes?: Likes[];

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  comments?: Comments[];

  @ApiProperty({example: 'haxb3yziw1', description: 'id'})
  tags?: Tags[];

  @ApiProperty({example: 'post 1, 2 , 3', description: 'id'})
  userPosts?: UserPost[];
}
