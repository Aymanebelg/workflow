import { Router, type Request, type Response } from 'express'
import userMetadataService from '../services/userMetadataService'

interface UserMetadata {
  name: string
  email: string
  password: string
}

const router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/users', async (req: Request, res: Response): Promise<void> => {
  const userData: UserMetadata = req.body as UserMetadata
  try {
    const userMetadata = await userMetadataService.createUser(userData)
    res.status(201).send(userMetadata)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    } else {
      res.status(500).send('An unexpected error occurred')
    }
  }
})

router.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

export default router
