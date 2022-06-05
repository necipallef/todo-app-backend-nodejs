export function contentTypeJSONMiddleware(){
  return (req, res, next) => {
    if (!req.is('application/json')) {
      res.status(415).end()

      return
    }

    next()
  }
}
