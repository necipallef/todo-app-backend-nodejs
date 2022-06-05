import { Sequelize } from 'sequelize'
import path from 'path';
import { initUserEntity } from './entities/userEntity.js'

const __dirname = path.resolve();

const sequelizeOptions = {
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false,
}

export const sequelize = new Sequelize(sequelizeOptions)

export async function connectDB() {
  initUserEntity(sequelize)
  return sequelize.sync({ force: false })
}
