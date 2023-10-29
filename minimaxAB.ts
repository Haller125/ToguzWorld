import Board from "./board";
import {Player, Pointers} from "./types";
import {K, N} from "./constant";

export function minimaxWithAB(board: Board, depth: number, alpha: number, beta: number, player: Player, pointers: Pointers, isAtsyrau: boolean = false): number {
    if (depth === 0 || board.kaznas[0] > K * N || board.kaznas[1] > K * N) {
        pointers.move = -1;
        return board.kaznas[0];
    }
    if (isAtsyrau && !board.isMovePossible(player)) {
        let newBoard = board.clone();
        newBoard.atsyrauFunction(player);
        return newBoard.kaznas[0];
    }

    let dummyPointers: Pointers = {move: 0, tuzdek: false};
    let sign = (player === 0) ? 1 : -1;
    let bestValue = -127 * sign;
    let played = false;

    if (!board.isMovePossible(player)) {
        let copyBoard = board.clone();
        return minimaxWithAB(copyBoard, depth, alpha, beta, player === 0 ? 1 : 0, dummyPointers, true);
    }
    for (let i = player * K; i < player * K + K; i++) {
        let localBoard = board.clone();
        if (localBoard.sockets[i] === 0) {
            continue;
        }
        played = true;
        let target = localBoard.playSocket(i);
        let withTuzdek = -127 * sign;

        if (localBoard.tuzdekPossible(target, player)) {
            let tuzdekBoard = localBoard.clone();
            tuzdekBoard.tuzdeks[player] = target;
            tuzdekBoard.accountSocket(target, player);
            withTuzdek = minimaxWithAB(tuzdekBoard, depth - 1, alpha, beta, player === 0 ? 1 : 0, dummyPointers);
        }

        if (beta > alpha) {
            localBoard.accountSocket(target, player);
            let withoutTuzdek = minimaxWithAB(localBoard, depth - 1, alpha, beta, player === 0 ? 1 : 0, dummyPointers);
            if (sign * withoutTuzdek > sign * bestValue) {
                pointers.move = i;
                bestValue = withoutTuzdek;
                if (player === 0)
                    alpha = Math.max(alpha, bestValue);
                else
                    beta = Math.min(beta, bestValue);
            }
            if (sign * withTuzdek > sign * bestValue) {
                pointers.tuzdek = true;
                bestValue = withTuzdek;
                if (player === 0)
                    alpha = Math.max(alpha, bestValue);
                else
                    beta = Math.min(beta, bestValue);
            } else {
                pointers.tuzdek = false;
            }
            if (beta <= alpha) {
                break;
            }
        }
    }
    if (played) {
        return bestValue;
    } else {
        pointers.move = -1;
        return board.kaznas[0];
    }
}

export function withAB(d1: number, d2: number): void {
    const MIN_INT = Number.MIN_SAFE_INTEGER;
    const MAX_INT = Number.MAX_SAFE_INTEGER;

    let board = new Board();
    let pointers1: Pointers = {move: 0, tuzdek: false};
    let pointers2: Pointers = {move: 0, tuzdek: false};

    let atsyrauFor1 = false;
    let atsyrauFor2 = false;

    while (true) {
        if (board.isMovePossible(0)) {
            // busy("Alice"); // Assuming you have a busy function implementation
            minimaxWithAB(board, d1, MIN_INT, MAX_INT, 0, pointers1);
            board.pli(pointers1.move, pointers1.tuzdek, 0);
            // unbusy(); // Assuming you have an unbusy function implementation
        } else {
            if (!atsyrauFor1) {
                atsyrauFor1 = true;
            } else {
                board.atsyrauFunction(1);
                console.log(board.rotate().toString());
                break;
            }
        }

        console.log(board.rotate().toString());
        // Implement the logic for determining the winner based on kaznas.

        if (board.isMovePossible(1)) {
            // busy("Bob"); // Assuming you have a busy function implementation
            // let rotated = board.rotate();
            let value = minimaxWithAB(board, d2, MIN_INT, MAX_INT, 1, pointers2);
            if (pointers1.move === -1) {
                console.log("Game ended.");
                // TODO: determine winner from kaznas
                break;
            }
            board.pli(pointers2.move, pointers2.tuzdek, 1);
            console.log(`Opponent's move: ${pointers1.move + 1} (worst outcome: ${value})`);
        } else {
            if (!atsyrauFor2) {
                atsyrauFor2 = true;
            } else {
                board.atsyrauFunction(0);
                console.log(board.rotate().toString());
                break;
            }
        }
        console.log(board.rotate().toString());
        // unbusy(); // Assuming you have an unbusy function implementation
    }
}
