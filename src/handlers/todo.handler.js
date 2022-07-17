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
  const todoList = await TodoEntity.findAll({ where: { userId: userInfo.id } })
  res.json({ data: todoList })
})

router.delete('/:id', authenticationMiddleware(), async (req, res) => {
  const { id: userId } = req.authentication.userToken.userInfo
  const todoEntityId = req.params.id
  const todoEntity = await TodoEntity.findByPk(todoEntityId)
  if (!todoEntity) {
    res.status(404).end()
    return
  }

  if (todoEntity.userId !== userId) {
    res.status(404).end()
    return
  }

  await todoEntity.destroy();
  res.status(200).end()
})
