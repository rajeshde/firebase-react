import { Request, Response } from 'express'

const makeExpressCallabck = (controller) => (req, res) => {
  const httpRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    method: req.method,
    path: req.path,
    token: req.headers.authorization ? req.headers.authorization : '',
    host: req.headers.host
  }

  controller(httpRequest)
    .then((httpResponse) => res.status(200).json(httpResponse.body))
    .catch((error) => res.status(200).json({ isSuccess: false, message: error.message }))
}

export default makeExpressCallabck
