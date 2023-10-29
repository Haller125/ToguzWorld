import Board from "./board";
import {Player, Pointers} from "./types";
import {busy, K, N} from "./constant";

export function minimax(
    board: Board,
    depth: number,
    player: Player,
    pointers: Pointers,
    isAtsyrau: boolean = false
): number {
    if (depth === 0 || board.kaznas[0] > K * N || board.kaznas[1] > K * N) {
        pointers.move = -1;
        return board.kaznas[0];
    }
    if (isAtsyrau) {
        let newBoard = board.clone();
        if (!newBoard.isMovePossible(player)) {
            newBoard.atsyrauFunction(player);
            return newBoard.kaznas[0];
        }
    }

    let dummyPointers = { move: 0, tuzdek: false };

    let sign = player === 0 ? 1 : -1;
    let bestValue = -127 * sign;
    let played = false;

    if (!board.isMovePossible(player)) {
        let copyBoard = board.clone();
        return minimax(copyBoard, depth, player === 0 ? 1 : 0, dummyPointers);
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

            withTuzdek = minimax(tuzdekBoard, depth - 1, player === 0 ? 1 : 0, dummyPointers);
        }

        localBoard.accountSocket(target, player);
        let withoutTuzdek = minimax(
            localBoard,
            depth - 1,
            player === 0 ? 1 : 0,
            dummyPointers
        );

        if (sign * withoutTuzdek > sign * bestValue) {
            pointers.move = i;
            bestValue = withoutTuzdek;
        }

        if (sign * withTuzdek > sign * bestValue) {
            pointers.tuzdek = true;
            bestValue = withTuzdek;
        } else {
            pointers.tuzdek = false;
        }
    }

    if (played) {
        return bestValue;
    } else {
        pointers.move = -1;
        return board.kaznas[0];
    }
}

export function withoutAB(d1: number, d2: number): void {
    let board = new Board();
    console.log(board.toString());

    let player1Pointer : Pointers = { move: 0, tuzdek: false };
    let player2Pointer : Pointers = { move: 0, tuzdek: false };

    let atsyrauFor1 = false;
    let atsyrauFor2 = false;

    while (true) {
        if (board.isMovePossible(0)) {
            busy("Alice");
            minimax(board, d1, 0, player1Pointer);
            board.pli(player1Pointer.move, player1Pointer.tuzdek, 0);
            if (atsyrauFor1) {
                atsyrauFor1 = false;
            }
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
        if (board.kaznas[1] > K * N) {
            console.log("p2 win.");
            break;
        } else if (board.kaznas[0] > K * N) {
            console.log("p1 win.");
            break;
        }

        if (board.isMovePossible(1)) {
            busy("Bob");
            let value = minimax(board, d2, 1, player2Pointer);
            if (player1Pointer.move === -1) {
                console.log("Game ended.");
                // TODO: determine winner from kaznas
                break;
            }
            board.pli(player2Pointer.move, player2Pointer.tuzdek, 1);
            console.log(`Opponent's move: ${player1Pointer.move + 1} (worst outcome: ${value})`);
            if (atsyrauFor2) {
                atsyrauFor2 = false;
            }
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
    }
}