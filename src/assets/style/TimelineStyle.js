import styled from "styled-components";

export const TimelineContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	margin-top: 150px;
	& > h1 {
		font-size: 43px;
		font-weight: 700;
		font-family: "Oswald";
		color: #ffffff;
		margin-bottom: 43px;
	}
	@media (max-width: 1024px) {
		margin-top: 30px;
	}
`;
export const BodyContent = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: center;
	height: 100vh;
`;
