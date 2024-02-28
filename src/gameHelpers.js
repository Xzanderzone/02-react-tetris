export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
//fill array width per line in height and store it in a 2d array
export const createStage = () => {
	return Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, "clear"]));
};
export default createStage;

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
	for (let y = 0; y < player.tetromino.length; y++) {
		for (let x = 0; x < player.tetromino[y].length; x++) {
			//check if empty cell
			if (player.tetromino[y][x] !== 0) {
				if (
					//stay inside gameboard height y
					!stage[y + player.pos.y + moveY] ||
					//stay inside gameboard width x
					!stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
					//is next cell clear
					stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== "clear"
				) {
					return true;
				}
			}
		}
	}
	return false;
};
