import { Move } from '../entity/Move'
import { Symbol } from './types'

export const gameIsWon = async (moves: Move[], boardSize: number, symbol: Symbol) => {
    const checks = await Promise.all([
        checkHorizontalWin(moves, boardSize, symbol),
        checkVerticalWin(moves, boardSize, symbol),
        checkDiagonalWin(moves, boardSize, symbol)
    ])
    return checks.some(check => !!check)
}

const checkHorizontalWin = (moves: Move[], boardSize: number, symbol: Symbol) => {
    // Iterate over each row to check if there is a winning match
    for (let row = 0; row < boardSize; row++) {
        let count = 0
        for (let column = 0; column < boardSize; column++) {
            // Collect move and check if the symbol matches
            const move = moves.find(move => 
                move.row === row &&
                move.column === column &&
                move.symbol === symbol
            )
            if (move) {
                count++
            }
            if (count === boardSize) {
                return true
            }
        }
    }
    return false
}

const checkVerticalWin = (moves: Move[], boardSize: number, symbol: Symbol) => {
    // Iterate over each column to check if there is a winning match
    for (let column = 0; column < boardSize; column++) {
        let count = 0
        for (let row = 0; row < boardSize; row++) {
            const move = moves.find(move => 
                move.row === row &&
                move.column === column &&
                move.symbol === symbol
            )
            if (move) {
                count++
            }
            if (count === boardSize) {
                return true
            }
        }
    }
    return false
}

const checkDiagonalWin = (moves: Move[], boardSize: number, symbol: Symbol) => {
    let count = 0
    for (let index = 0; index < boardSize; index++) {
        const move = moves.find(move => 
            move.row === index &&
            move.column === index &&
            move.symbol === symbol
        )
        if (move) {
            count++
        }
        if (count === boardSize) {
            return true
        }   
    }
    count = 0
    for (let index = 0; index < boardSize; index++) {
        const move = moves.find(move => 
            move.row === index &&
            move.column === boardSize - index - 1 &&
            move.symbol === symbol
        )
        if (move) {
            count++
        }
        if (count === boardSize) {
            return true
        }   
    }
    return false
}