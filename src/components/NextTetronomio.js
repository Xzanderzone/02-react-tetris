import React from "react";
import { StyledNextDisplay } from "./styles/StyledNextDisplay";
import Cell from "./Cell";

const NextTetromino = ({ tetronomino }) => (
	<div>
		<StyledNextDisplay width={4} height={4}>
			{tetronomino.shape.map((row, y) => {
				return row.map((value, x) => {
					//dont render 4th array for straight line (dispaly 3x3)
					// if (tetronomino.shape.length === 4 && x == 3) return;
					if (tetronomino.shape.length <= 3 && x == 0 && y == 0)
						return (
							<>
								<Cell key={"padded" + y} type={0} />
								<Cell key={"padded" + y} type={0} />
								<Cell key={"padded" + y} type={0} />
								<Cell key={"padded" + y} type={0} />
								<Cell key={"next" + y} type={value} />
							</>
						);
					if (tetronomino.shape.length === 3 && x == 2)
						return (
							<>
								<Cell key={"next" + y} type={value} />
								<Cell key={"padded" + y} type={0} />
							</>
						);
					if (tetronomino.shape.length === 2 && x == 1)
						//padd square to fit
						return (
							<>
								<Cell key={"next" + y} type={value} />
								<Cell key={"padded" + y} type={0} />
								<Cell key={"padded" + y} type={0} />
							</>
						);
					return <Cell key={"next" + x} type={value} />;
				});
			})}
		</StyledNextDisplay>
	</div>
);
//react memo = remember field and only render changes (200 renders down to 4)
export default React.memo(NextTetromino);
