import { Router } from 'express'
import { authenticationMiddleware } from '../middlewares/authentication.middleware.js'
import { UserEntity } from '../db/entities/userEntity.js'

export const router = new Router()

router.get('/me', authenticationMiddleware(), (req, res) => {
  res.json(req.authentication.userToken.userInfo)
})

router.post('/', async (req, res) => {
  const nameSurname = req.body.nameSurname
  const username = req.body.username
  const password = req.body.password
  if (!nameSurname || !username || !password) {
    res.status(422).end()

    return
  }

  const sameUser = await UserEntity.findOne({where: {username}})
  if (sameUser != null) {
    res.status(409).end()

    return
  }

  await UserEntity.create({
    nameSurname,
    username,
    password,
  })

  res.status(201).end()
})
