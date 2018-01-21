document.getElementById('start').addEventListener('click', start);

function ShipsLocation(row, column) {
    this.row = row,
    this.column = column
}

function start() {
    function randomRowOrColumn(doing, multiply, plus) {
        return Math[doing]((Math.random() * multiply) + plus)
    }

    function randomThreeSizeShip() {
        let row = randomRowOrColumn('floor', 10, 0);
        let column = randomRowOrColumn('round', 7, 1);
        return new ShipsLocation(row, column);
    }

    let threeSizeShip1 = randomThreeSizeShip();

    function randomRecursion() {
        let xy = randomThreeSizeShip();
        let z = threeSizeShip1;
        if ((xy.row == z.row) && (xy.column == z.row && xy.column == z.column && xy.column == z.column)) {
            return randomRecursion()
        }
        return xy
    }

    let threeSizeShip2 = randomRecursion();

    console.log(threeSizeShip1, threeSizeShip2);
};