import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { OperationsModule } from './operations/operations.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    PrismaModule, 
    UsersModule, 
    ServicesModule, 
    OperationsModule, 
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}