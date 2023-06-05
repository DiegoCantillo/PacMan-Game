import TileMap from "./tileMap.js";

const tileSize = 32;
let velocity = 2;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver = false;
let gameWin = false;
const gameOverSound = new Audio('../sound/gameOver.wav');
const gameWinSound = new Audio('../sound/gameWin.wav');

function gameLoop() {
    tileMap.draw(ctx);
    drawGameEnd();
    pacman.draw(ctx, pause(), enemies);
    enemies.forEach((enemy) => enemy.draw(ctx, pause(), pacman));
    checkGameOver();
    checkGameWin();
}

function checkGameWin() {
    if (!gameWin) {
        gameWin = tileMap.didWin();
        if (gameWin) {
            gameWinSound.play();
        }
    }
}

function checkGameOver() {
    if (!gameOver) {
        gameOver = isGameOver();
        if (gameOver) {
            gameOverSound.play();
        }
    }
}

function isGameOver() {
    return enemies.some(
        enemy => !pacman.powerDotActive && enemy.collideWith(pacman)
    )
}

function pause() {
    return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
    if (gameOver || gameWin) {
        let text = "      Ganaste!";
        if (gameOver) {
            text = "      Perdiste";
        }

        ctx.fillStyle = "rgb(65, 65, 59";
        ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);

        ctx.font = "75px comic sans";
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);


        if (text === "      Perdiste") {
            ctx.fillStyle = "#ff0000";
        } else {
            ctx.fillStyle = "rgb(21, 224, 58)";
        }
        ctx.fillText(text, 10, canvas.height / 2);
    }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);

const loadPage = document.getElementById('loadPage');

loadPage.addEventListener('click', () => {
    location.reload();
})


