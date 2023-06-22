import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'lirios@dell.com', description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'adoleta', description: 'password' })
  password: string;

  @IsString()
  @ApiProperty({ example: 'Lirios', description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'lirios', description: 'username' })
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'myphoto.png', description: 'Image' })
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
    example: 0,
    description: 'Score according to number of posts',
  })
  score?: number;
}

export class AuthLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'yves@dell.com', description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'adoleta', description: 'password' })
  password: string;
}
