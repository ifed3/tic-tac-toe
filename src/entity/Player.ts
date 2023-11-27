import { Entity, Column, ManyToOne, PrimaryColumn, JoinTable, OneToMany } from 'typeorm'
import { Game  } from './Game'
import { User } from './User'
import { Move } from './Move'

@Entity()
export class Player implements Player {
    @PrimaryColumn()
    gameId: string

    @PrimaryColumn()
    userId: string
    @ManyToOne(() => Game, game => game.players)
    game: Game

    @ManyToOne(() => User, user => user)
    user: User

    @Column()
    symbol: string

    @Column({ default: false })
    computer: boolean

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    joined_at: Date
}