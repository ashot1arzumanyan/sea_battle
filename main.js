document.getElementById('start').addEventListener('click', start);

let ship3;
let ship21;
let ship22;
let ship11;
let ship12;
let ship13;

function start() {

    let ships = [ship3, ship21, ship22, ship11, ship12, ship13];

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
    
    function randomShip1() {
        let row = randomRowOrColumn('floor', 10, 0);
        let column = randomRowOrColumn('floor', 10, 0)
        return new ShipsLocation(row, column);
    }
    
    function hasRowOrRowplus1(row) {
        let columns = [];
        ships.forEach(ship => {
            if (ship && (ship.row.indexOf(row[0]) != -1 || ship.row.indexOf(row[0]*1+1) != -1)) {
                columns = columns.concat(ship.column);
            }
        })
        return columns;
    }

    function verify(column, columns) {
        if (columns.indexOf(column) == -1) {
            return true;
        }
        return false;
    }

    function similarity(rc, columns) {
        let match = verify(rc.column[0], columns);
        if (match) {
            return rc;
        }
        return recursionShip2();
    }
    
    function recursionShip2() {
        let rc = randomShip2();
        let columns = hasRowOrRowplus1(rc.row);
        if (!columns.length) {
            return rc;
        }
        return similarity(rc, columns);
    }
    
    function hasRow(row) {
        let columns = [];
        ships.forEach(ship => {
            if (ship && ship.row.indexOf(row[0]) != -1) {
                columns = columns.concat(ship.column);
            }
        })
        return columns;
    }
    
    function recursionShip1() {
        let rc = randomShip1();
        let columns = hasRow(rc.row);
        if (!columns.length) {
            return rc;
        }
        return similarity(rc, columns);
    }

    ship3 = randomShip3();
    ship3.column.push(ship3.column*1-1, ship3.column*1+1);
    ship21 = recursionShip2();
    ship21.row.push(ship21.row[0]*1+1);
    ship22 = recursionShip2();
    ship22.row.push(ship22.row[0]*1+1);
    ship11 = recursionShip1();
    ship12 = recursionShip1();
    ship13 = recursionShip1();
    console.log(ship3);
    console.log(ship21);
    console.log(ship22);
    console.log(ship11);
    console.log(ship12);
    console.log(ship13);
};