import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { ReactTagify } from "react-tagify";

function GoToHashtagPage(tag){
  //const navigate = useNavigate(); 
  const tagParams = tag.substring(1);
  console.log(tagParams);
  return tagParams; //navigate(`/hashtag/${tagParams}`);
}
/* 
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem. 
*/
/* 
React Hook "useGoToHashtagPage" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function  react-hooks/rules-of-hooks 
*/
//serve de nada isso. do componente fora. dá no mesmo.


export function SinglePost(post) {
  //const navigate = useNavigate(); 
  //Warning: React has detected a change in the order of Hooks called by Posts.
  //Não vai aceitar o useNavigate em nenhum lugar aqui por causa disso... não sei o que fazernflifs.
  //Uncaught Error: Rendered more hooks than during the previous render.

  const { picture_user, username, description, likes } = post;
  const  tagStyle  =  { 
    color: 'white' , 
    fontWeight: 700 , 
    cursor: 'pointer',
    fontSize: 20
  };
  const  mentionStyle  =  { 
    color: 'gray' , 
    fontWeight: 400 , 
    fontSize: 20,
    cursor: 'pointer',
  }

  return (
    <PostContainer>
      <Column>
        <img src={picture_user} alt="img" />
        <FaHeart />
        <p>{likes} likes</p>
      </Column>
      <Content>
        <h1>{username}</h1>
        < ReactTagify 
            tagStyle = { tagStyle } 
            mentionStyle = { mentionStyle } 
            tagClicked = /* { (tag) => navigate(`/hashtag/${tag.substring(1)}`) }  */
                        { (tag) => GoToHashtagPage(tag) } >
            <p>{`${description}`}</p>
        </ReactTagify > 
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
  p {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: #B7B7B7;
  }
`;
