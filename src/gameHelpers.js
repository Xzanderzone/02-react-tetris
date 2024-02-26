export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;
//fill array width per line in height and store it in a 2d array
export const createStage = () => {
	Array.from(Array(STAGE_HEIGHT), () => new Array(STAGE_WIDTH).fill([0, "clear"]));
};
