import express from 'express'
import userRoutes from './routes/userRoutes'
import connectDB from './database/db'

const app = express()

connectDB().then(() => {
  console.log('Connected to MongoDB, starting server...')

  app.use(express.json())
  app.use('/', userRoutes)

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
}).catch((error) => {
  console.error('Failed to connect to MongoDB:', error)
})
