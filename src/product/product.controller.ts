import { Controller, Body, Get, Param, Post, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ProductDto } from './dto/ProductDto';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of products',
    type: ProductDto,
    isArray: true, 
  })
  async getAllProducts():Promise<ProductDto[]>{
    return await this.productService.getAllProducts();
  }

  @Post()
  @Roles("admin")
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @ApiBody({ type: ProductDto }) 
  async addProduct(@Body() product:ProductDto){
    return await this.productService.addProduct(product);
  }

  @Delete(':id')
  @Roles("admin")
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', required: true, example: '123' })
  async deleteProduct(@Param('id') id: string){
    return await this.productService.deleteProduct(id);
  }

}
