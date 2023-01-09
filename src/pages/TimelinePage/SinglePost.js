import styled from "styled-components";
import Swal from 'sweetalert2'
import { FaPencilAlt, FaRegHeart, FaHeart, FaTrash } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ReactTagify } from "react-tagify";
import { UserContext } from "../../providers/UserData";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import api from "../../services/api";

export default function SinglePost({ post, update, setUpdate }) {
  const { userData } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [newDescription, setDescription] = useState(post.description);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("keydown", detectKeydown, true);
  }, []);

  function detectKeydown(e) {
    if (e.key === "Escape") {
      setEdit(false);
    }
  }

  function deletePost() {
    Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				)
				const config = api.createConfig(userData.token)
				console.log("🚀 ~ file: SinglePost.js:46 ~ deletePost ~ config", config)
				const promise = axios.delete(`${BASE_URL}/posts/${post.id}`, config);
				promise.then(() => {
					setUpdate(update + 1)
				})
				promise.catch((err) => {
					console.log(err)
					alert("Unable to delete post")
				})
			}
		})
  }

  function editPost() {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }

  function sendEdition(e) {
    e.preventDefault();
    setLoading(true);

    const config = { headers: { Authorization: `Bearer ${userData.token}` } };
    const form = {
      description: newDescription,
      id: post.id,
    };

    const promise = axios.put(`${BASE_URL}/posts`, form, config);
    promise.then((res) => {
      setEdit(false);
      setUpdate(update + 1);
    });
    promise.catch((err) => {
      console.log(err);
      setLoading(false);
      alert("Unable to save changes");
    });
  }

  function handlePost() {
    if (userData.id === post.user_id) {
      return (
        <Top>
          <h1>{post.username}</h1>
          <div>
            <FaPencilAlt onClick={editPost} />
            <FaTrash onClick={deletePost} />
          </div>
        </Top>
      );
    } else return <h1>{post.username}</h1>;
  }

  function handleDescription(post) {
    if (edit) {
      return (
        <Form onSubmit={sendEdition}>
          <input
            name="description"
            value={newDescription}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading ? "disabled" : ""}
            autoFocus
          />
        </Form>
      );
    } else {
      return (
        <ReactTagify
          tagStyle={tagStyle}
          mentionStyle={mentionStyle}
          tagClicked={(tag) => navigate(`/hashtag/${tag.substring(1)}`)}
        >
          {post.description !== null && <p>{post.description}</p>}
        </ReactTagify>
      );
    }
  }

  function sendLike(){
    const config = { headers: { Authorization: `Bearer ${userData.token}` } };
    const form = {
      postId: post.id,
    };

    if(like){
      setLike(false);
    }else{
      setLike(true);
    }

    const promise = axios.post(`${BASE_URL}/like`, form, config);
    promise.then((res) => {
      
    });
    promise.catch((err) => {
      console.log(err);
    });
  }

  return (
    <PostContainer>
      <Column>
        <img src={post.picture_user} alt="img" />
        <div onClick={() => sendLike()}>{like === true ? <FaHeart color="#AC0000" /> : <FaRegHeart />}</div>
        <p>{post.likes} likes</p>
      </Column>
      <Content>
        {handlePost(post.username, post.user_id)}
        {handleDescription(post)}

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
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: #b7b7b7;
  }
  h1 {
    color: white;
    font-size: 22px;
  }
`;

const tagStyle = {
  color: "white",
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 20,
};

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

const mentionStyle = {
  color: "gray",
  fontWeight: 400,
  fontSize: 20,
  cursor: "pointer",
};

const Form = styled.form`
  & > input {
    width: 503px;
    flex-wrap: wrap;
    border-radius: 7px;
    border: none;
    background-color: #ffffff;
    padding: 2px;
    font-size: 20px;
    color: #4c4c4c;
  }
`;
