jest.mock('@nestjs/jwt', () => ({
  JwtService: jest.fn().mockImplementation(() => ({
    sign: jest.fn(),
    signAsync: jest.fn(),
  })),
}));

jest.mock('@nestjs/config', () => ({
  ConfigService: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
  })),
}));

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { Roles } from '@prisma/client';
import {
  BadRequestException,
  NotAcceptableException,
} from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: jest.fn(), signAsync: jest.fn() } },
        { provide: ConfigService, useValue: { get: jest.fn() } },
        {
          provide: PrismaService,
          useValue: { user: { findUnique: jest.fn(), findFirst: jest.fn() } },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    const mockUser = { id: "1", email: 'test@test.com', role: Roles.USER };
    let mockResponse: Partial<Response>;

    beforeEach(() => {
      mockResponse = { cookie: jest.fn() };

      jest.spyOn(authService, 'generateTokens').mockResolvedValue({
        acsessToken: 'mocked-access-token',
        refreshToken: 'mocked-refresh-token',
      });

      (bcrypt.hash as jest.Mock).mockResolvedValue('mocked-hashed-refresh-token');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call generateTokens with correct payload', async () => {
      await authService.login(mockUser, mockResponse as Response);
      expect(authService.generateTokens).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
      });
    });

    it('should hash the refresh token with bcrypt', async () => {
      await authService.login(mockUser, mockResponse as Response);
      expect(bcrypt.hash).toHaveBeenCalledWith('mocked-refresh-token', 10);
    });

    it('should set access_token cookie with correct value and options', async () => {
      await authService.login(mockUser, mockResponse as Response);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'access_token',
        'mocked-access-token',
        { secure: true, httpOnly: true, sameSite: 'lax', maxAge: 15 * 60 * 1000 },
      );
    });

    it('should set refresh_token cookie with correct value and options', async () => {
      await authService.login(mockUser, mockResponse as Response);
      expect(mockResponse.cookie).toHaveBeenCalledWith(
        'refresh_token',
        'mocked-refresh-token',
        { secure: true, httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 },
      );
    });

    it('should call res.cookie exactly twice', async () => {
      await authService.login(mockUser, mockResponse as Response);
      expect(mockResponse.cookie).toHaveBeenCalledTimes(2);
    });

    it('should return correct response payload', async () => {
      const result = await authService.login(mockUser, mockResponse as Response);
      expect(result).toEqual({
        email: mockUser.email,
        role: mockUser.role,
        acsessToken: 'mocked-access-token',
        hashedRefreshToken: 'mocked-hashed-refresh-token',
      });
    });
  });

  describe('validateUser', () => {
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = authService['prisma']; // ან module.get(PrismaService), თუ ცალკე შეინახეთ
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw BadRequestException if email is missing', async () => {
    await expect(authService.validateUser('', 'password123')).rejects.toThrow(
      BadRequestException,
    );
    await expect(authService.validateUser('', 'password123')).rejects.toThrow(
      'Please provide email and password',
    );
  });

  it('should throw BadRequestException if password is missing', async () => {
    await expect(
      authService.validateUser('test@test.com', ''),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if user is not found', async () => {
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      authService.validateUser('notfound@test.com', 'password123'),
    ).rejects.toThrow(BadRequestException);

    await expect(
      authService.validateUser('notfound@test.com', 'password123'),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should throw NotAcceptableException if password is invalid', async () => {
    const mockUser = {
      id: "1",
      email: 'test@test.com',
      password: 'hashed-password',
      role: Roles.USER,
    };

    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      authService.validateUser('test@test.com', 'wrong-password'),
    ).rejects.toThrow(NotAcceptableException);

    await expect(
      authService.validateUser('test@test.com', 'wrong-password'),
    ).rejects.toThrow('Invalid credentials');
  });

  it('should return user without password on valid credentials', async () => {
    const mockUser = {
      id: "1",
      email: 'test@test.com',
      password: 'hashed-password',
      role: Roles.USER,
    };

    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const result = await authService.validateUser(
      'test@test.com',
      'correct-password',
    );

    expect(result).toEqual({
      id: "1",
      email: 'test@test.com',
      role:Roles.USER,
    });
    expect(result).not.toHaveProperty('password');
  });

  it('should call bcrypt.compare with correct arguments', async () => {
    const mockUser = {
      id: "1",
      email: 'test@test.com',
      password: 'hashed-password',
      role: Roles.USER,
    };

    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await authService.validateUser('test@test.com', 'my-password');

    expect(bcrypt.compare).toHaveBeenCalledWith(
      'my-password',
      'hashed-password',
    );
  });

  it('should call prisma.user.findUnique with correct email', async () => {
    (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      authService.validateUser('lookup@test.com', 'password'),
    ).rejects.toThrow();

    expect(prismaService.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'lookup@test.com' },
    });
  });
});
});