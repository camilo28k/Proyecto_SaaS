import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Operations')
@ApiBearerAuth('JWT-auth')
@Controller('operations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OperationsController {
  constructor(
    private readonly operationsService: OperationsService,
  ) {}

  @Post()
  @Roles('ADMIN', 'OPERATOR')
  @ApiOperation({
    summary: 'Crear una operación',
  })
  @ApiResponse({
    status: 201,
    description:
      'Operación creada correctamente',
  })
  create(
    @Body()
    createOperationDto: CreateOperationDto,
  ) {
    return this.operationsService.create(
      createOperationDto,
    );
  }

  @Get()
  @Roles('ADMIN', 'OPERATOR')
  @ApiOperation({
    summary:
      'Obtener todas las operaciones',
  })
  @ApiResponse({
    status: 200,
    description:
      'Lista de operaciones',
  })
  findAll() {
    return this.operationsService.findAll();
  }

  @Get('my')
  @Roles('CLIENT', 'ADMIN', 'OPERATOR')
  @ApiOperation({
    summary:
      'Obtener mis operaciones',
  })
  @ApiResponse({
    status: 200,
    description:
      'Operaciones del usuario autenticado',
  })
  getMyOperations(@Req() req) {
    return this.operationsService.findByUser(
      req.user.sub,
    );
  }

  @Get(':id')
  @Roles('ADMIN', 'OPERATOR')
  @ApiOperation({
    summary:
      'Obtener operación por ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'Operación encontrada',
  })
  @ApiResponse({
    status: 404,
    description:
      'Operación no encontrada',
  })
  findOne(@Param('id') id: string) {
    return this.operationsService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'OPERATOR')
  @ApiOperation({
    summary:
      'Actualizar una operación',
  })
  @ApiResponse({
    status: 200,
    description:
      'Operación actualizada correctamente',
  })
  update(
    @Param('id') id: string,
    @Body()
    updateOperationDto: UpdateOperationDto,
  ) {
    return this.operationsService.update(
      id,
      updateOperationDto,
    );
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({
    summary:
      'Eliminar una operación',
  })
  @ApiResponse({
    status: 200,
    description:
      'Operación eliminada correctamente',
  })
  remove(@Param('id') id: string) {
    return this.operationsService.remove(id);
  }
}