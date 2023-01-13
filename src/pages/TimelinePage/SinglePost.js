import Swal from "sweetalert2";
import { FaPencilAlt, FaRegHeart, FaHeart, FaTrash, FaComments, FaRetweet
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { ReactTagify } from "react-tagify";
import { UserContext } from "../../providers/UserData";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import api from "../../services/api";
import { Column, PostContainer, Content, tagStyle, Top, LinkContainer, LinkInfo, mentionStyle, Form, Post,
} from "../../assets/style/SinglePostStyle";
import Comments from "./Comments";
import Repost from "./Repost";

export default function SinglePost({ post, update, setUpdate }) {
  const { userData } = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [newDescription, setDescription] = useState(post.description);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [repost, setRepost] = useState(false);
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const config = api.createConfig(userData.token);
        const promise = axios.delete(`${BASE_URL}/posts/${post.id}`, config);

        promise.then(() => {
          setUpdate(update + 1);
        });
        promise.catch((err) => {
          console.log(err);
          alert("Unable to delete post");
        });
      }
    });
  }

  function verifyHashtag(text) {
    let array = text.split(" ");
    let hashtags = [];
    array.map((item) => {
      if (item[0] === "#") {
        hashtags.push(item.substr(1));
      }
      return "";
    });
    return hashtags;
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
    let newHashtags = verifyHashtag(newDescription);
    let oldHashtags = verifyHashtag(post.description);
    if (newHashtags.length > 0 || oldHashtags.length > 0) {
      const form = {
        post_id: post.id,
        antigas: oldHashtags,
        novas: newHashtags,
      };
      const promise = axios.put(`${BASE_URL}/hashtag`, form, config);
      promise.then((res) => {
        const newForm = {
          description: newDescription,
          id: post.id,
        };
        const newPromise = axios.put(`${BASE_URL}/posts`, newForm, config);
        newPromise.then((res) => {
          setEdit(false);
          setUpdate(update + 1);
          setLoading(false);
        });
        newPromise.catch((err) => {
          console.log(err);
          setLoading(false);
          alert("Unable to save changes");
        });
      });
      promise.catch((err) => {
        console.log(err);
        setLoading(false);
        alert("Unable to save changes");
      });
    }
  }

  function handlePost() {
    if (userData.id === post.user_id) {
      return (
        <Top>
          <h1 onClick={() => navigate(`/user/${post.user_id}`)}>
            {post.username}
          </h1>
          <div>
            <FaPencilAlt onClick={editPost} />
            <FaTrash onClick={deletePost} />
          </div>
        </Top>
      );
    } else
      return (
        <h1 onClick={() => navigate(`/user/${post.user_id}`)}>
          {post.username}
        </h1>
      );
  }

  function handleDescription() {
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

  function sendLike() {
    const config = { headers: { Authorization: `Bearer ${userData.token}` } };
    const form = {
      postId: post.id,
    };

    if (like) {
      const promise = axios.delete(`${BASE_URL}/dislike/${post.id}`, config);
      promise.then((res) => {
        setLike(false);
      });
      promise.catch((err) => {
        console.log(err);
      });
    }else{
      const promise = axios.post(`${BASE_URL}/like`, form, config);
      promise.then((res) => {
        setLike(true);
      });
      promise.catch((err) => {
        console.log(err);
      });
    }
  }
  function decideComments() {
    if (openComments) {
      setOpenComments(false);
    } else {
      setOpenComments(true);
    }
  }
  function showComments() {
    if (openComments) {
      return <Comments post={post} update={update} setUpdate={setUpdate} />;
    }
  }

  return (
    <Post openComments={openComments} >
	<Repost repost={repost} setRepost={setRepost} post={post} update={update} setUpdate={setUpdate}/>
      <PostContainer>
        <Column>
          <img
            src={post.picture_user}
            alt="img"
            onClick={() => navigate(`/user/${post.user_id}`)}
          />
          <div onClick={sendLike}>
            {like === true ? <FaHeart color="#AC0000" /> : <FaRegHeart />}
          </div>
          <p>{post.likes} likes</p>
          <FaComments onClick={decideComments} />
          <p>{post.comments.length} comments</p>
		  <FaRetweet onClick={() => setRepost(true)}/>
		  <p>{post.reposts} re-posts</p>
        </Column>
        <Content>
          {handlePost()}
          {handleDescription()}

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
      {showComments()}
    </Post>
  );
}

