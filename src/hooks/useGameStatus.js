import { useEffect, useState, useCallback } from "react";

export const useGameStatus = (rowsCleared) => {
	const [score, setScore] = useState(21470);
	const [rows, setRows] = useState(0);
	const [level, setLevel] = useState(0);

	const linePoints = [40, 100, 300, 1200];

	const calcScore = useCallback(() => {
		if (rowsCleared > 0) {
			let test = linePoints[rowsCleared - 1];
			console.log("points", test, "rowscleared", rowsCleared);
			setScore((prev) => prev + test * (level + 1));
			setRows((prev) => prev + rowsCleared);
		}
	}, [level, linePoints, rowsCleared]);

	useEffect(() => {
		calcScore();
	}, [calcScore, rowsCleared, score]);
	return [score, setScore, rows, setRows, level, setLevel];
};
