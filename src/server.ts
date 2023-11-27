import express from 'express'
import EntryRouter from './routes'

const app = express()
app.use(express.json())

app.get('/test', (_, res) => {
    res.send('Welcome to Tic-Tac-Toe game!')
})

app.use('/', EntryRouter)

export default app