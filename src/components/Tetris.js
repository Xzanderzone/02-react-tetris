import React, { useState } from "react";

import createStage, { checkCollision } from "../gameHelpers";
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useInterval } from "../hooks/useInterval";
import { useGameStatus } from "../hooks/useGameStatus";

import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";
import NextTetronomio from "./NextTetronomio";

const Tetris = () => {
	const [dropTime, setDropTime] = useState(null);
	const [gameOver, setGameOver] = useState(false);
	const [paused, setPaused] = useState(false);
	const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
	const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
	const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

	const movePlayer = (dir) => {
		if (!checkCollision(player, stage, { x: dir, y: 0 })) updatePlayerPos({ x: dir, y: 0 });
	};

	const startGame = () => {
		//reset
		setStage(createStage());
		setDropTime(1000);
		resetPlayer();
		setScore(0);
		setLevel(0);
		setRows(0);
		setGameOver(false);
	};

	const drop = () => {
		//increase level after 10 rows cleared
		if (rows > (level + 1) * 10) {
			setLevel((prev) => prev + 1);
			setDropTime(1000 / (level + 1) + 200);
		}
		if (!checkCollision(player, stage, { x: 0, y: 1 })) {
			updatePlayerPos({ x: 0, y: 1, collided: false });
		} else {
			if (player.pos.y < 1) {
				setGameOver(true);
				setDropTime(null);
			}
			updatePlayerPos({ x: 0, y: 0, collided: true });
		}
	};
	const keyUp = ({ keyCode }) => {
		if (!gameOver) {
			if (keyCode === 40) {
				setDropTime(1000 / (level + 1) + 200);
			}
			// pause game
			if (keyCode === 27) {
				setPaused(!paused);
			}
		} else if (keyCode === 40) startGame();
	};
	const dropPlayer = () => {
		setDropTime(null);
		drop();
	};

	const move = ({ keyCode }) => {
		if (!gameOver && !paused) {
			if (keyCode === 37) {
				movePlayer(-1);
			} else if (keyCode === 39) {
				movePlayer(1);
			} else if (keyCode === 40) {
				//down
				dropPlayer();
			} else if (keyCode === 38) {
				//up
				playerRotate(stage, 1);
			}
		}
	};

	useInterval(() => {
		if (!paused) drop();
	}, dropTime);

	return (
		<StyledTetrisWrapper role="button" tabIndex="0" onKeyUp={keyUp} onKeyDown={(e) => move(e)}>
			<StyledTetris>
				<Stage stage={stage} />
				<aside>
					{gameOver ? (
						<div>
							<Display gameOver={gameOver} text="Game Over" />
							<Display text={`Final Score: ${score}`} />
							<Display text={`Total Rows: ${rows}`} />
							<Display text={`Reached Level: ${level}`} />
							{(localStorage.getItem("score") || 0) < score
								? localStorage.setItem("score", score)
								: ""}

							<Display
								text={`Highscore: ${
									localStorage.getItem("score") ? localStorage.getItem("score") : "0"
								}`}
							/>
						</div>
					) : (
						<div>
							{paused ? <Display text={`Game Paused!`} /> : ""}
							<NextTetronomio tetronomino={player.nextTetromino} />
							<Display text={`Score: ${score}`} />
							<Display text={`Rows: ${rows}`} />
							<Display text={`Level: ${level}`} />
							<Display text={`Highscore: ${localStorage.getItem("score") || "0"}`} />
						</div>
					)}
					<StartButton callback={startGame} />
				</aside>
			</StyledTetris>
		</StyledTetrisWrapper>
	);
};
export default Tetris;
