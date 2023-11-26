export type Symbol = 'X' | 'O'

// interface Board {
//     rows: string[]
//     cols: string[]
// }

export interface Player {
    id: string
    symbol: Symbol
    computer: boolean
}

export interface Game {
    id: string
    players: Player[]
    moves: Set<Move>
    // board: Board
    currentPlayer: Player
    winner?: Player | null
}

export interface Move {
    game: Game
    symbol: Symbol
    row: number
    col: number
}