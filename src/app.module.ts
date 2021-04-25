import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule } from './config/dbConfig';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
// import {TypeOrmModule};



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true
    }),
    // ConfigModule.forRoot(),
    // UserModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
