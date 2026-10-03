import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.tsrtagey";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthStrategy } from "./strategies/jwt-auth.strategy";
import { AuthController } from "./auth.controller";

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_ACCESS_TOKEN_SECRET') as string,
        signOptions: { expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRES} as any,
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}