import request from 'supertest'
import app from '../server'
import * as GameRepository from '../routes/game'

describe('Game Routing', () => {
    beforeAll(async () => {
        // Set up db connection
    })

    afterAll(async () => {
        // Tear down db connection
    })

    describe("createGame", () => {
        test("should create a new game", () => {

        })

        test("should create a new player", () => {

        })

        test("should not create a game without a player", () => {

        })
    })

    describe("getGame", () => {
        test("should provide a game object", () => {

        })

        test("should error when game doesn't exist", () => {

        })
    })

    describe("joinGame", () => {
        test("should add player to existing game", () => {

        })

        test("should provide player with correct symbol", () => {

        })

        test("should error when game doesn't exist", () => {

        })

        test("should create a new player record", () => {

        })
    })
})