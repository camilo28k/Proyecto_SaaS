import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('operations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Post()
@Roles('ADMIN', 'OPERATOR')
@UseGuards(JwtAuthGuard, RolesGuard)
create(@Body() createOperationDto: CreateOperationDto) {
  return this.operationsService.create(createOperationDto);
}

  @Get()
@Roles('ADMIN', 'OPERATOR')
findAll() {
  return this.operationsService.findAll();
}

@Get('my')
@Roles('CLIENT')
getMyOperations(@Req() req) {
  return this.operationsService.findByUser(
    req.user.sub,
  );
}

  @Get(':id')
@Roles('ADMIN', 'OPERATOR',)
findOne(@Param('id') id: string) {
  return this.operationsService.findOne(id);
}

  @Patch(':id')
@Roles('ADMIN', 'OPERATOR')
update(
  @Param('id') id: string,
  @Body() updateOperationDto: UpdateOperationDto,
) {
  return this.operationsService.update(id, updateOperationDto);
}

  @Delete(':id')
@Roles('ADMIN', )
remove(@Param('id') id: string) {
  return this.operationsService.remove(id);
}
}