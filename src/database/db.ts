import mongoose from 'mongoose'

const connectDB = async (): Promise<void> => {
  const url = 'mongodb://linkopusUser:linkopus2024@localhost/UserMetadata?authSource=UserMetadata'
  console.log('connecting to MongoDB ...')
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? url)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export default connectDB
