export type Symbol = 'X' | 'O'

export interface CreateUserRequest {
    name: string
    email: string
}

export interface CreateUserResponse {
    message: string
}

export interface CreateGameRequest {
    userId: string
}

export interface CreateGameResponse {
    gameId: string
}

export interface GetGameRequest {
    gameId: string
}

export interface GetGameResponse {
    message: string
}

export interface JoinGameRequest {
    gameId: string
    computer?: boolean
    userId: string
}

export interface PlayMoveRequest {
    userId: string
    row: number
    column: number
    symbol: Symbol
}

export interface ErrorResponse {
    message: string
}

export interface LeaveGameRequest {
    gameId: string
    playerId: string
}

