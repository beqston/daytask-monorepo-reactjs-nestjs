import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env.validation';
import authConfig from './config/auth.config';

@Module({
  imports: [AuthModule, 
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env",
      validationSchema:envValidationSchema,
      load:[authConfig],
      validationOptions:{
        
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
