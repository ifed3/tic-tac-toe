import request from 'supertest'
import app from '../server'
import * as UserRepository from '../routes/user'

describe('User Routing', () => {
    beforeAll(async () => {
        // Set up db connection
    })

    afterAll(async () => {
        // Tear down db connection
    })

    describe("createUser", () => {
        test("should create a new user", () => {

        })

        test("should prevent duplicate emails", () => {

        })
    })
})