import { Body, Controller, Get, Delete, Param, Post, Request } from "@nestjs/common";
import { BasketService } from "./basket.service";
import { ProductService } from "../product/product.service";

@Controller('basket')
export class BasketController{
    constructor(private readonly basketService: BasketService,
        private readonly productService: ProductService,
    ) {}

    @Get()
    async getBasket(@Request() req){
        return await this.basketService.getBasket(req.user.username);
    }

    @Post()
    async addItemToBasket(@Request() req, @Body() {productId}){
        return this.basketService.addItemToBasket(req.user.username, productId);
    }
    @Delete(':id')
    async deleteProduct(@Request() req, @Param('id') id: number){
        this.basketService.deleteItem(req.user.username, id);
    }
}
