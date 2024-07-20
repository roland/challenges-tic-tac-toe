import {useState} from "react";

export function Board() {
    const initialStates = {
        board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        status: 'Next player: X',
        selectionState: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        gameEnded: false,
    }
    const [board, setBoard] = useState(initialStates.board);
    const [status, setStatus] = useState(initialStates.status);
    const [selectionState, setSelectionState] = useState(initialStates.selectionState);
    const [currentPlayer, setCurrentPlayer] = useState(initialStates.currentPlayer);
    const [gameEnded, setGameEnded] = useState(initialStates.gameEnded);

    const isWinningState = () => {
        const winningStates = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 5, 9],
            [3, 5, 7],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9]
        ];

        for (const state of winningStates) {
            if (selectionState[state[0]] &&
                selectionState[state[0]] === selectionState[state[1]] &&
                selectionState[state[1]] === selectionState[state[2]])
                return true;
        }

        return false;
    }

    const isTie = () => {
        for (let cell = 1; cell <= 9; cell++) {
            if (!selectionState[cell])
                return false;
        }
        return true;
    }

    const playerClicked = (cell) => {
        if (gameEnded)
            return;

        if (selectionState[cell])
            return;

        selectionState[cell] = currentPlayer;
        setSelectionState([...selectionState])

        console.log(selectionState);


        if (isWinningState()) {
            setStatus(`Winner: ${currentPlayer}`);
            setGameEnded(true);
            return;
        }

        if (isTie()) {
            setStatus('Tie');
            setGameEnded(true);
            return;
        }

        const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);
        setStatus(`Next player: ${nextPlayer}`)
    };

    const resetGame = () => {
        setBoard(initialStates.board);
        setStatus(initialStates.status);
        setSelectionState(initialStates.selectionState);
        setCurrentPlayer(initialStates.currentPlayer);
        setGameEnded(initialStates.gameEnded);
    }

    return (
        <div className="game">
            <div className="status">{status}</div>
            <div className="board">
                {board.map(x => (
                    <div key={x} className="cell"
                         onClick={(e => playerClicked(x))}>{selectionState[x] ? selectionState[x] : ' '}</div>
                ))}
            </div>
            <div>
                <button onClick={(e) => resetGame()}>Reset</button>
            </div>
        </div>
    );
}