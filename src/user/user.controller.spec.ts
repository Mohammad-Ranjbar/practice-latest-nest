import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

describe('UserController', () => {
  let controller: UserController;

  const update = vi.fn();
  beforeEach(() => {
    update.mockReset();
    controller = new UserController({ update } as unknown as UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns the service promise without losing bigint precision', () => {
    const promise = Promise.resolve({ id: '9007199254740993' });
    update.mockReturnValue(promise);
    expect(controller.update(9007199254740993n, { firstName: 'Javad' })).toBe(
      promise,
    );
    expect(update).toHaveBeenCalledWith(9007199254740993n, {
      firstName: 'Javad',
    });
  });

  it('rejects mobile at the validation boundary', async () => {
    const pipe = new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    await expect(
      pipe.transform(
        { mobile: '09123456789' },
        {
          type: 'body',
          metatype: UpdateUserDto,
        },
      ),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
