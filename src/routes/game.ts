import { Router } from 'express'
import { Game } from '../entity/Game'
import { CreateGameRequest, GetGameRequest, JoinGameRequest } from './types'
import { AppDataSource } from '../database'
import { Player } from '../entity/Player'
import { Symbol } from './types'
import { v4 as uuidv4 } from 'uuid'

export const createGame = async (userId: string, symbol: Symbol = 'X') => {
    // Create a game and a new player in a transaction
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
        let game: Game = new Game()
        game.currentPlayer = userId
        game = await queryRunner.manager.save(game)
        const player = new Player ()
        player.userId = userId
        player.gameId = game.id
        player.symbol = symbol
        await queryRunner.manager.save(player)
        await queryRunner.commitTransaction()
        return game
    } catch (error) {
        await queryRunner.rollbackTransaction()
        throw error
    } finally {
        await queryRunner.release()
    }
}

export const getGame = async (gameId: string) => {
    try {
        const game = await AppDataSource.getRepository(Game).findOneBy({ id: gameId })
        if (!game) {
            throw new Error('Game not found')
        }
        return game
    } catch (error) {
        throw error
    }
}

export const joinGame = async (
    gameId: string, 
    userId: string, 
    computer: boolean = false
) => {
    try {
        // Check if the game exists
        await getGame(gameId)

        const playerRepo = AppDataSource.getRepository(Player)
        const players = await playerRepo.findBy({ gameId })

        if (players.some(player => player.userId === userId)) {
            throw new Error('User already in game')
        }

        // Set a new symbol for the non-initializing player
        const symbol: Symbol = players.length ? 'O' : 'X'

        const player = playerRepo.create({ userId, gameId, symbol })

        if (computer) {
            // Create an AI player with a fake user record
            player.userId = uuidv4()
            player.computer = true
        }

        playerRepo.save(player)
    } catch (error) {
        throw error
    }
}

const router = Router()

router.post('', async (req, res) => {
    const { userId } = req.body as CreateGameRequest
    try {
        const game = await createGame(userId)
        return res.status(201).json(game)
    } catch {
        return res.status(500).json({ error: 'Game could not be created' })
    }
})

router.get('/:gameId', async (req, res) => {
    const { gameId } = req.params as GetGameRequest
    try {
        const game = await getGame(gameId)
        return res.status(200).json(game)
    } catch {
        return res.status(500).json({ error: 'Game could not be retrieved' })
    }
})

router.post('/:gameId/join', async (req, res) => {
    const { userId, computer } = req.body as JoinGameRequest
    const { gameId } = req.params
    try {
        await joinGame(gameId, userId, computer)
        return res.status(201).json({ message: 'New player added to the game' })
    } catch (err) {
        return res.status(500).json({ error: (err as Error).message })
    }
})

export default router