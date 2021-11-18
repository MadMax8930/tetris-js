export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playField = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    activePiece = {
        x: 0,
        y: 0,
        blocks: [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        rotationsIndex: 0,
        rotations: [
            [
                [0,1,0],
                [1,1,1],
                [0,0,0]
            ],
            [
                [0,1,0],
                [0,1,1],
                [0,1,0]
            ],
            [
                [0,0,0],
                [1,1,1],
                [0,1,0]
            ],
            [
                [0,1,0],
                [1,1,0],
                [0,1,0]
            ]
        ]
    };

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
        }
    }

    rotatePiece() {
        // if(this.activePiece.rotationIndex === 3) {
        //     this.activePiece.rotationIndex = 0;
        // } else {
        //     this.activePiece.rotationsIndex ++;
        // }
        // or
        // this.activePiece.rotationsIndex = (this.activePiece.rotationsIndex + 1) % 4;
        //if -->  this.activePiece.rotationsIndex = (this.activePiece.rotationsIndex + 3) % 4 + 4;

        this.activePiece.rotationsIndex = this.activePiece.rotationsIndex < 3 ? this.activePiece.rotationsIndex + 1 : 0;
        this.activePiece.blocks = this.activePiece.rotations[this.activePiece.rotationsIndex];

        if (this.hasCollision()) {
            this.activePiece.rotationsIndex = this.activePiece.rotationsIndex > 0 ? this.activePiece.rotationsIndex - 1 : 3;
        }
        return this.activePiece.blocks;
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
}