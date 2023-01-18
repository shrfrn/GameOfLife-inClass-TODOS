'use strict'

// TODO: render the board in an HTML table
// TODO: add class 'occupied'
// TODO: add toggle game btn
// TODO: click on a TD with LIFE upgrade to SUPER_LIFE which never dies
// TODO: click on LIFE blows up the negs around it

const GAME_FREQ = 1000
const LIFE = '🎃'

// The Model
var gBoard
var gGameInterval


function init() {
    gBoard = createBoard()
    renderBoard(gBoard)
    // if (gGameInterval) clearInterval(gGameInterval)
    // gGameInterval = setInterval(play, GAME_FREQ)
}


function play() {
    gBoard = runGeneration(gBoard)
    renderBoard(gBoard)
}


function createBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board.push([])
        for (var j = 0; j < 8; j++) {
            board[i][j] = (Math.random() > 0.5) ? LIFE : ''
        }
    }
    return board;
}

function renderBoard(board) {
    console.table(board)
}

function runGeneration(board) {
    var newBoard = copyMat(board)
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var numOfNeighbors = countNeighbors(i, j, board)
            if ((numOfNeighbors > 2) && (numOfNeighbors < 6)) {
                if (board[i][j] === '') newBoard[i][j] = LIFE
            }
            else if (board[i][j] === LIFE) newBoard[i][j] = ''
        }
    }
    return newBoard
}

function countNeighbors(rowIdx, colIdx, mat) {
    var neighborsCount = 0

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j] === LIFE) neighborsCount++
        }
    }
    return neighborsCount
}
