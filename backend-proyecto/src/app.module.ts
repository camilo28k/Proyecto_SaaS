import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 1. Importa esto
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { OperationsModule } from './operations/operations.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module'; // 2. Asegúrate de importar tu módulo de Prisma

@Module({
  imports: [
    // 3. Configura el módulo para que lea el archivo .env globalmente
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PrismaModule, // 4. Importa tus módulos
    UsersModule, 
    ServicesModule, 
    OperationsModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}