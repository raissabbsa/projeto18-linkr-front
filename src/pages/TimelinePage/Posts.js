import axios from "axios";
import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";

export default function Posts(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${BASE_URL}/posts`);
        promise.then(res => {
            console.log(res.data);
            setPosts(res.data);

        });
        promise.catch(err => {
            alert("An error occured while trying to fetch the posts, please refresh the page");
            console.log(err);
        });

    },[]);

    const navigate = useNavigate(); 

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

    if(posts.length>0){
        return(
            <PostsContainer>
                {posts.map((post) => <div key={post.id}>
                    <PostContainer>
                        <Column>
                            <img src={post.picture_user} alt="img" />
                            <FaHeart />
                            <p>{post.likes} likes</p>
                        </Column>
                        <Content>
                            <h1>{post.username}</h1>
                            < ReactTagify 
                                tagStyle = { tagStyle } 
                                mentionStyle = { mentionStyle } 
                                tagClicked = { (tag) => navigate(`/hashtag/${tag.substring(1)}`) } >
                                <p>{`${post.description}`}</p>
                            </ReactTagify > 
                        </Content>
                    </PostContainer>
                </div>)}
            </PostsContainer>
        );
    }
    else{
        return(
            <PostsContainer>
                <p>There are no posts yet</p>
            </PostsContainer>
        )
    }
}

const PostsContainer = styled.div`
    display: flex;
    flex-direction: column;
    &>p{
        color: white;
        font-size: 30px;
        margin-top: 20px;
    }
`
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