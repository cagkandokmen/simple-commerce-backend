import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from "./basket.entity";
import { ProductService } from "../product/product.service";

@Injectable()
export class BasketService{
    constructor(
        private readonly productService: ProductService,
        @InjectModel(Basket)
        private basket: typeof Basket,
    ) {}

    async getBasket(userid: string) {
        try{
            return this.basket.findAll({
              where: { userid },
            });
        }catch(error){
            throw new HttpException(
                `Database error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        };
    }

    async addItemToBasket(userId:string, productId:string):Promise<Basket>{
        try{
            await this.checkProductState(productId);
            return await this.basket.create({
                userid: userId, 
                productid: productId, 
              } as Basket);
        }catch(error){
            throw new HttpException(
                `Database error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
              );
        };
    }
    async deleteItem(userId:string, productId:string):Promise<Number>{
        try{
            await this.checkProductState(productId);
            return await this.basket.destroy({
                where :{userid : userId,productid:productId}
            });
        }catch(error){
            throw new HttpException(
                `Database error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        };
    }

    async checkProductState(id:string){
        let p = await this.productService.findById(id);
        if(p == null)
            throw new HttpException('Product is not defined...',
                     HttpStatus.BAD_REQUEST); 
    }
    
}