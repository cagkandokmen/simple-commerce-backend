import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import { Product } from "./product.entity";
import { ProductDto } from "./dto/ProductDto";
import { DatabaseException } from "src/exceptionhandling/DatabaseException";
import { BadRequestException } from "src/exceptionhandling/BadRequestException";

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
            throw new DatabaseException(error.message);
        };
    }

    async addProduct(productItem: ProductDto):Promise<ProductDto>{
        try{    
            let p= await this.productModel.create({
                id: productItem.id, 
                name: productItem.name, 
                type:productItem.type,
                imagePath:productItem.imagePath
              } as Product);
            return {
                id: p.id, 
                name: p.name, 
                type:p.type,
                imagePath:p.imagePath
            };
        }catch(error){
            throw new DatabaseException(error.message);
        };
    }

    async deleteProduct(id:string):Promise<Number>{
        try{    
            return await this.productModel.destroy({
                where :{id : id}
            });
        }catch(error){
            if(error?.parent?.code =="23503")
                throw new BadRequestException(`This product is in some baskets. You can not delete it.`);
            else  
                throw new DatabaseException(error.message);
        };
    }

    async findById(id:string):Promise<Product | null>{
        try{    
            return await this.productModel.findOne({
                where :{id : id}
            });
        }catch(error){
            throw new DatabaseException(error.message);
        };
    }
}