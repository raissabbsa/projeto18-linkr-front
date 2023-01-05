import axios from "axios";
import { useEffect, useState } from "react"
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { SinglePost } from "./SinglePost";

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
    if(posts.length>0){
        return(
            <PostsContainer>
                {posts.map((post) => <div key={post.id}>{SinglePost(post)}</div>)}
            </PostsContainer>
        )
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