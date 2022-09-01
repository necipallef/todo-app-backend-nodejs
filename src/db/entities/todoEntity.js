import { DataTypes, Model } from 'sequelize'

export class TodoEntity extends Model {
}

export function initTodoEntity(sequelize) {
  return TodoEntity.init({
    title: DataTypes.STRING,
    details: DataTypes.STRING,
    dueDatetime: DataTypes.STRING,
    reminder: DataTypes.BOOLEAN,
  }, { sequelize, modelName: 'Todo' })
}
