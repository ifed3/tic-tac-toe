import { Router } from 'express'
import { CreateUserRequest } from './types'
import { AppDataSource } from '../database'
import { User } from '../entity/User'

const router = Router()

export const createUser = async (name: string, email: string) => {
    const userRepo = AppDataSource.getRepository(User)
    const user = await userRepo.save({ name, email })
    return user
}

router.post('', async (req, res) => {
    const { name, email } = req.body as CreateUserRequest
    try {
        const user = await createUser(name, email)
        return res.status(201).json(user)
    } catch {
        return res.status(500).json({ error: 'User could not be created' })
    }
})

export default router