import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  productid: string;
}
