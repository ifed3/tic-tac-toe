import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Player } from './Player'
import { Move } from './Move'
import { User } from './User'

@Entity()
export class Game {
    @PrimaryColumn()
    id: string

    @ManyToMany(() => User)
    @JoinTable({ name: "player" })
    players: Player[]
    
    @OneToMany(() => Move, move => move.game)
    moves: Move[]

    @Column()
    currentPlayer: string

    @Column()
    winner?: string
}