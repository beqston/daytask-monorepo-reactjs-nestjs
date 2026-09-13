import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshSecret:process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtAccessExpiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRES,
  jwtRefreshExpires:process.env.JWT_REFRESH_TOKEN_EXPIRES,
  databaseUrl:process.env.DATABASE_URL,
  directUrl:process.env.DIRECT_URL
}));