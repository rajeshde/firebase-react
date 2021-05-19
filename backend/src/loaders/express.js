import { join } from 'path'

import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import nocache from 'nocache'
import cookieParser from 'cookie-parser'

export default async ({ app }) => {
  const allowCrossDomain = (req, res, next) => {
    const allowedMethods = ['GET', 'POST']
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', allowedMethods.toString())
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
      res.sendStatus(200)
    } else if (!allowedMethods.includes(req.method)) {
      res.status(405).send({ isSuccess: false, message: 'Method not allowed' })
    } else {
      next()
    }
  }
  app.use(allowCrossDomain)
  app.use(helmet())
  app.use(nocache())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.get('/', (req, res) => {
    res.send('App running')
  })

  // have to keep all 4 parameters to work as an error handler
  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.send({
      isSuccess: false,
      message: 'Something went wrong'
    })
  })
}
