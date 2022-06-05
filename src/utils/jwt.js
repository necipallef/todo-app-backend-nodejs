import jwt from 'jsonwebtoken'

export function sign(payload, expiresIn = '12h') {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn })
}

export function verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}
