import express from 'express'
import userRoutes from './routes/userRoutes'
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
import createLogger from 'dev.linkopus.logger'
import { errorHandlerMiddleware, routeNotFoundHandlerMiddleware, connectDB } from 'dev.linkopus.commonmessages'
import config from './config/config'

const logger = createLogger(module)

const app = express()
connectDB(logger).catch((err) => {
  logger.error(`Failed to connect to database, Error: ${err}`)
})

app.use(express.json())
app.use('/', userRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.all('*', routeNotFoundHandlerMiddleware(logger))
app.use(errorHandlerMiddleware(logger))
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`)
})
