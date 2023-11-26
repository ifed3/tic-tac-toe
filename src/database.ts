import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Game } from './entity/Game'
import { User } from './entity/User'
import { Move } from './entity/Move'
import { Player } from './entity/Player'

const { 
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_HOST,
    POSTGRES_DB
} = process.env


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: true,
    logging: true,
    entities: [User, Game, Player, Move],
    subscribers: [],
    migrations: [],
})