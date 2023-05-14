import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'gabbsss@delltechnologies.com',
    description: 'email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @ApiProperty({ example: 'gabriel', description: 'password' })
  password: string;
}
