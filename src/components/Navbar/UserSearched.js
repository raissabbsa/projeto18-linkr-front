import styled from "styled-components";

export default function UserSearched({ user }) {
	const { picture_url, username } = user;
	return (
		<UserContainer>
			<img src={picture_url} alt="avatar" />
			<p>{username}</p>
		</UserContainer>
	);
}

const UserContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	img {
		width: 40px;
		height: 40px;
	}
	p {
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		color: #515151;
	}
`;
