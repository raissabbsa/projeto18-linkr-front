import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../providers/UserData";
import { FaPaperPlane } from "react-icons/fa";
import CommentPage from "./CommentPage";
import axios from "axios";
import { BASE_URL } from "../../constants/urls";


export default function Comments({post, update, setUpdate}){
    const { userData } = useContext(UserContext);
    const [newComment, setComment] = useState("");

    function handleComments(){
        if(post.comments.length>0){
            return(<>{post.comments.map((comment) => <CommentPage key={comment.id} comment={comment}/>)}</>);
        }
        else{
            return "";
        }
    }
    function sendComment(e){
        e.preventDefault();

        const config = { headers: { Authorization: `Bearer ${userData.token}` } };
        const form = {
            post_id: post.id,
            comment: newComment
        }
        console.log(form)
        const promise = axios.post(`${BASE_URL}/comments`, form, config);
        promise.then((res) => {
            console.log("ah")
            setUpdate(update+1);
        })
        promise.catch((err) => {
            console.log(err);
        })

    }
    
    return(
    <CommentsContainer>
        {handleComments()}
        <Bottom>
            <img src={userData.picture_url} alt="img"/>
            <form onSubmit={sendComment}>
                <input 
                    placeholder="write a comment..."
                    name="newComment"
                    value={newComment}
                    type="text"
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
            </form>
            <FaPaperPlane onClick={sendComment}/>

        </Bottom>
        

    </CommentsContainer>)
}

const CommentsContainer = styled.div`

`
const Bottom = styled.div`
    display: flex;
    img{
        width: 39px;
        height: 39px;
        border-radius: 50%;
        margin-left: 25px;
    }
    input{
        width: 510px;
        height: 39px;
        border-radius: 8px;
        margin-left: 14px;
        position: absolute;
        padding: 5px;
        background-color: #252525;
        border: none;
        color: white;
    }
    svg{
        position: relative;
        top: 12px;
        left: 500px;
        z-index: 2;
        font-size: 15px;
        color: white;
    }
`
