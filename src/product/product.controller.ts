import { Controller, Body, Get, Param, Post, Delete } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/products')
  getAllProducts(){
    return this.productService.getAllProducts();
  }

  @Post()
  addProduct(@Body() product):void{
    this.productService.addProduct(product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string):void{
    this.productService.deleteProduct(id);
  }

}
