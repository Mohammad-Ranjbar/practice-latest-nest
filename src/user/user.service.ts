import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';
import type { CreateUserDto } from './dto/create-user.dto.js';

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

  async create(dto: CreateUserDto){
    try {
      const user = await this.prisma.user.create({
        data:{
          mobile: dto.mobile,
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
        select:{
          id: true,
          firstName: true,
          lastName: true,
          createdAt: true,
        }
      });

      return {
        ...user,
        id:user.id.toString(),
      };
    }catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Mobile or email is already registered');
      }

      throw error;

    }
  }
}
