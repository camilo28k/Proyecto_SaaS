import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Services')
@ApiBearerAuth('JWT-auth')
@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
  ) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Crear un servicio',
  })
  @ApiResponse({
    status: 201,
    description: 'Servicio creado correctamente',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: 403,
    description: 'No tiene permisos',
  })
  create(
    @Body() createServiceDto: CreateServiceDto,
  ) {
    return this.servicesService.create(
      createServiceDto,
    );
  }

  @Get()
  @Roles('ADMIN', 'OPERATOR', 'CLIENT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Obtener todos los servicios',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de servicios',
  })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'OPERATOR', 'CLIENT')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Obtener un servicio por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado',
  })
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Actualizar un servicio',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio actualizado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado',
  })
  update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.update(
      id,
      updateServiceDto,
    );
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({
    summary: 'Eliminar un servicio',
  })
  @ApiResponse({
    status: 200,
    description: 'Servicio eliminado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Servicio no encontrado',
  })
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}