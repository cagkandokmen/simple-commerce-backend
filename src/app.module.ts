import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './product/product.module';
import { BasketModule } from './basket/basket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST || "localhost",
      port: Number(process.env.DATABASE_PORT|| 5432) ,
      username: process.env.DATABASE_USER || "user",
      password: process.env.DATABASE_PASSWORD || "password",
      database: process.env.DATABASE_NAME || "simplecommercedb",
      autoLoadModels: true,
      synchronize: true,
    }),
    BasketModule, 
    ProductModule,
    AuthModule,
  ]
})
export class AppModule {}