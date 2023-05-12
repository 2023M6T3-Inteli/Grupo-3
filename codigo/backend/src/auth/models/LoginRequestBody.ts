import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  password: string;
}