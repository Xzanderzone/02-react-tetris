import { useState, useEffect } from "react";
import createStage from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
	const [stage, setStage] = useState(createStage());
	const [rowsCleared, SetRowsCleared] = useState(0);

	useEffect(() => {
		SetRowsCleared(0);

		const sweepRows = (newStage) =>
			newStage.reduce((ack, row) => {
				//if all cells are filled (none left on 0)
				if (row.findIndex((cell) => cell[0] === 0) === -1) {
					SetRowsCleared((prev) => prev + 1);
					//add new empty line in ack(ackumulator= new field without cleared row)
					ack.unshift(new Array(newStage[0].length).fill([0, "clear"]));
					return ack;
				}
				ack.push(row);
				return ack;
			}, []);

		const updateStage = (prevStage) => {
			const newStage = prevStage.map((row) =>
				row.map((cell) => (cell[1] === "clear" ? [0, "clear"] : cell))
			);
			//draw tetromino
			player.tetromino.forEach((row, y) => {
				row.forEach((value, x) => {
					if (value !== 0) {
						newStage[y + player.pos.y][x + player.pos.x] = [
							value,
							`${player.collided ? "merged" : "clear"}`,
						];
					}
				});
			});
			if (player.collided) {
				resetPlayer();
				return sweepRows(newStage);
			}
			return newStage;
		};
		setStage((prevStage) => updateStage(prevStage));
	}, [player, resetPlayer]);

	return [stage, setStage, rowsCleared];
};
