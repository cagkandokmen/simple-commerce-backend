import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, Validate } from 'class-validator';
import { CustomRoleValidator } from 'src/validator/CustomRoleValidator';

export class UserDto {

  @ApiProperty({ description: 'User Name' })
  @IsString()
  @MaxLength(20)
  username: string;

  @ApiProperty({ description: 'User password' })
  @IsString()
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'Admin or User', description: 'User Role' })
  @Validate(CustomRoleValidator)
  @MaxLength(20)
  role: string;

}