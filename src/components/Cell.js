import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos";
const Cell = ({ type }) => <StyledCell type={type} color={TETROMINOS[type].color} />;
//react memo = remember field and only render changes (200 renders down to 4)
export default React.memo(Cell);
