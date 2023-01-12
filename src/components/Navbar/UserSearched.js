import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserSearched({ user, followers }) {
	const navigate = useNavigate();
	const isFollower = followers.find(followerId => followerId === user.id)


	const { picture_url, username, id } = user;
	return (
		<UserContainer onClick={() => navigate(`/user/${id}`)} isFollower={isFollower}>
			<img src={picture_url} alt="avatar" />
			<p>{username}</p>
			{isFollower && <span>• following</span>}
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
	span {
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		color: #C5C5C5;
	}
`;
