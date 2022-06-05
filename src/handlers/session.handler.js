import { Router } from 'express'
import { UserEntity } from '../db/entities/userEntity.js'
import { sign } from '../utils/jwt.js'

export const router = new Router()

router.post('/', async (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    res.status(401).end()

    return
  }

  const userEntity = await UserEntity.findOne({ where: { username } })
  if (!userEntity) {
    res.status(401).end()

    return
  }

  if (password !== userEntity.password) {
    res.status(401).end()

    return
  }

  const userInfo = {
    username,
    nameSurname: userEntity.nameSurname,
  }

  const resBody = {
    jwt: sign({ userInfo }),
  }

  res.json(resBody)
})
