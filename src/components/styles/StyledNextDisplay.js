import styled from "styled-components";

export const StyledNextDisplay = styled.div`
	display: grid;
	grid-template-rows: repeat(${(props) => props.height}, calc(10vw / ${(props) => props.width}));
	grid-template-columns: repeat(${(props) => props.width}, 1fr);
	grid-gap: 1px;
	border: 2px solid #333;
	border-radius: 20px;
	margin: 0px 0px 15px 30px;
	padding: 15px 5px 15px 25px;
	width: 75%;
	border: 4px solid #333;
	max-width: 10vw;
	background: #000;
`;
