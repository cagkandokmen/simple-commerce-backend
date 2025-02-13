import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { Basket } from "./basket.entity";
import { Product } from "src/product/product.entity";
import { ProductService } from "src/product/product.service";

@Module({
    imports: [SequelizeModule.forFeature([Basket,Product])],
    controllers: [BasketController],
    providers: [BasketService, ProductService]
})
export class BasketModule{}