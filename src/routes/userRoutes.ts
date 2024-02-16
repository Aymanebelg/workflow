import { Router } from 'express'
import userMetadataService from '../services/userMetadataService'

const router = Router()

router.post('/users', async (req, res) => {
  try {
    const userMetadata = await userMetadataService.createUser(req.body)
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
