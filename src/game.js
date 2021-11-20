export default class Game {

    score = 0;
    lines = 0;
    level = 0;
    playField = this.createPlayField();
    activePiece = this.createPiece();
    nextPiece = this.createPiece();


    getState() {
        const playField = this.createPlayField();
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < this.playField.length; y++) {
            playField[y] = [];

            for (let x = 0; x < this.playField[y].length; x++) {
                playField[y][x] = this.playField[y][x];                
            }
        }

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    playField[pieceY + y][pieceX + x] = blocks[y][x];
                } 
            }
        }

        return {
            playField
        };
    }

    createPlayField() {
        const playField = [];

        for (let y = 0; y < 20; y++) {
            playField[y] = [];

            for (let x = 0; x < 10; x++) {
                playField[y][x] = 0;                
            }
        }

        return playField;
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index];
        const piece = {};

        switch (type) {
            case 'I':
                piece.blocks = [
                    [0,0,0,0],
                    [1,1,1,1],
                    [0,0,0,0],
                    [0,0,0,0]
                ];
                break;
            case 'J':
                piece.blocks = [
                    [0,0,0],
                    [2,2,2],
                    [0,0,2]
                ];
                break;
            case 'L':
                piece.blocks = [
                    [0,0,0],
                    [3,3,3],
                    [3,0,0]
                ];
                break;
            case 'O':
                piece.blocks = [
                    [0,0,0,0],
                    [0,4,4,0],
                    [0,4,4,0],
                    [0,0,0,0],
                ];
                break;
            case 'S':
                piece.blocks = [
                    [0,0,0],
                    [0,5,5],
                    [5,5,0]
                ];
                break;
            case 'T':
                piece.blocks = [
                    [0,0,0],
                    [6,6,6],
                    [0,6,0]
                ];
                break;
            case 'Z':
                piece.blocks = [
                    [0,0,0],
                    [7,7,0],
                    [0,7,7]
                ];
                break;
            default:
                throw new Error('Unknown type');
        }

        piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
        piece.y = -1;

        return piece;
    }

    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }

    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }

    movePieceDown() {
        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
            this.updatePieces();
        }
    }

    rotatePiece() {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;

        const temp = [];
        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0);
        }

        for (let y = 0; y < length; y++) {
            for (let x = 0; x < length; x++) {
                temp[x][y] = blocks[length - 1 - y][x];
            }
        }

        this.activePiece.blocks = temp;

        if (this.hasCollision()) {
            this.activePiece.blocks = blocks;
        }
    }

    hasCollision() {
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;
    
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (
                    blocks[y][x] && 
                    ((this.playField[pieceY + y] === undefined || this.playField[pieceY + y][pieceX + x] === undefined) ||
                    this.playField[pieceY + y][pieceX + x])
                ) {
                    return true;
                }
            }
        }
        
        return false;
    }

    lockPiece() {
        // const blocks = this.activePiece.blocks;
        // const pieceY = this.activePiece.y;
        // const pieceX = this.activePiece.x;
        const { y: pieceY, x: pieceX, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playField[pieceY + y][pieceX + x] = blocks[y][x];
                }
            }
        }
    }

    updatePieces() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }
}