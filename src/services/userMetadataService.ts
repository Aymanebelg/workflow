import userMetadataDao from '../dao/userMetadataDao'
import { type Document } from 'mongoose'
import createLogger from 'dev.linkopus.logger'
import { ApiError, ErrorTypes, StatusCode } from 'dev.linkopus.commonmessages'

const logger = createLogger(module)

interface User {
  name: string
  email: string
  password: string
}

class UserMetadataService {
  async createUser (userData: User): Promise<Document> {
    const user = await userMetadataDao.createUser(userData)
    logger.info('User created successfully.')
    return user
  }

  async getAllUsers (): Promise<Document[]> {
    const users = await userMetadataDao.getAllUsers()
    logger.info('All users retrieved successfully.')
    return users
  }

  async getUserByEmail (email: string): Promise<Document | null> {
    const user = await userMetadataDao.getUserByEmail(email)
    if (user) {
      logger.info('User retrieved successfully by email.')
      return user
    } else {
      throw new ApiError({ name: ErrorTypes.USER_NOT_FOUND, status: StatusCode.NOT_FOUND, details: `User not found with email: ${email}` }, logger)
    }
  }

  async updateUser (email: string, updateData: Partial<User>): Promise<Document | null> {
    const user = await userMetadataDao.updateUser(email, updateData)
    if (user) {
      logger.info('User updated successfully.')
      return user
    } else {
      throw new ApiError({ name: ErrorTypes.USER_NOT_FOUND, status: StatusCode.NOT_FOUND, details: `User not found with email: ${email}` }, logger)
    }
  }

  async searchUsersByName (name: string): Promise<Document[]> {
    const users = await userMetadataDao.searchUsersByName(name)
    logger.info('Users searched successfully by name.')
    return users
  }

  async deleteUserByEmail (email: string): Promise<{ deletedCount?: number }> {
    const result = await userMetadataDao.deleteUserByEmail(email)
    if (result.deletedCount) {
      logger.info('User deleted successfully.')
    } else {
      logger.warn('No user found to delete with email:', email)
    }
    return result
  }
}

export default new UserMetadataService()
