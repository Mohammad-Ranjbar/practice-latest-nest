import { BadRequestException } from '@nestjs/common';
import { ParseBigIntPipe } from './parse-bigint.pipe.js';

describe('ParseBigIntPipe', () => {
  const pipe = new ParseBigIntPipe();

  it.each(['1', '9007199254740993', '9223372036854775807'])(
    'parses %s without losing precision',
    (value) => {
      expect(pipe.transform(value)).toBe(BigInt(value));
    },
  );

  it.each([
    'abc',
    '0',
    '-1',
    '1.5',
    '9223372036854775808',
    '99999999999999999999',
    '',
    '01',
    ' 1',
    '1 ',
    '1e3',
    '0x10',
    '۱۲',
    undefined,
    null,
    1,
    1n,
    {},
    [],
  ])('rejects invalid input %s', (value) => {
    expect(() => pipe.transform(value)).toThrow(BadRequestException);
  });
});
