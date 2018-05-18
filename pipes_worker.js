const WHITE   = 37;
const CYAN    = 36;
const MAGENTA = 35;
const BLUE    = 34;
const YELLOW  = 33;
const GREEN   = 32;
const RED     = 31;

const COLS = 24;
const ROWS = 64;
const rows = ROWS;
const cols = COLS;

const U = 0;
const R = 1;
const D = 2;
const L = 3;

const charSets = ["━","┃", "┗", "┏", "┛", "┓" ];

function rand(rangeMax) {
    return Math.floor(Math.random() * rangeMax);
}

function movecursor(x, y) {
    postMessage("\033[" + x + ";" + y + "H");
}
function printcoloredstr(ch, color) {
    postMessage("\033[" + color + "m" + ch);
}
function randbool() {
    return Math.random() >= 0.5;
}
function getColor() {
    return rand(7) + 31;
}

class Pipe {
    constructor() {
        this.reset();
    }
    reset() {
        if (randbool()) {
            if (randbool()) {
                this.y = 0;
                this.direction = D;
            } else {
                this.y = ROWS - 2;
                this.direction = U;
            }
            this.x = rand(COLS - 1);
        } else {
            if (randbool()) {
                this.x = 0;
                this.direction = R;
            } else {
                this.x = COLS - 1;
                this.direction = L;
            }
            this.y = rand(ROWS - 1);
        }
        this.lastDirection = this.direction;
        this.track = 2 + rand(8);
        this.color = getColor();
    }

    turnPipe() {
        this.lastDirection = this.direction;
        switch(this.direction) {
            case U:
            case D:
                if (randbool()) this.direction = L;
                else if (randbool()) this.direction = R;
                break;
            case L:
            case R:
                if (randbool()) this.direction = U;
                else if (randbool()) this.direction = D;
        }
        this.track = 2 + rand(8);       
    }

    print() {
        const map = [
                        [0, 3, 0, 2],
                        [4, 1, 2, 1],
                        [0, 5, 0, 4],
                        [5, 1, 3, 1]
                    ];
        console.log("last dir: " + this.lastDirection);
        const ch = charSets[map[this.lastDirection][this.direction]];
        movecursor(this.x, this.y);
        printcoloredstr(ch, this.color);
        this.lastDirection = this.direction;
    }

    update() {
        this.track -= 1;
        if (this.track <= 0) {
            this.turnPipe();
        } else {
            switch(this.direction) {
                case U:
                    this.y -= 1;
                    break;
                case D:
                    this.y += 1;
                    break;
                case L:
                    this.x -= 1;
                    break;
                case R:
                    this.x += 1;
            }

            /* if (this.x <= 0) {
                this.x = COLS - 1;
            } else if (this.x >= COLS) {
                this.x = 0
            }
            if (this.y <= 0) {
                this.y = ROWS - 1;
            } else if (this.y >= ROWS) {
                this.y = 0;
            }*/
            if (this.x <= 0 || this.x >= COLS || this.y <= 0 || this.y >= ROWS) {
                this.reset();
            }

        } 
        this.print();
    }
}

var pipes = [ new Pipe(), new Pipe() ];

function updatePipes() {
    console.log("aaa");
    pipes.forEach(function(pipe) {
        pipe.update();
    });

    setTimeout("updatePipes()", 50);
}

updatePipes();
