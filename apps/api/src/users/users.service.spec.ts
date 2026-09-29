import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let mockPrismaService: {
    user: {
      findFirst: jest.Mock;
      create: jest.Mock;
    };
  };

  beforeEach(async () => {
    mockPrismaService = {
      user: {
        findFirst: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createUserDto = {
      fullName: 'Jhon dhoe',
      email: 'jhondoe@gm.io',
      password: 'password123',
    };

    it('should throw ConflictException if email already exists', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({
        id: "1",
        email: 'jhondoe@gm.io',
      });

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(createUserDto)).rejects.toThrow(
        'Email already exist!',
      );
    });

    it('should check email existence with correct query', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      mockPrismaService.user.create.mockResolvedValue({
        id:"1",
        fullName: 'Jhon dhoe',
        email: 'jhondoe@gm.io',
        password: 'hashed-password',
      });

      await service.create(createUserDto);

      expect(mockPrismaService.user.findFirst).toHaveBeenCalledWith({
        where: { email: 'jhondoe@gm.io' },
      });
    });

    it('should hash the password before saving', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      mockPrismaService.user.create.mockResolvedValue({});

      await service.create(createUserDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });

    it('should call prisma.user.create with hashed password and correct data', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      mockPrismaService.user.create.mockResolvedValue({});

      await service.create(createUserDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          fullName: 'Jhon dhoe',
          email: 'jhondoe@gm.io',
          password: 'hashed-password',
        },
      });
    });

    it('should return the newly created user without password', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

      const mockCreatedUser = {
        id: 1,
        fullName: 'Jhon dhoe',
        email: 'jhondoe@gm.io',
        password: 'hashed-password', 
      };
      mockPrismaService.user.create.mockResolvedValue(mockCreatedUser);

      const result = await service.create(createUserDto);

      expect(result).toEqual({
        id: 1,
        fullName: 'Jhon dhoe',
        email: 'jhondoe@gm.io',
      });

      expect(result).not.toHaveProperty('password');
    });

    it('should not call prisma.user.create if email already exists', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue({ id: 1 });

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );

      expect(mockPrismaService.user.create).not.toHaveBeenCalled();
    });
  });
});
