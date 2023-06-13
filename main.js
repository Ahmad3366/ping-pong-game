const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const canvasWidth = canvas.width = 620;
const canvasHeight = canvas.height = 400;
let block = 10;
let x = canvasWidth / 2 - block / 2;
let y = canvasHeight / 2 - block / 2;
let speed = 5
let xdir = 1
let ydir = 1
let playerHeight = 80
let playerWidth = 10
let playerY = canvasHeight / 2 - playerHeight / 2
let playerSpeed = 6
let enemyY = canvasHeight / 2 - playerHeight / 2
let playerScore = 0
let enemyScore = 0
let active = false
let sound = new Audio('./pong.mp3')

let moves = {
    w: false,
    s: false,
    up: false,
    down: false
}

function animate () {

    c.clearRect(0, 0, canvasWidth, canvasHeight)

    c.beginPath()
    c.rect(x, y, block, block)
    c.fillStyle = 'red'
    c.fill()

    c.beginPath()
    c.fillStyle = 'black'
    c.rect(15, playerY, playerWidth, playerHeight)
    c.fill()

    c.beginPath()
    c.rect(canvasWidth - 15 - playerWidth, enemyY, playerWidth, playerHeight)
    c.fill()

    c.beginPath()
    c.font = '40px sans-serif'
    c.fillText(`${playerScore}:${enemyScore}`, canvasWidth / 2 - 30, 35)

    if (active) {
        x += xdir*speed
        y += ydir*speed
    }


    if (y < 0 || y + block > canvasHeight) {
        ydir *= -1
    }

    if (x <= 15 + playerWidth && x > 15 && y + block> playerY && y < playerY + playerHeight) {
        xdir *= -1
        sound.play()
        speed += 0.3
    }
    if (x + block >= canvasWidth - 15 - playerWidth && x < canvasWidth - 15 && y + block > enemyY && y < enemyY + playerHeight) {
        xdir *= -1
        sound.play()
        speed += 0.3
    }

    if (moves.w) {
        playerY -= playerSpeed
    } else if (moves.s) {
        playerY += playerSpeed
    }

    if (playerY <= 0) {
        playerY = 0
    } else if (playerY + playerHeight >= canvasHeight) {
        playerY = canvasHeight - playerHeight
    }

    if (moves.up) {
        enemyY -= playerSpeed
    } else if (moves.down) {
        enemyY += playerSpeed
    }

    if (enemyY <= 0) {
        enemyY = 0
    } else if (enemyY + playerHeight >= canvasHeight) {
        enemyY = canvasHeight - playerHeight
    }

    if (x > canvasWidth) {
        x = canvasWidth / 2 - block / 2;
        y = canvasHeight / 2 - block / 2;
        active = false
        setTimeout(() => {
            active = true
        }, 2000)
        playerScore++
        speed = 5
    } else if (x < 0) {
        x = canvasWidth / 2 - block / 2;
        y = canvasHeight / 2 - block / 2;
        active = false
        setTimeout(() => {
            active = true
        }, 2000)
        enemyScore++
        speed = 5
    }

    

    window.requestAnimationFrame(animate)
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            moves.w = true;
            break;
        case 's':
            moves.s = true;
            break;
        case 'ArrowUp':
            moves.up = true;
            break;
        case 'ArrowDown':
            moves.down = true;
            break;
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            moves.w = false;
            break;
        case 's':
            moves.s = false;
            break;
        case 'ArrowUp':
            moves.up = false;
            break;
        case 'ArrowDown':
            moves.down = false;
            break;
    }
})

window.addEventListener('dblclick', () => {
    active = true
})

animate()