import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";
import SinglePost from "./SinglePost";

export default function Posts({ update }) {
  const [posts, setPosts] = useState([]);
  const [finished, setFinished] = useState(false);
  const { userData } = useContext(UserContext);


  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${userData.token}` } };
    const promise = axios.get(`${BASE_URL}/posts`, config);
    promise.then((res) => {
      setFinished(true);
      setPosts(res.data);
    });
    promise.catch((err) => {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      console.log(err);
    });
  }, [update, userData.token]);


  function handlePosts() {
    if (finished && posts.length > 0) {
      return (
        <>
          {posts.map((post) => (
            <span key={post.id}>
              <SinglePost post={post}/>
            </span>
          ))}
        </>
      );
    } else if (finished && posts.length === 0) {
      return <p>There are no posts yet</p>;
    } else {
      return (
        <Loader>
          <p>Loading </p>
          <ThreeDots
            type="Puff"
            color="#FFFFFF"
            height={20}
            width={40}
            timeout={2000}
          />
        </Loader>
      );
    }
  }
  return <PostsContainer>{handlePosts()}</PostsContainer>;
}

const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > p {
    color: white;
    font-size: 30px;
    margin-top: 20px;
  }
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  & > p {
    color: white;
    font-size: 25px;
    margin-right: 10px;
  }
`;
