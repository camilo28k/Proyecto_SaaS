import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
  })
  @ApiResponse({
    status: 201,
    description:
      'Usuario registrado correctamente',
  })
  register(
    @Body()
    registerAuthDto: RegisterAuthDto,
  ) {
    return this.authService.register(
      registerAuthDto,
    );
  }

  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
  })
  @ApiResponse({
    status: 201,
    description:
      'Token JWT generado correctamente',
  })
  login(
    @Body()
    loginAuthDto: LoginAuthDto,
  ) {
    return this.authService.login(
      loginAuthDto,
    );
  }
}