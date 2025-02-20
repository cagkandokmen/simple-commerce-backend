import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { ProductDto } from 'src/product/dto/ProductDto';

export class BasketDto {
  @ApiProperty({ example: '1', description: 'The id of the product in basket' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'P001', description: 'The ID the product' })
  @IsString()
  @MaxLength(20)
  productId: string;

  @ApiProperty({ example: 'Product Object', description: 'Product Object' })
  product: ProductDto | undefined;

}
