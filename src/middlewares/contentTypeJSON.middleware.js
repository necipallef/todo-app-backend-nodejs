export function contentTypeJSONMiddleware(){
  // todo fix giving 415 in GET requests from Postman despite the correct header
  return (req, res, next) => {
    console.log({r: req.headers['content-type']})
    if (!req.is('application/json')) {
      res.status(415).end()

      return
    }

    next()
  }
}
