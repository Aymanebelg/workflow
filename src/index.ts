import express from 'express'
import userRoutes from './routes/userRoutes'

const app = express()
const port = 3000

app.use(express.json())

app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`User management service listening at http://localhost:${port}`)
})
