import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinTable, ManyToMany } from 'typeorm'
import { Player } from './Player'
import { Move } from './Move'
import { User } from './User'

@Entity()
export class Game {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ default: 3 })
    boardSize: number

    @ManyToMany(() => User)
    @JoinTable({ name: 'player' })
    players: Promise<Player[]>
    
    @OneToMany(() => Move, move => move.game)
    moves: Promise<Move[]>

    @OneToOne(() => User, user => user)
    @Column()
    currentPlayer: string

    @OneToOne(() => User, user => user)
    @Column({ nullable: true })
    winner?: string

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    @Column({ type: 'timestamptz' })
    @Column({ nullable: true })
    ended_at?: Date
}