import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

export function SinglePost(post) {
  const { picture_user, username, description, likes } = post;
  
  return (
    <PostContainer>
      <Column>
        <img src={picture_user} alt="img" />
        <FaHeart />
        <p>{likes} likes</p>
      </Column>
      <Content>
        <h1>{username}</h1>
        <p>{description}</p>
      </Content>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 611px;
  height: 276px;
  padding: 25px;
  background-color: #171717;
  border-radius: 10px;
  margin-bottom: 16px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px;
  & > img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    border-radius: 1000px;
    margin-bottom: 20px;
    margin-left: 15px;
  }
  svg {
    font-size: 20px;
    color: white;
    margin-bottom: 8px;
  }
  p {
    color: white;
    font-size: 12px;
  }
`;
const Content = styled.div`
  margin-left: 20px;
  & > h1 {
    color: white;
    font-size: 23px;
    margin-bottom: 5px;
  }

  & > p {
    color: #a3a3a3;
    font-size: 20px;
    margin-bottom: 15px;
  }
`;
