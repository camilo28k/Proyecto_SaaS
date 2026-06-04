import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({
    example: 'cliente@saas.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario',
    minLength: 6,
  })
  @MinLength(6)
  password: string;
}