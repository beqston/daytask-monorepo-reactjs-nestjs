import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshSecret:process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtAccessExpiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRES,
  jwtRefreshExpiresIn:process.env.JWT_REFRESH_TOKEN_EXPIRES,
  databaseUrl:process.env.DATABASE_URL,
  directUrl:process.env.DIRECT_URL,
  cloudinaCloudryName:process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey:process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret:process.env.CLOUDINARY_API_SECRET,
  googleClientSecret:process.env.GOOGLE_CLIENT_SECRET,
  googleClientId:process.env.GOOGLE_CLIENT_ID,
}));