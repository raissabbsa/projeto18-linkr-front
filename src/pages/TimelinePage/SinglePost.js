import styled from "styled-components";
import { FaHeart, FaPencilAlt, FaTrash } from "react-icons/fa";
import { UserContext } from "../../providers/UserData";
import React, { useContext, useState } from "react";

export function SinglePost(post) {
  const { picture_user, username, description, likes, user_id } = post;
  const { userData } = useContext(UserContext);

  if (userData.id === user_id) {
    return (
      <PostContainer>
        <Column>
          <img src={picture_user} alt="img" />
          <FaHeart />
          <p>{likes} likes</p>
        </Column>
        <Content>
          <Top>
            <h1>{username}</h1>
            <div>
              <FaPencilAlt/>
              <FaTrash />
            </div>
          </Top>
          <p>{description}</p>
        </Content>
      </PostContainer>
    );
  } else {
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
}

const PostContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 611px;
  height: 276px;
  padding: 28px;
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
    font-size: 11px;
  }
`;
const Content = styled.div`
  margin-left: 20px;
  & > p {
    color: #b7b7b7;
    font-size: 17px;
    margin-bottom: 15px;
  }
  & > h1 {
    color: white;
    font-size: 19px;
    margin-bottom: 7px;
  }
`;

const Top = styled.div`
  display: flex;
  width: 470px;
  justify-content: space-between;
  & > h1 {
    color: white;
    font-size: 19px;
    margin-bottom: 7px;
  }

  svg {
    margin-left: 5px;
    color: white;
    font-size: 14px;
  }
`;
