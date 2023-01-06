import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaPencilAlt, FaRegHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";

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
    },[update, userData.token]);

    function deletePost() {
        alert("deletar post");
    }
    function handlePost(username, user_id) {
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
		} else
			return <h1>{username}</h1>;
	}

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

    function handlePosts() {
        if (finished && posts.length > 0) {
          return (
            <>
              {posts.map((post) => <span key={post.id}>
                    <PostContainer>
                        <Column>
                            <img src={post.picture_user} alt="img" />
                            <FaRegHeart />
                            <p>{post.likes} likes</p>
                        </Column>
                        <Content>
                            {handlePost(post.username, post.user_id)}
                            < ReactTagify 
                                tagStyle = { tagStyle } 
                                mentionStyle = { mentionStyle } 
                                tagClicked = { (tag) => navigate(`/hashtag/${tag.substring(1)}`) } >
                                <p>{`${post.description}`}</p>
                            </ReactTagify >
                            <LinkContainer href={post.link} target="_blank">
                                <LinkInfo>
                                    <p>{post.link_title}</p>
                                    <p>{post.link_description}</p>
                                    <p>{post.link}</p>
                                </LinkInfo>
                                <img src={post.link_image} alt="Site icon" />
                            </LinkContainer> 
                        </Content>
                    </PostContainer>
                </span>)}
            </>
          );
        } else if (finished && posts.length === 0) {
          return (<p>There are no posts yet</p>);
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
    &>p{
        color: white;
        font-size: 30px;
        margin-top: 20px;
    }
`
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
    font-size: 12px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 20px;
        color: #B7B7B7;
    }
    h1 {
        color: white;
        font-size: 22px;
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
