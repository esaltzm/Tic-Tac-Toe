let squaresContainer = document.createElement('div')
squaresContainer.setAttribute('class', 'container')
document.body.appendChild(squaresContainer)
let players = ['x','o']
let player = players[0]

for(let i = 0; i < 9; i++) {
    let square = document.createElement('div')
    square.setAttribute('class', 'square unmarked')
    let coords = i.toString(3).padStart(2,'0')
    square.id = coords.slice(0,1) + ',' + coords.slice(1)
    square.addEventListener('click', (event) => {
        switchPlayer()
        if(square.classList.contains('unmarked')) {markSquare(square, player)}
        if(isWon()) {alert('GAME OVER')}
    })
    square.addEventListener('mouseover', (event) => {
        square.classList.contains('unmarked') ? square.style.backgroundColor = 'lightgreen' : square.style.backgroundColor = 'lightcoral'
    })
    square.addEventListener('mouseleave', (event) => {square.style.backgroundColor = 'white'})
    squaresContainer.appendChild(square)
}

function markSquare(square, player) {
    console.log(player)
    let mark = document.createElement('img')
    mark.src = `${player}.png`
    square.appendChild(mark)
    square.addEventListener('mouseleave', (event) => {square.className = `square marked ${player}`})

}

function switchPlayer() {
    nextPlayer = players.filter(next => next !== player).toString()
    player = nextPlayer
    console.log(player)
}

function isWon(square) {

    return false
}