import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { Basket } from "./basket.entity";
import { ProductService } from "../product/product.service";
import { Product } from "src/product/product.entity";
import { BasketDto } from "./dto/BasketDto";

@Injectable()
export class BasketService{
    constructor(
        private readonly productService: ProductService,
        @InjectModel(Basket)
        private basket: typeof Basket,
    ) {}

    async getBasket(userid: string) {
        try{
            let basketList= await this.basket.findAll({
                where: { userid },
                include: [Product],
              });
            return basketList.map(item =>{
                return {
                    id:item.id,
                    productId: item.productid,
                    product: {
                        id:item.product.id,
                        name: item.product.name,
                        type: item.product.type,
                        imagePath: item.product.imagePath,
                    }
                }
            });
        }catch(error){
            throw new HttpException(
                `Database error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        };
    }

    async addItemToBasket(userId:string, productId:string):Promise<BasketDto>{
        try{
            await this.checkProductState(productId);
            let item= await this.basket.create({
                userid: userId, 
                productid: productId, 
              } as Basket);
            return {
                id:item.id,
                productId: item.productid,
                product: undefined
            }
        }catch(error){
            throw new HttpException(
                `Database error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
              );
        };
    }
    async deleteItem(userId:string, id:number):Promise<Number>{
        try{
            return await this.basket.destroy({
                where :{userid : userId,id:id}
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