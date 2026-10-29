import {
  BadRequestException,
  Injectable,
  type PipeTransform,
} from '@nestjs/common';

// Parses positive identifiers that fit PostgreSQL's signed BIGINT column.
@Injectable()
export class ParseBigIntPipe implements PipeTransform<unknown, bigint> {
  transform(value: unknown): bigint {
    if (typeof value !== 'string' || !/^[1-9][0-9]{0,18}$/.test(value)) {
      throw new BadRequestException('id must be a positive integer');
    }

    const id = BigInt(value);

    if (id > 9223372036854775807n) {
      throw new BadRequestException('id is out of range');
    }

    return id;
  }
}
