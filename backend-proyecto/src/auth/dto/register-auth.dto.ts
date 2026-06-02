import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}