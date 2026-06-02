import { IsEmail, IsNotEmpty, IsString, IsEnum, MinLength } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
  CLIENT = 'CLIENT',
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
