import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';

@Injectable()
export class OperationsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateOperationDto) {
    return this.prisma.operation.create({
      data: {
        finalPrice: data.finalPrice, // Cambiado de 'status' a 'finalPrice'
        user: {
          connect: { id: data.userId },
        },
        service: {
          connect: { id: data.serviceId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.operation.findMany({
      include: {
        user: true,
        service: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.operation.findUnique({
      where: { id },
      include: {
        user: true,
        service: true,
      },
    });
  }

  update(id: string, data: UpdateOperationDto) {
    return this.prisma.operation.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.operation.delete({ where: { id } });
  }
  findByUser(userId: string) {
  return this.prisma.operation.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      service: true,
    },
  });
}
}