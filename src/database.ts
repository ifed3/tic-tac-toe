import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'

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
    synchronize: false,
    logging: true,
    entities: ['dist/entity/**/*{.ts,.js}'],
    migrations: ['dist/migrations/**/*{.ts,.js}']
})