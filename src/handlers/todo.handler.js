import { Router } from 'express'
import { TodoEntity } from '../db/entities/todoEntity.js'
import { authenticationMiddleware } from '../middlewares/authentication.middleware.js'

export const router = new Router()

router.post('/', authenticationMiddleware(), async (req, res) => {
  const title = req.body.title
  const details = req.body.details
  const dueDatetime = req.body.dueDatetime
  const reminder = req.body.reminder

  const userInfo = req.authentication.userToken.userInfo

  const todoEntity = await TodoEntity.create({
    userId: userInfo.id,
    title,
    details,
    dueDatetime,
    reminder,
  })

  res.json({data: todoEntity})
})

router.get('/', authenticationMiddleware(), async (req, res) => {
  const userInfo = req.authentication.userToken.userInfo
  const todoList = await TodoEntity.findAll({ where: { userId: userInfo.id } })
  res.json({ data: todoList })
})

router.put('/:id', authenticationMiddleware(), async (req, res) => {
  const userInfo = req.authentication.userToken.userInfo
  const todoEntityId = req.params.id
  const todoEntity = await TodoEntity.findByPk(todoEntityId)
  if (!todoEntity) {
    res.status(404).end()
    return
  }

  const title = req.body.title
  const details = req.body.details
  const dueDatetime = req.body.dueDatetime
  const reminder = req.body.reminder

  const updatedTodoEntity = {
    userId: userInfo.id,
    title,
    details,
    dueDatetime,
    reminder,
  }

  await TodoEntity.update(updatedTodoEntity, {where: {id: userInfo.id}})

  res.json({data: {... updatedTodoEntity, id: todoEntityId }})
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
