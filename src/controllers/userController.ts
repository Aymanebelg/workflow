import { type Request, type Response } from 'express'
import userMetadataService from '../services/userMetadataService'
import { ErrorTypes, SuccessTypes, StatusCode, handleAsync } from 'dev.linkopus.commonmessages'
import createLogger from 'dev.linkopus.logger'

const logger = createLogger(module)

interface User {
  name: string
  email: string
  password: string
};

class UserController {
  getAllUsers = handleAsync(async (req: Request, res: Response): Promise<void> => {
    const users = await userMetadataService.getAllUsers()
    logger.info('Fetched all users successfully.')
    res.status(StatusCode.OK).json(users)
  })

  createUser = handleAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await userMetadataService.createUser(req.body as User)
    logger.info('Created new user successfully.')
    res.status(StatusCode.CREATED).json(user)
  })

  getUserByEmail = handleAsync(async (req: Request, res: Response): Promise<void> => {
    const user = await userMetadataService.getUserByEmail(req.params.email)
    if (user !== null) {
      logger.info(`User with email ${req.params.email} fetched successfully.`)
      res.status(StatusCode.OK).json(user)
    } else {
      logger.warn(`User with email ${req.params.email} not found.`)
      res.status(StatusCode.NOT_FOUND).json({ message: ErrorTypes.USER_NOT_FOUND })
    }
  })

  updateUser = handleAsync(async (req: Request, res: Response): Promise<void> => {
    const updatedUser = await userMetadataService.updateUser(req.params.email, req.body as Partial<User>)
    if (updatedUser !== null) {
      logger.info(`User with email ${req.params.email} updated successfully.`)
      res.status(StatusCode.OK).json(updatedUser)
    } else {
      logger.warn(`User with email ${req.params.email} not found for update.`)
      res.status(StatusCode.NOT_FOUND).json({ message: ErrorTypes.USER_NOT_FOUND })
    }
  })

  searchUsersByName = handleAsync(async (req: Request, res: Response): Promise<void> => {
    const users = await userMetadataService.searchUsersByName(req.params.name)
    logger.info(`Users matching name ${req.params.name} fetched successfully.`)
    res.status(StatusCode.OK).json(users)
  })

  deleteUserByEmail = handleAsync(async (req: Request, res: Response): Promise<void> => {
    const result = await userMetadataService.deleteUserByEmail(req.params.email)
    if (result.deletedCount !== undefined) {
      logger.info(`User with email ${req.params.email} deleted successfully.`)
      res.status(StatusCode.OK).json({ message: SuccessTypes.USERS_DELETED_SUCCESSFULLY })
    } else {
      logger.warn(`User with email ${req.params.email} not found for deletion.`)
      res.status(StatusCode.NOT_FOUND).json({ message: ErrorTypes.USER_NOT_FOUND })
    }
  })
}

export default new UserController()
