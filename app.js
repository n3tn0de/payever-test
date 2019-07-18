import http from 'http'
import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const app = express()

app.use('/', routes)

const server = http.createServer(app);
server.listen(3000)
