import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { Product } from "./product.entity";

@Injectable()
export class ProductService{

    constructor(
            @InjectModel(Product)
            private productModel: typeof Product,
    ) {}
    
    getAllProducts(){
        try{
            return this.productModel.findAll({
                attributes: ['id', 'name', 'type', 'imagePath'], 
             });
        }catch(error){
            throw new HttpException(
                `Database error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
              );
        };
    }

    async addProduct(productItem):Promise<Product>{
        try{    
            return await this.productModel.create({
                id: productItem.id, 
                name: productItem.name, 
                type:productItem.type,
                imagePath:productItem.imagePath
              } as Product);
        }catch(error){
            throw new HttpException(
                    `Database error: ${error.message}`,
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        };
    }

    async deleteProduct(id:string):Promise<Number>{
        try{    
            return await this.productModel.destroy({
                where :{id : id}
            });
        }catch(error){
            if(error?.parent?.code =="23503")
                throw new HttpException(
                    `This product is in some baskets. You can not delete it.`,
                    HttpStatus.BAD_REQUEST
                );
            else    
                throw new HttpException(
                    `Database error: ${JSON.stringify(error)} - ${error.message}`,
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
        };
    }

    async findById(id:string):Promise<Product | null>{
        try{    
            return await this.productModel.findOne({
                where :{id : id}
            });
        }catch(error){
            throw new HttpException(
                `Database error: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        };
    }
}