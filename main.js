document.getElementById('start').addEventListener('click', start);

let ship3;
let ship21;
let ship22;
let allRows = [];
let allColumns = [];

function ShipsLocation(row, column) {
    this.row = [row],
    this.column = [column]
}

function randomRowOrColumn(doing, multiply, plus) {
    return Math[doing]((Math.random() * multiply) + plus)
}

function randomShip3() {
    let row = randomRowOrColumn('floor', 10, 0);
    let column = randomRowOrColumn('round', 7, 1);
    return new ShipsLocation(row, column);
}

function randomShip2() {
    let row = randomRowOrColumn('floor', 9, 0);
    let column = randomRowOrColumn('floor', 10, 0)
    return new ShipsLocation(row, column);
}

function recursionShip2() {
    let rc = randomShip2();
    if (allRows.indexOf(rc.row[0]) == -1 && allRows.indexOf(rc.row[0]*1+1) == -1) {
        return rc;
    } else if (allColumns.indexOf(rc.column[0]) == -1) {
        return rc;
    }
    return recursionShip2();
}

function start() {
    ship3 = randomShip3();
    ship3.column.push(ship3.column*1-1, ship3.column*1+1);
    allRows = ship3.row;
    allColumns = ship3.column;
    ship21 = recursionShip2();
    ship21.row.push(ship21.row[0]*1+1);
    allRows = allRows.concat(ship21.row);
    allColumns = allColumns.concat(ship21.column);
    ship22 = recursionShip2();

    console.log(ship3, ship21, ship22);
};