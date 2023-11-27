import { Router } from 'express'
import { Move } from '../entity/Move'
import { AppDataSource } from '../database'
import { Game } from '../entity/Game'
import { PlayMoveRequest, Symbol } from './types'
import { Player } from '../entity/Player'
import { gameIsWon } from './utils'

interface CreateMoveInput {
    userId: string
    gameId: string,
    row: number
    column: number
}

export const createMove = async ({ userId, gameId, row, column }: CreateMoveInput) => {
    let player: Player | undefined
    let opponent: Player | undefined
    let boardSize: number
    let move: Move

    // Attempt move validations
    try {
        // Get the game
        const gameRepo = AppDataSource.getRepository(Game)
        const game = await gameRepo.findOneBy({ id: gameId })
        if (!game) {
            throw new Error('Game not found')
        }

        // Check that the game has not ended
        const gameHasEnded = !!game.ended_at
        if (gameHasEnded) {
            throw new Error('Game has ended')
        }        

        // Check that the game has a valid number of players
        const playerRepo = AppDataSource.getRepository(Player)
        const players = await playerRepo.findBy({ gameId })
        player = players.find(player => player.userId === userId)
        opponent = players.find(player => player.userId !== userId)
        if (!opponent) {
            throw new Error('Game does not have enough players')
        }

        // Check if the current player is the same as requesting user
        if (game.currentPlayer !== userId) {
            throw new Error('Incorrect player turn')
        }

        // Check if this move already exists
        const moveRepo = AppDataSource.getRepository(Move)
        const existingMove = await moveRepo.findOneBy({ gameId, row, column })
        if (existingMove) {
            throw new Error('Position already taken')
        }

        boardSize = game.boardSize
        // Check if the move is valid on the board
        if (row < 0 || row >= boardSize || column < 0 || column >= boardSize) {
            throw new Error('Invalid position')
        }
    } catch (error) {
        throw error
    }

    // Move is valid -> Create move and check game status

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
        // Store the move
        const symbol = player!.symbol as Symbol
        move = queryRunner.manager.create(Move, ({ userId, gameId, column, row, symbol }))
        await queryRunner.manager.save(move)

        // Get all current moves 
        const gameMoves = await queryRunner.manager.findBy(Move, { gameId })
        const isBoardFilled = gameMoves.length === boardSize * boardSize
        const isGameWon = await gameIsWon(gameMoves, boardSize, symbol)

        if (isGameWon) {
            // Game is over -> set winner and end time
            await queryRunner.manager.update(Game, gameId, { ended_at: new Date(), winner: userId }) 
        } else if (!isGameWon && isBoardFilled) {
            // A tie -> Game is over -> set end time
            await queryRunner.manager.update(Game, gameId, { ended_at: new Date() }) 
        } else {
            // Game is still ongoing
            await queryRunner.manager.update(Game, gameId, { currentPlayer: opponent!.userId }) 
        }
        await queryRunner.commitTransaction()
    } catch (error) {
        await queryRunner.rollbackTransaction()
        throw error
    } finally {
        await queryRunner.release()
    }

    return move
}

const router = Router()

router.post('/:gameId', async (req, res) => {
    const { userId, row, column } = req.body as PlayMoveRequest
    const { gameId } = req.params
    try {
        const move = await createMove({ userId, gameId, row, column })
        return res.status(201).json(move)
    } catch (err) {
        return res.status(500).json({ error: (err as Error).message })
    }
})

export default router