let reset = document.createElement('div')
reset.innerHTML = '<div id="reset"><button>RESET</button></div>'
document.body.appendChild(reset)
reset.addEventListener('click', () => {location.reload()})
let squaresContainer = document.createElement('div')
squaresContainer.setAttribute('class', 'container')
document.body.appendChild(squaresContainer)
let players = ['x', 'o']
let player = players[0]


for (let i = 0; i < 9; i++) {
    let square = document.createElement('div')
    square.setAttribute('class', 'square unmarked')
    let xy = i.toString(3).padStart(2, '0')
    square.id = xy.slice(0, 1) + ',' + xy.slice(1)
    square.addEventListener('click', (event) => {
        switchPlayer()
        if (square.classList.contains('unmarked')) { markSquare(square, player) }
        if (isWon(square, player)) { 
            let winScreen = document.createElement('div')
            winScreen.innerHTML = `<div class="popup"><h2>player ${player} has won!</h2><a>play again</a></div>`
            document.body.appendChild(winScreen)
        }
    })
    square.addEventListener('mouseover', (event) => {
        square.classList.contains('unmarked') ? square.style.backgroundColor = 'lightgreen' : square.style.backgroundColor = 'lightcoral'
    })
    square.addEventListener('mouseleave', (event) => { square.style.backgroundColor = 'white' })
    squaresContainer.appendChild(square)
}

function markSquare(square, player) {
    let mark = document.createElement('img')
    mark.src = `${player}.png`
    square.appendChild(mark)
    square.addEventListener('mouseleave', (event) => { square.className = `square marked ${player}` })

}

function switchPlayer() {
    nextPlayer = players.filter(next => next !== player).toString()
    player = nextPlayer
}

function isWon(square, player) {
    let paths = pathsToWin(square)
    let won = false
    paths.forEach(path => {
        let marked = []
        for(xy of path) {
            let square = document.getElementById(`${xy.toString()}`)
            if(square.className.includes(`marked ${player}`)) {
                marked.push(square)
            }
        }
        if(marked.length == 2) {
            won = true
        }
    })
    return won
}

function pathsToWin(square) {
    let xy = square.id.split(',').map(coord => parseInt(coord))
    let possiblePaths = [
        [[xy[0], xy[1] - 2], [xy[0], xy[1] - 1], xy, [xy[0], xy[1] + 1], [xy[0], xy[1] + 2]],
        [[xy[0] - 2, xy[1] - 2], [xy[0] - 1, xy[1] - 1], xy, [xy[0] + 1, xy[1] + 1], [xy[0] + 2, xy[1] + 2]],
        [[xy[0] - 2, xy[1]], [xy[0] - 1, xy[1]], xy, [xy[0] + 1, xy[1]], [xy[0] + 2, xy[1]]],
        [[xy[0] - 2, xy[1] + 2], [xy[0] - 1, xy[1] + 1], xy, [xy[0] + 1, xy[1] - 1], [xy[0] + 2, xy[1] - 2]],
    ]

    // TODO Later - automate this ^
    // for(let i = 0; i < 4; i++) {
    //     let path = []
    //     path.push([])
    // }

    let paths = possiblePaths.map((path) => {
        for (let i = 0; i < 3; i++) {
            validxy = path.slice(i, i + 3).filter((xy) => { return xy[0] >= 0 && xy[1] >= 0 && xy[0] < 3 && xy[1] < 3 })
            if (validxy.length == 3) {
                return path.slice(i, i + 3)
            }
        }
    }).filter(path => path !== undefined)
    return paths
}




