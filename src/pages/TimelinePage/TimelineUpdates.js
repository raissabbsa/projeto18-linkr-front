import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInterval from 'use-interval';
import { PostsContainer } from "../../assets/style/PostsStyle";
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";
import { handlePosts } from "./Posts";

export default function TimelineUpdates({ update, setUpdate/* , posts */ }) {
    const [checkingUpdates, setCheckingUpdates] = useState(false);
	const { userData } = useContext(UserContext);
    const [count, setCount] = useState(0); //o contador com a quantidade tem que ser fora do useEffect e atualizado para "0" dentro do onClick.
    const updatesQuantity = useRef(0);

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userData.token}` } };
		const promise = axios.get(`${BASE_URL}/posts`, config);
		promise.then((res) => {
            updatesQuantity.current = res.data.length - updatesQuantity.current;
            console.log(updatesQuantity.current);
		});
		promise.catch((err) => {
			alert("An error occured while trying to fetch the updates, please refresh the page");
			console.log(err);
		});
	}, [checkingUpdates, userData.token, update]);

    useInterval(() => {
        setCheckingUpdates(!checkingUpdates);
        console.log(checkingUpdates);
    }, 8000);

    function showUpdates(){
        //setCount(0);
        setUpdate(update => update+1); console.log(count);
    }

    return ( 
        <>
            <UpdatesBox display={ (updatesQuantity.current > 0) ? 'flex' : 'none'} onClick={ showUpdates }>
                <p>{count} new posts, load more!</p>
            </UpdatesBox>
        </>
    );
}

const UpdatesBox = styled.div`
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    width: 611px;
    height: 61px;
    display: ${(prop) => prop.display};
    justify-content: center;
    align-items: center;
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
    }
`;
