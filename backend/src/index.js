import express from 'express'

import { BACKEND_PORT } from './helper/settings'

import loaders from './loaders'
import routes from './routes'

async function startServer() {
  const app = express()

  await loaders({ app })

  routes({ app })

  app.listen(BACKEND_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App running on port - ${BACKEND_PORT}`)
  })
}

startServer()
