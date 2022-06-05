import { DataTypes, Model } from 'sequelize'

export class UserEntity extends Model {
}

export function initUserEntity(sequelize) {
  return UserEntity.init({
    nameSurname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {sequelize, modelName: 'User'})
}
