import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    example: 'admin@saas.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Admin123*',
    description: 'Contraseña del usuario',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}