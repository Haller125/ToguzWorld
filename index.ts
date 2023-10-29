import {withAB} from "./minimaxAB";

// (function () {
//     withoutAB(10, 2);
// })();

(function () {
    withAB(10, 2);
})();

// Check cloning board
// (function () {
//     const board = new Board();
//     console.log(board.toString());
//     const clone = board.clone();
//     // clone.sockets = [-1];
//     clone.sockets.fill(-1);
//     console.log(clone.toString());
//     console.log(board.toString());
// })();