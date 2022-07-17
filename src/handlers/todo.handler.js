import { Router } from 'express'
import { TodoEntity } from '../db/entities/todoEntity.js'
import { authenticationMiddleware } from '../middlewares/authentication.middleware.js'

export const router = new Router()

router.post('/', authenticationMiddleware(), async (req, res) => {
  const title = req.body.title
  const details = req.body.details

  const userInfo = req.authentication.userToken.userInfo

  await TodoEntity.create({
    userId: userInfo.id,
    title,
    details,
  })

  res.status(201).end()
})

router.get('/', authenticationMiddleware(), async (req, res) => {
  const userInfo = req.authentication.userToken.userInfo
  const todoList = await TodoEntity.findAll({where: {userId: userInfo.id}})
  res.json({data: todoList})
})
