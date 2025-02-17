import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from 'src/product/product.entity';

@Table({ tableName: 'Basket' })
export class Basket extends Model<Basket> {
  @Column({
    type: DataType.INTEGER, 
    autoIncrement: true, 
    primaryKey: true, 
  })
  id: number;

  @Column({
    type: DataType.CHAR(20),
    allowNull: false,
  })
  userid: string;

  @Column({
    type: DataType.CHAR(20),
    allowNull: false,
  })
  @ForeignKey(() => Product)
  productid: string;

  @BelongsTo(() => Product)
  product: Product;
}
