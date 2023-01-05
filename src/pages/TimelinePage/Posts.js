import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { SinglePost } from "./SinglePost";
import { UserContext } from "../../providers/UserData";

export default function Posts({update}){
    const [posts, setPosts] = useState([]);
    const [finished, setFinished] = useState(false);
    const { userData } = useContext(UserContext);

    useEffect(() => {
        const config = { headers: { Authorization: `Bearer ${userData.token}` } };
        const promise = axios.get(`${BASE_URL}/posts`, config);
        promise.then(res => {
            setPosts(res.data);
            setFinished(true);
        });
        promise.catch(err => {
            alert("An error occured while trying to fetch the posts, please refresh the page");
            console.log(err);
        });

    },[update]);

    if(finished && posts.length>0){
        return(
            <PostsContainer>
                {posts.map((post) => <div key={post.id}>{SinglePost(post)}</div>)}
            </PostsContainer>
        )
    }
    else if(finished && posts.length === 0){
        return(
            <PostsContainer>
                <p>There are no posts yet</p>
            </PostsContainer>
        )
    }
    else if(!finished){
        return(
            <PostsContainer>
                <Loader>
                    <p>Loading </p>
                    <ThreeDots type="Puff" color="#FFFFFF" height={20} width={40} timeout={2000} />
                </Loader>
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
const Loader = styled.div`
    display: flex;
    align-items: center;
    &>p{
        color: white;
        font-size: 25px;
        margin-right: 10px;
    }
`