import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import type { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
      orderBy: {
        id: 'desc',
      },
      take: 20,
    });
    return users.map((user) => ({
      ...user,
      id: user.id.toString(),
    }));
  }

  async create(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          mobile: dto.mobile,
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });

      return {
        ...user,
        id: user.id.toString(),
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mobile or email is already registered');
      }

      throw error;
    }
  }

  async update(id: bigint, dto: UpdateUserDto) {
    const data: Prisma.UserUpdateInput = {};
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.firstName !== undefined) data.firstName = dto.firstName;
    if (dto.lastName !== undefined) data.lastName = dto.lastName;
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field must be provided');
    }
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        ...user,
        id: user.id.toString(),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found.');
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Email is already registered');
        }
      }
      throw error;
    }
  }

  async show(id: bigint) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        },
      });

      return {
        ...user,
        id: user.id.toString(),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found.');
        }
      }
      throw error;
    }
  }
  async delete(id: bigint) {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return {
        message: 'User deleted',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found.');
        }
      }
      throw error;
    }
  }
}
