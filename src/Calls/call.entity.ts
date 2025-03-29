import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Calls',
  timestamps: true,
})
export class Call extends Model {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare from: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare to: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;
}
