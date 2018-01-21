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

    let threeSizeShip2 = randomRecursionThree();

    function randomRecursionThree() {
        let xy = randomThreeSizeShip();
        let z = threeSizeShip1;
        if ((xy.row == z.row) && (xy.column == z.column || xy.column == (z.column-1) || xy.column == (z.column+1))) {
            return randomRecursionThree()
        }
        return xy
    }

    // let twoSizeShip1 = 

    console.log(threeSizeShip1, threeSizeShip2);
};