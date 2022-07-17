import { Sequelize } from 'sequelize'
import path from 'path';
import { initUserEntity, UserEntity } from './entities/userEntity.js'
import { initTodoEntity, TodoEntity } from './entities/todoEntity.js'

const __dirname = path.resolve();

const sequelizeOptions = {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false,
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function connectDB() {
  initUserEntity(sequelize)
  initTodoEntity(sequelize)
  UserEntity.hasMany(TodoEntity, {foreignKey: 'userId'})
  TodoEntity.belongsTo(UserEntity, {foreignKey: 'userId'})
  return sequelize.sync({ force: false })
}
