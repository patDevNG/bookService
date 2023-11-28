import 'reflect-metadata'
import { config } from 'dotenv'
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './container'
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import './controllers'
import { connect } from './data/database'

config()
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

const server = new InversifyExpressServer(
  container,
  null,
  { rootPath: '/api' },
  app
)

// Connect to the database
connect()

/**
 * Normalize a port into a number, string, or false.
 * @param value
 */
const normalizePort = (value: string | undefined): number => {
  if (!value) return 5000

  return parseInt(value, 10)
}

const port = normalizePort(process.env.PORT)

server.build().listen(port, () => {
  console.log(`Server running on port ${port}`)
})
