import { Router } from 'express'
import userController from '../controllers/userController'

const router = Router()

router.get('/users', userController.getAllUsers)
router.post('/users', userController.createUser)
router.get('/users/:email', userController.getUserByEmail)
router.put('/users/:email', userController.updateUser)
router.get('/users/search/:name', userController.searchUsersByName)
router.delete('/users/:email', userController.deleteUserByEmail)

export default router
