import styled from "styled-components";
import { FaRegHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { UserContext } from "../../providers/UserData";
import React, { useContext } from "react";

export function SinglePost({ post }) {
	console.log("🚀 ~ file: SinglePost.js:7 ~ SinglePost ~ post", post);
	const { picture_user, username, description, likes, user_id, link, link_title, link_description, link_image } = post;
	const { userData } = useContext(UserContext);

  function deletePost() {
    alert("deletar post");
  }

	function handlePost() {
		if (userData.id === user_id) {
			return (
				<Top>
					<h1>{username}</h1>
					<div>
						<FaPencilAlt />
						<FaTrash onClick={deletePost}/>
					</div>
				</Top>
			);
		} else {
			return <h1>{username}</h1>;
		}
	}

	return (
		<PostContainer>
			<Column>
				<img src={picture_user} alt="img" />
				<FaRegHeart />
				<p>{likes} likes</p>
			</Column>
			<Content>
				{handlePost()}
				<p>{description}</p>
				<LinkContainer href={link} target="_blank">
					<LinkInfo>
						<p>{link_title}</p>
						<p>{link_description}</p>
						<p>{link}</p>
					</LinkInfo>
					<img src={link_image} alt="Site icon" />
				</LinkContainer>
			</Content>
		</PostContainer>
	);
}

const PostContainer = styled.div`
	display: flex;
  gap: 20px;
	width: 611px;
	height: 276px;
	padding: 20px;
	background-color: #171717;
	border-radius: 16px;
	margin-bottom: 16px;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 70px;
	& > img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
    margin-bottom: 20px;
	}
	svg {
		font-size: 20px;
		color: white;
		margin-bottom: 8px;
	}
	p {
		color: white;
		font-size: 11px;
	}
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
	& > p {
		color: #b7b7b7;
		font-size: 17px;
		margin-bottom: 15px;
	}
	h1 {
		color: white;
		font-size: 20px;
	}
`;

const Top = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
  div {
    display: flex;
    gap: 15px;
  }
	svg {
		color: white;
		font-size: 15px;
	}
`;

const LinkContainer = styled.a`
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
`;

const LinkInfo = styled.div`
	height: 100%;
	padding: 22px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	p:nth-child(1) {
		font-size: 16px;
		line-height: 19px;
		color: #cecece;
	}
	p:nth-child(2) {
		font-size: 11px;
		line-height: 13px;
		color: #9b9595;
	}
	p:nth-child(3) {
		font-size: 11px;
		line-height: 13px;
		color: #cecece;
	}
`;
