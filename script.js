$ = (q) => document.querySelector(q)

const playArea = $('.playArea')
const settingsArea = $('.settings')
const gridSizeSlider = $('#gs')
const gridCountInput = $('#gc')

var tiles = new Array()
var num = 0
var stop = false
var turn = 'X'

var gridCount = playArea.getAttribute('grid')
var gridSize = 50

playArea.style.width = gridCount * gridSize
playArea.style.height = gridCount * gridSize

createGrid()

gridSizeSlider.addEventListener('input', () => {
    gridSize = gridSizeSlider.value
    playArea.style.width = gridCount * gridSize
    playArea.style.height = gridCount * gridSize
    let n = 0
    for (var j = 0; j < Math.sqrt(tiles.length); j++)
        for (var i = 0; i < Math.sqrt(tiles.length); i++) {
            document.getElementById(tiles[n]).style.fontSize = gridSize / 1.5
            document.getElementById(tiles[n]).style.width = gridSize
            document.getElementById(tiles[n]).style.height = gridSize
            document.getElementById(tiles[n]).style.left = i * gridSize
            document.getElementById(tiles[n]).style.top = j * gridSize
            n++
        }
})

gridCountInput.addEventListener('change', () => {
    gridCount = gridCountInput.value
    tiles.forEach(t => {
        console.log('t = ' + t)
        playArea.removeChild(document.getElementById(t))
    })
    playArea.style.width = gridCount * gridSize
    playArea.style.height = gridCount * gridSize

    tiles = []
    createGrid()
})

function createGrid() {
    for (var y = 0; y < gridCount; y++) {
        for (var x = 0; x < gridCount; x++) {
            const e = document.createElement('div')
            const id = e.id = x + ',' + y
            tiles.push(id)
            e.style.width = gridSize
            e.style.height = gridSize
            e.style.position = 'absolute'
            e.style.fontSize = gridSize / 1.5
            e.style.textAlign = 'center'
            e.style.top = gridSize * y
            e.style.left = gridSize * x
            e.style.border = '1px solid #999'
            e.addEventListener('click', () => {
                if (e.textContent == '' && stop == false) {
                    playArea.setAttribute('turn', (turn == 'X' ? 'X' : 'O'))
                    e.textContent = turn
                    turn = turn == 'X' ? 'O' : 'X'
                    $('.turn').textContent = turn
                    checkWin(id.split(',')[0], id.split(',')[1])
                }
            })
            playArea.appendChild(e)
            num++
        }
    }
}

function checkWin(l, t) {
    let left = (x, y) => {
        if (x > 0) {
            return [parseInt(x) - 1, parseInt(y)]
        }
        return null
    }
    let right = (x, y) => {
        if (x < gridCount - 1) {
            return [parseInt(x) + 1, parseInt(y)]
        }
        return null
    }
    let top = (x, y) => {
        if (y > 0) {
            return [parseInt(x), parseInt(y - 1)]
        }
        return null
    }
    let bottom = (x, y) => {
        if (y < gridCount - 1) {
            return [parseInt(x), parseInt(y) + 1]
        }
        return null
    }
    let topLeft = (x, y) => {
        if (top(x, y) != null && left(x, y) != null) {
            return [parseInt(x) - 1, parseInt(y) - 1]
        }
        return null
    }
    let topRight = (x, y) => {
        if (top(x, y) != null && right(x, y) != null) {
            return [parseInt(x) + 1, parseInt(y) - 1]
        }
        return null
    }
    let bottomLeft = (x, y) => {
        if (left(x, y) != null && bottom(x, y) != null) {
            return [parseInt(x) - 1, parseInt(y) + 1]
        }
        return null
    }
    let bottomRight = (x, y) => {
        if (right(x, y) != null && bottom(x, y) != null) {
            return [parseInt(x) + 1, parseInt(y) + 1]
        }
        return null
    }

    let id = (id) => document.getElementById(id)

    function checkLeft(x, y, r) {
        if (left(x, y) != null) {
            if (id(left(x, y)).textContent == id(x + ',' + y).textContent) {
                r += checkLeft(left(x, y)[0], left(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }
    function checkRight(x, y, r) {
        if (right(x, y) != null) {
            if (String(id(right(x, y)).textContent) == String(id(x + ',' + y).textContent)) {
                r += checkRight(right(x, y)[0], right(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }
    function checkTop(x, y, r) {
        if (top(x, y) != null) {
            if (id(top(x, y)).textContent == id(x + ',' + y).textContent) {
                r += checkLeft(top(x, y)[0], top(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }
    function checkBottom(x, y, r) {
        if (bottom(x, y) != null) {
            if (id(bottom(x, y)).textContent == id(x + ',' + y).textContent) {
                r += checkBottom(bottom(x, y)[0], bottom(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }
    function checkTopLeft(x, y, r) {
        if (topLeft(x, y) != null) {
            if (id(topLeft(x, y)).textContent == id(x + ',' + y).textContent) {
                r += checkTopLeft(topLeft(x, y)[0], topLeft(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }
    function checkTopRight(x, y, r) {
        if (topRight(x, y) != null) {
            if (id(topRight(x, y)).textContent == id(x + ',' + y).textContent) {
                r += checkTopRight(topRight(x, y)[0], topRight(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }
    function checkBottomLeft(x, y, r) {
        if (bottomLeft(x, y) != null) {
            if (id(bottomLeft(x, y)).textContent == id(x + ',' + y).textContent) {
                r += checkBottomLeft(bottomLeft(x, y)[0], bottomLeft(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }
    function checkBottomRight(x, y, r) {
        if (bottomRight(x, y) != null) {
            if (id(bottomRight(x, y)).textContent == id(x + ',' + y).textContent) {
                r += checkBottomRight(bottomRight(x, y)[0], bottomRight(x, y)[1], r)
                return r + 1
            }
            return 0
        }
        return 0
    }

    if (checkLeft(l, t, 0) == (gridCount - 1) || checkRight(l, t, 0) == (gridCount - 1) || checkTop(l, t, 0) == (gridCount - 1) || checkBottom(l, t, 0) == (gridCount - 1) || checkTopLeft(l, t, 0) == (gridCount - 1) || checkTopRight(l, t, 0) == (gridCount - 1) || checkBottomLeft(l, t, 0) == (gridCount - 1) || checkBottomRight(l, t, 0) == (gridCount - 1)) {
        const e = document.createElement('div')
        e.textContent = 'WINNER ' + (turn == 'X' ? 'O' : 'X')
        e.style.fontFamily = 'Segoe UI'
        e.style.fontSize = 30
        document.body.appendChild(e)
        stop = true
    }
}
