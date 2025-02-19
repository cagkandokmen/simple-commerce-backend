import { Controller, Body, Get, Param, Post, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  async getAllProducts(){
    return await this.productService.getAllProducts();
  }

  @Post()
  @Roles("admin")
  async addProduct(@Body() product){
    return await this.productService.addProduct(product);
  }

  @Delete(':id')
  @Roles("admin")
  async deleteProduct(@Param('id') id: string){
    return await this.productService.deleteProduct(id);
  }

}
