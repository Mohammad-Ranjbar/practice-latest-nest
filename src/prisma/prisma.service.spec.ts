import { PrismaService } from './prisma.service.js';

describe('PrismaService', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('rejects missing database configuration instead of using driver defaults', () => {
    vi.stubEnv('DATABASE_URL', '');

    expect(() => new PrismaService()).toThrow('DATABASE_URL must be set');
  });

  it('fails application startup if the database connection fails', async () => {
    vi.stubEnv(
      'DATABASE_URL',
      'postgresql://example:example@localhost:5432/test',
    );
    const prisma = new PrismaService();
    const failure = new Error('Database is unavailable');
    vi.spyOn(prisma, '$connect').mockRejectedValue(failure);

    await expect(prisma.onModuleInit()).rejects.toBe(failure);
    await prisma.$disconnect();
  });
});
