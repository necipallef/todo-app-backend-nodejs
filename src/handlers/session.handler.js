import { Router } from 'express'

export const router = new Router()

router.post('/', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  if (!username || !password) {
    res.status(401).end()

    return
  }

  if (username !== 'admin' || password !== '123456') {
    res.status(401).end()

    return
  }

  res.json({ jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
})
