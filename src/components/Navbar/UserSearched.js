import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserSearched({ user }) {
	const navigate = useNavigate();

	const { picture_url, username, id } = user;
	return (
		<UserContainer onClick={() => navigate(`/user/${id}`)}>
			<img src={picture_url} alt="avatar" />
			<p>{username}</p>
		</UserContainer>
	);
}

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	cursor: pointer;
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
	}
	p {
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		color: #515151;
	}
`;
