import 'dotenv/config'
import express from 'express'
import { Request, Response, Router } from 'express'
import { AppDataSource } from './database'
import { User } from './entity/User'

console.log(process.env)

const app = express()
app.use(express.json())

const { PORT } = process.env

AppDataSource.initialize()
    .then(() => {
         console.log("Tables were initialized")
    })
    .catch((error) => console.log(error))


const userRepo = AppDataSource.getRepository(User)    
    
const router = Router()
router.get('/all', async (req: Request, res: Response) => {
    const users = userRepo.createQueryBuilder("user").getMany()
    return res.status(201).json({users})
})


const port = Number(PORT)

app.listen(port, () => {
   console.log('Express server started on port: ' + port)
})