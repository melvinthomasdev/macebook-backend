import { Module } from '@nestjs/common';
import { ConfigModule } from './config/dbConfig';

@Module({
  imports: [
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
