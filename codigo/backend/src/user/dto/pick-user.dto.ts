import { ApiProperty } from "@nestjs/swagger";
import { Comments, Likes, Tags, UserPost } from "@prisma/client";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class ProfileUser {
    @ApiProperty({ example: 'haxb3yziw1', description: 'id' })
    @IsOptional()
    id?: string;
  
    @IsEmail()
    @ApiProperty({ example: 'email@delltechnologies.com', description: 'email' })
    email: string;
  
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
  
    likes?: Likes[];
  
    @IsOptional()
    comments?: Comments[];
  
    @IsOptional()
    tags?: Tags[];
  
    @IsOptional()
    userPosts?: UserPost[];
}