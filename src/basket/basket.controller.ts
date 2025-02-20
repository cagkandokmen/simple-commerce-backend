import { Body, Controller, Get, Delete, Param, Post, Request } from "@nestjs/common";
import { BasketService } from "./basket.service";
import { ProductService } from "../product/product.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { BasketDto } from "./dto/BasketDto";
import { NewItemDto } from "./dto/NewItemDto";


@ApiTags('basket')
@Controller('basket')
export class BasketController{
    constructor(private readonly basketService: BasketService,
        private readonly productService: ProductService,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get basket of user' })
      @ApiResponse({
        status: 200,
        description: 'Returns a list of items in basket',
        type: BasketDto,
        isArray: true, 
      })
    async getBasket(@Request() req):Promise<BasketDto[]>{
        return await this.basketService.getBasket(req.user.username);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new item to basket' })
    @ApiResponse({ status: 201, description: 'Item added to basket' })
    @ApiBody({ type: NewItemDto }) 
    async addItemToBasket(@Request() req, @Body() {productId}: NewItemDto){
        return this.basketService.addItemToBasket(req.user.username, productId);
    }
    @Delete(':id')
    @ApiOperation({ summary: 'Delete an item in basket' })
    @ApiParam({ name: 'id', required: true, example: '123' })
    async deleteProduct(@Request() req, @Param('id') id: number){
        this.basketService.deleteItem(req.user.username, id);
    }
}
