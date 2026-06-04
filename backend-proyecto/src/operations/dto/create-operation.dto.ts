import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  Min,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateOperationDto {
  @ApiProperty({
    example:
      '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID del usuario que realiza la operación',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example:
      '660e8400-e29b-41d4-a716-446655440111',
    description:
      'ID del servicio asociado a la operación',
  })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({
    example: 150000,
    description:
      'Precio final de la operación',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  finalPrice: number;
}