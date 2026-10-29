import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserService } from './user.service.js';

describe('UserService', () => {
  let service: UserService;

  const update = vi.fn();
  beforeEach(() => {
    update.mockReset();
    service = new UserService({ user: { update } } as unknown as PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('updates only allowed supplied fields and preserves null', async () => {
    update.mockResolvedValue({ id: 1n, firstName: 'Javad', email: null });
    const dto = {
      firstName: 'Javad',
      email: null,
      mobile: '09123456789',
    };
    const result = await service.update(1n, dto);
    expect(update.mock.calls[0][0].where).toEqual({ id: 1n });
    expect(update.mock.calls[0][0].data).toEqual({
      firstName: 'Javad',
      email: null,
    });
    expect(result.id).toBe('1');
  });

  it('rejects empty updates before querying', async () => {
    await expect(service.update(1n, {})).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(update).not.toHaveBeenCalled();
  });

  it.each([
    ['P2025', NotFoundException],
    ['P2002', ConflictException],
  ])('maps %s to its HTTP exception', async (code, exceptionType) => {
    update.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Database error', {
        code,
        clientVersion: '7.10.0',
      }),
    );
    await expect(
      service.update(1n, { firstName: 'Javad' }),
    ).rejects.toBeInstanceOf(exceptionType);
  });

  it('preserves unexpected errors', async () => {
    const error = new Error('Connection failed');
    update.mockRejectedValue(error);
    await expect(service.update(1n, { firstName: 'Javad' })).rejects.toBe(
      error,
    );
  });
});
