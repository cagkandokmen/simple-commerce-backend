import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ProductDto {
  @ApiProperty({ example: 'Laptop', description: 'The name of the product' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'P001', description: 'The ID the product' })
  @IsString()
  @MaxLength(20)
  id: string;

  @ApiProperty({ example: 'electronic', description: 'The category type of the product' })
  @IsString()
  @MaxLength(100)
  type: string;

  @ApiProperty({ example: 'http:/../image', description: 'The iamge url of the product' })
  @IsString()
  @MaxLength(100)
  imagePath: string;
}
