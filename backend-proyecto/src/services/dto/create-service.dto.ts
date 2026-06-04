import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Hosting Premium',
    description: 'Nombre del servicio',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example:
      'Servicio de alojamiento web con soporte 24/7',
    description: 'Descripción del servicio',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 49.99,
    description: 'Precio del servicio',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;
}