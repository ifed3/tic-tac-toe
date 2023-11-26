import { Player } from '../logic/types'

export interface CreateGameRequest {
    gameId: string
    player: Player
}