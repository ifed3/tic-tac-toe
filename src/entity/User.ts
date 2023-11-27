import { Entity, Column, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm'
import { Game } from './Game'
import { Move } from './Move'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @OneToMany(() => Game, game => game.players )
    @JoinColumn({ name: 'game_id'})
    games: Game[]

    @OneToMany(() => Move, move => move.user)
    @JoinColumn({ name: 'user_id'})
    moves: Move[]

    @Column({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP" })
    created_at: Date
}