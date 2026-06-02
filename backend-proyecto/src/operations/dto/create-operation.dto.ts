import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateOperationDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @IsNumber()
  @Min(0)
  finalPrice: number;
}