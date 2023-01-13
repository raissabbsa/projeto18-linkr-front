import axios from "axios";
import { useContext } from "react";
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";

export default function Repost({repost, setRepost, post, update, setUpdate}){
    const { userData } = useContext(UserContext);

    function sendRepost(){
        const config = { headers: { Authorization: `Bearer ${userData.token}` } };
        const promise = axios.post(`${BASE_URL}/repost`, {post_id:post.id}, config);
        promise.then(res => {
            setRepost(false);
            setUpdate(update+1);

        });
        promise.catch(err => {
            console.log(err);
            setRepost(false);
            alert("Unable to repost, please try again");
        })
    }
    return(
        <Container repost={repost}>
            <h1>Do you want to re-post this link?</h1>
            <Botoes>
                <button onClick={() => setRepost(false)}>No,cancel</button>
                <button onClick={sendRepost} >Yes, share!</button>
            </Botoes>
        </Container>)
}

const Container = styled.div`    
    display: ${(props) => (props.repost ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #333333;
    width: 597px;
    height: 210px;
    z-index: 5;
    border-radius: 20px;
    top: 50%;
    left: 20%;
    position: absolute;
    h1{
        font-weight: 700;
        font-size: 29px;
        color: #FFFFFF;
        margin-bottom: 22px;
    }
    

`
const Botoes = styled.div`
    
    button:nth-child(1){
        width: 134px;
        height: 37px;
        border-radius: 5px;
        border: none;
        color: #1977F2;
        background-color: #FFFFFF;
        margin-right: 27px;
        cursor: pointer;
    }
    button:nth-child(2){
        width: 134px;
        height: 37px;
        border-radius: 5px;
        border: none;
        background-color: #1977F2;
        color: #FFFFFF;
        cursor: pointer;
    }  
`