import styled from "styled-components";

export const PostContainer = styled.div`
	display: flex;
	width: 611px;
	padding: 20px;
	background-color: #171717;
	border-radius: 16px;
	margin-bottom: 16px;
	@media (max-width: 611px) {
		width: 100%;
		border-radius: 0;
	}
`;

export const Post = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #1E1E1E;
	margin-bottom: 44px;
	border-radius: 16px;
	padding-bottom: 25px;
`

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80px;
	& > img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
		margin-bottom: 10px;
	}
	svg {
		font-size: 20px;
		color: white;
		margin-bottom: 5px;
		margin-top: 10px;
	}

	p {
		color: white;
		font-size: 11px;
	}
	@media (max-width: 611px) {
		width: 20%;
		p {
			font-size: 8px;
		}
	}
`;

export const Content = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	p {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 20px;
		color: #b7b7b7;
		margin-bottom: 10px;
	}
	h1 {
		color: white;
		font-size: 22px;
		cursor: pointer;
	}
	@media (max-width: 611px) {
		p {
			font-size: 15px;
		}
		h1 {
			margin-left: 0;
			font-size: 17px;
		}
	}
`;

export const tagStyle = {
	color: "white",
	fontWeight: 700,
	cursor: "pointer",
	fontSize: 20,
};

export const Top = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	div {
		display: flex;
		margin-bottom: 15px;
	}
	svg {
		color: white;
		font-size: 15px;
		margin-left: 10px;

	}
	@media (max-width: 611px) {
		width: 100%;
		padding-right: 10px;
		h1 {
			font-size: 17px;
			margin-left: 0;
		}
	}
`;
export const LinkContainer = styled.a`
	width: 100%;
	height: 155px;
	border: 1px solid #4d4d4d;
	border-radius: 11px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	text-decoration: none;
	img {
		height: 100%;
		width: 155px;
		border-radius: 0px 12px 13px 0px;
		object-fit: cover;
	}
	@media (max-width: 611px) {
		width: 95%;
	}
`;
export const LinkInfo = styled.div`
	height: 100%;
	padding: 22px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	gap: 10px;
	p:nth-child(1) {
		font-size: 16px;
		line-height: 19px;
		color: #cecece;
		overflow: hidden;
	}
	p:nth-child(2) {
		font-size: 11px;
		line-height: 13px;
		color: #9b9595;
		overflow: hidden;
	}
	p:nth-child(3) {
		font-size: 11px;
		line-height: 13px;
		color: #cecece;
	}
`;

export const mentionStyle = {
	color: "gray",
	fontWeight: 400,
	fontSize: 20,
	cursor: "pointer",
};

export const Form = styled.form`
	& > input {
		width: 503px;
		flex-wrap: wrap;
		border-radius: 7px;
		border: none;
		background-color: #ffffff;
		padding: 2px;
		font-size: 20px;
		color: #4c4c4c;
	}
	@media (max-width: 611px) {
		input {
			width: 100%;
		}
	}
`;


