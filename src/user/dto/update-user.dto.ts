import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  firstName?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string | null;
}
