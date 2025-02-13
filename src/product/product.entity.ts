import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Product' })
export class Product extends Model<Product> {
  @Column({
    type: DataType.CHAR(20),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
  })
  type: string;
}
