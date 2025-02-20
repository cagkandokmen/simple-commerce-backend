import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class NewItemDto {

  @ApiProperty({ example: 'P001', description: 'The ID the product' })
  @IsString()
  @MaxLength(20)
  productId: string;

}
