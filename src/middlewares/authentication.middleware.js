import { verify } from '../utils/jwt.js'

export function authenticationMiddleware() {
  return (req, res, next) => {
    req.authentication = {}
    try {
      const token = req.headers.authorization.split(' ')[1]
      req.authentication.userToken = verify(token)
    } catch (e) {
      res.status(401).end()

      return
    }

    next()
  }
}
