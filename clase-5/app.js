import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createRouter } from './routes/movies.js'

export function createApp ({ movieModel }) {
  const app = express()
  app.disable('x-powered-by')
  app.use(json())
  app.use(corsMiddleware())

  app.use('/movies', createRouter({ movieModel }))

  const PORT = process.env.PORT ?? 7777

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
