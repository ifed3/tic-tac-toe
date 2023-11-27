import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Game  } from './Game'
import { User } from './User'

@Entity()
export class Move {
    @PrimaryGeneratedColumn('uuid')
    moveId: string

    @Column()
    gameId: string

    @Column()
    userId: string

    @Column()
    symbol: string

    @Column()
    row: number

    @Column()
    column: number

    @ManyToOne(() => Game, game => game.moves)
    game: Game

    @ManyToOne(() => User, user => user.moves)
    user: User

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}