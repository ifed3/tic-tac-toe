import request from 'supertest'
import app from '../server'
import * as MoveRepository from '../routes/move'

describe('Move Routing', () => {
    beforeAll(async () => {
        // Set up db connection
    })

    afterAll(async () => {
        // Tear down db connection
    })

    describe("createMove", () => {
        test("should create a new move in a game", () => {

        })

        test("should error when game does not exist", () => {

        })

        test("should error when game has ended", () => {

        })

        test("should error when game only has one player", () => {

        })

        test("should error when it is not the player's turn", () => {

        })

        test("should error when the move already exists", () => {

        })

        test("should error when the move is outside board parameters", () => {

        })
    })

    describe("winning move", () => {
        test("should update the game end time", () => {

        })

        test("should update the game winner", () => {
            
        })
    })

    describe("tying move", () => {
        test("should update the game end time", () => {

        })

        test("should not update the game winner", () => {

        })
    })

    describe("ongoing move", () => {
        test("should update the game's current player", () => {

        })

        test("should not update the game end time", () => {

        })

        test("should not update the game winner", () => {

        })
    })
})