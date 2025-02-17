import { Body, Controller, Get, Delete, Param, Post } from "@nestjs/common";
import { BasketService } from "./basket.service";
import { ProductService } from "../product/product.service";

@Controller('basket')
export class BasketController{
    constructor(private readonly basketService: BasketService,
        private readonly productService: ProductService,
    ) {}

    @Get(':userid')
    async getBasket(@Param('userid') userId:string){
        return await this.basketService.getBasket(userId);
    }

    @Post(':userid')
    async addItemToBasket(@Param('userid') userId:string, @Body() {productId}){
        return this.basketService.addItemToBasket(userId, productId);
    }
    @Delete(':userid/:id')
    async deleteProduct(@Param('userid') userId: string, 
        @Param('id') id: number){
        this.basketService.deleteItem(userId, id);
    }
}
