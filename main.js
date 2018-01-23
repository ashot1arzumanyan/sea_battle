let ships = [];

start(1);

function hasRow(row) {
    let columns = [];
    for (let ii = 0, ll = ships.length; ii < ll; ii++) {
        if (ships[ii] && ships[ii].row.indexOf(row[0] * 1) != -1) {
            columns = columns.concat(ships[ii].column);
        }
    }
    return columns;
}

function verify(column, columns) {
    if (columns.indexOf(column) != -1) {
        return true;
    }
    return false;
}

function similarity(column, columns) {
    let match = verify(column[0] * 1, columns);
    if (match) {
        return true;
    }
    return false;
}

function ShipsLocation(row, column) {
    this.row = [row],
    this.column = [column]
}

function randomRowOrColumn(doing, multiply, plus) {
    return Math[doing]((Math.random() * multiply) + plus)
}

function randomShip3() {
    let row = Math.floor(Math.random() * 10);
    let column = Math.round(Math.random() * 7 + 1);
    return new ShipsLocation(row, column);
}

function randomShip2() {
    let row = Math.floor(Math.random() * 9);
    let column = Math.floor(Math.random() * 10);
    return new ShipsLocation(row, column);
}

function randomShip1() {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    return new ShipsLocation(row, column);
}

function hasRowOrRowPlus1(row) {
    let columns = [];
    for (let ii = 0, ll = ships.length; ii < ll; ii++) {
        if (ships[ii] && (ships[ii].row.indexOf(row[0] * 1) != -1 || ships[ii].row.indexOf(row[0] * 1 + 1) != -1)) {
            columns = columns.concat(ships[ii].column);
        }
    }
    return columns;
}

function recursionShip2() {
    let rc = randomShip2();
    let columns = hasRowOrRowPlus1(rc.row);
    if (columns.length == 0) {
        return rc;
    }
    let match = similarity(rc.column, columns);
    if (!match) {
        return rc;
    }
    return recursionShip2();
}

function recursionShip1() {
    let rc = randomShip1();
    let columns = hasRow(rc.row);
    if (columns.length == 0) {
        return rc;
    }
    let match = similarity(rc.column, columns);
    if (!match) {
        return rc;
    }
    return recursionShip1();
}

function start(gamerCount, firstClicked) {

    ships = [];
    let ship3;
    let ship21;
    let ship22;
    let ship11;
    let ship12;
    let ship13;

    let myPromis = new Promise((resolve, reject) => {
        resolve();
    });
    myPromis.then(() => {
            ship3 = randomShip3();
            ship3.column.push(ship3.column[0] * 1 - 1, ship3.column[0] * 1 + 1);
            return ship3;
        })
        .then((ship) => {
            ships.push(ship);
            ship21 = recursionShip2();
            ship21.row.push(ship21.row[0] * 1 + 1);
            return ship21;
        })
        .then((ship) => {
            ships.push(ship);
            ship22 = recursionShip2();
            ship22.row.push(ship22.row[0] * 1 + 1);
            return ship22;
        })
        .then((ship) => {
            ships.push(ship);
            ship11 = recursionShip1();
            return ship11;
        })
        .then((ship) => {
            ships.push(ship);
            ship12 = recursionShip1();
            return ship12;
        })
        .then((ship) => {
            ships.push(ship);
            ship13 = recursionShip1();
            return ship13
        })
        .then((ship) => {
            ships.push(ship);
            addingListener(gamerCount, firstClicked);
        });
};

function addingListener(gamerCount, firstClicked) {
    let counter = 0;
    let clicked = 0;
    let cells = document.getElementById('sea').getElementsByClassName('cell');
    for (let ii = 0, ll = cells.length; ii < ll; ii++) {
        cells[ii].addEventListener('click', gameCounter);
    }

    function removingListener(tt, color) {
        clicked += 1;
        tt.style.background = color;
        tt.removeEventListener('click', gameCounter);
    }

    function gameCounter(e) {
        let tt = e.target;
        let row = [tt.parentElement.dataset.row];
        let column = [tt.dataset.column];
        let columns = hasRow(row);
        if (columns.length == 0) {
            return removingListener(tt, 'gray');
        }
        let match = similarity(column, columns);
        if (!match) {
            return removingListener(tt, 'gray');
        }
        counter += 1;
        if (counter == 10) {
            let click = clicked + 1;
            gameOver(click, gamerCount, firstClicked);
        }
        removingListener(tt, 'red');

    }

    function gameOver(clicked, gamerCount, firstClicked) {
        let firstGamer = document.querySelector('.gamer_one');
        let lastGamer = document.querySelector('.gamer_two');
        if (gamerCount == 1) {
            firstGamer.style.opacity = '0.5';
            document.getElementById('score_one').innerText = 'Clicked: ' + clicked;
            lastGamer.style.opacity = '1';
            setTimeout(() => {
                let cells = document.getElementById('sea').getElementsByClassName('cell');
                for (let ii = 0, ll = cells.length; ii < ll; ii++) {
                    cells[ii].style.background = 'blue';
                }
                start(2, clicked);   
            }, 3333);
        } else {
            document.getElementById('score_two').innerText = 'Clicked: ' + clicked;
            firstGamer.style.opacity = '1';

            function changeBgColor(firstGamerColor, lastGamerColor) {
                firstGamer.style.background = firstGamerColor;
                lastGamer.style.background = lastGamerColor;
            }

            if (firstClicked >= clicked) {
                if (firstClicked == clicked) {
                    changeBgColor('yellow', 'yellow');
                } else {
                    changeBgColor('red', 'green');
                }
            } else {
                changeBgColor('green', 'red');
            }
            
            let startNewGame = document.getElementById('startNewGame');
            startNewGame.innerText = 'Start new game';
            startNewGame.style.visibility = 'visible';
            startNewGame.onclick = () => {
                window.location.reload();
            }
        }
    }
}