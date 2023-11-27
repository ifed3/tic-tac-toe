import { Router } from 'express'
import UserRouter from './user'
import GameRouter from './game'
import MoveRouter from './move'

const router = Router()

router.use('/users', UserRouter)
router.use('/games', GameRouter)
router.use('/moves', MoveRouter)

export default router