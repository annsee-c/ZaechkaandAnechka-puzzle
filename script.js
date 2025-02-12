const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");

const rows = 6;  // Количество строк (можно изменить)
const cols = 6;  // Количество колонок (можно изменить)
const imageSrc = "my-photo.jpg"; // ТВОЯ ФОТОГРАФИЯ

let pieces = [];
let img = new Image();
img.src = imageSrc;

img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    createPuzzle();
};

function createPuzzle() {
    let pieceWidth = img.width / cols;
    let pieceHeight = img.height / rows;

    // Разрезаем картинку на части
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let piece = {
                x: x * pieceWidth,
                y: y * pieceHeight,
                width: pieceWidth,
                height: pieceHeight,
                correctX: x * pieceWidth,
                correctY: y * pieceHeight
            };
            pieces.push(piece);
        }
    }

    shufflePieces();
}

// Перемешиваем части пазла
function shufflePieces() {
    pieces.sort(() => Math.random() - 0.5);
    drawPuzzle();
}

// Рисуем пазл на холсте
function drawPuzzle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(piece => {
        ctx.drawImage(img, piece.correctX, piece.correctY, piece.width, piece.height, piece.x, piece.y, piece.width, piece.height);
    });
}

// Добавляем возможность перетаскивания частей
let selectedPiece = null;

canvas.addEventListener("mousedown", function(event) {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;

    selectedPiece = pieces.find(piece => 
        mouseX > piece.x && mouseX < piece.x + piece.width &&
        mouseY > piece.y && mouseY < piece.y + piece.height
    );
});

canvas.addEventListener("mousemove", function(event) {
    if (!selectedPiece) return;
    selectedPiece.x = event.offsetX - selectedPiece.width / 2;
    selectedPiece.y = event.offsetY - selectedPiece.height / 2;
    drawPuzzle();
});

canvas.addEventListener("mouseup", function() {
    selectedPiece = null;
});

// Поздравление, если пазл собран правильно
function checkWin() {
    if (pieces.every(piece => piece.x === piece.correctX && piece.y === piece.correctY)) {
        setTimeout(() => alert("You did it! 💖 Happy Valentine's Day!"), 500);
    }
}