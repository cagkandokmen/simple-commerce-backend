// src/models/user.model.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'user',
  })
  role: string;
}
