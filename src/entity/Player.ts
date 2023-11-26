import { Entity, Column, OneToMany, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'
import { Game  } from './Game'
import { User } from './User'

@Entity()
export class Player implements Player {
    @PrimaryColumn()
    gameId: string

    @PrimaryColumn()
    userId: string

    @Column()
    symbol: string

    @ManyToOne(() => Game, game => game.players)
    game: Game

    @OneToOne(() => User, user => user)
    user: User
}