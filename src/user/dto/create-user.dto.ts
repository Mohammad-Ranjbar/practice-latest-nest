import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Matches(/^09[0-9]{9}$/, {
    message: 'mobile must be an 11-digit number starting with 09',
  })
  mobile: string;

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
