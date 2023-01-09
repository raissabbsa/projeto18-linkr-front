import NavBar from "../../components/Navbar/NavBar";
import Sidebar from "./Sidebar";
import { BodyContent, TimelineContainer } from "../../assets/style/TimelineStyle.js";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserData";
import { BASE_URL } from "../../constants/urls";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { handlePosts } from './Posts';
import { PostsContainer, Loader } from "../../assets/style/PostsStyle.js"
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function UserPage() {
  const [update, setUpdate] = useState(0);
  const [items, setItems] = useState([]);
  const { id } = useParams();
  const { userData } = useContext(UserContext);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const config = { headers: { Authorization: `Bearer ${userData.token}` } };
    const req = axios.get(`${BASE_URL}/user/${id}`, config);
    req.then(res => {
      setFinished(true);
      setItems(res.data);
    //   console.log(items);
    });
    req.catch(error => {
      console.log(error);
    });
  }, [update, userData.token, id, items]);

  if (finished && items.length === 0) {
    return (
        <PostsContainer>
            <p>There are no posts yet</p>;
        </PostsContainer>
    );
  } else if(finished && items.length > 0) {
        return(
            <>
            <NavBar/>
            <BodyContent>
                <TimelineContainer>
                    <TitlePageContent>
                        <img src={items[0].picture_user} alt="img" /> 
                        <h1>{items[0].username}'s posts</h1>
                    </TitlePageContent>
                    <PostsContainer>
                        {handlePosts(items, update, setUpdate, finished)}
                    </PostsContainer>
                </TimelineContainer>
                <Sidebar />
            </BodyContent>  
            </>
        );
    } else {
        return (
            <Loader>
                <p>Loading </p>
                <ThreeDots type="Puff" color="#FFFFFF" height={20} width={40} timeout={2000} />
            </Loader>
        );
    }
}

const TitlePageContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 43px;
    h1 {
        font-size: 43px;
        font-weight: 700;
        font-family: 'Oswald';
        color: #FFFFFF;
    }
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 25px;
        margin-left: 23px;
    }
`