import { Router } from 'express'

const router = Router()

interface User {
  id: number
  name: string
}

const users: User[] = []

router.post('/', (req, res) => {
  const user: User = req.body
  users.push(user)
  res.status(201).send(user)
})

router.get('/', (req, res) => {
  res.status(200).send(users)
})

router.get('/ping', (req, res) => {
  res.status(200).send('pong')
})

export default router
