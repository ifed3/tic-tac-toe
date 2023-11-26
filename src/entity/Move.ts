import { Entity, Column, ManyToOne, PrimaryColumn, Timestamp } from 'typeorm'
import { Game  } from './Game'
import { User } from './User'

@Entity()
export class Move {
    @PrimaryColumn()
    gameId: string

    @PrimaryColumn()
    userId: string

    @Column()
    symbol: string

    @ManyToOne(() => Game, game => game.moves)
    game: Game

    @ManyToOne(() => User, user => user.moves)
    user: User

    @Column({ type: 'timestamptz' })
    created_at: Date
}