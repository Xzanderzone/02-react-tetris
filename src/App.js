import React from "react";
import Tetris from "./components/Tetris";

const App = () => {
	return (
		<>
			<div className="neo">
				<div className="neon">
					<span className="text" data-text="TETRIS">
						TETRIS
					</span>
					<span className="gradient"></span>
					<span className="spotlight"></span>
				</div>
			</div>
			<div className="Pieters Amazing Tetris game">
				<Tetris />
			</div>
		</>
	);
};

export default App;
