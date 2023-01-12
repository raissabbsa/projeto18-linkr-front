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
    const postsSize = useRef(0);
    //Se o userLogado for igual ao dono do post, essa renderização não deve valer.
    //Deve dar um return ou algo assim, não sei ainda.

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userData.token}` } };
		const promise = axios.get(`${BASE_URL}/posts`, config);
		promise.then((res) => {
            console.log('renderizou');
            if(res.data.length > postsSize.current){
                console.log(updatesQuantity.current);
                updatesQuantity.current += res.data.length - postsSize.current;
                console.log(updatesQuantity.current);
                console.log(postsSize.current);
                postsSize.current = res.data.length; //nunca é zerado, permanece com o tamanho do array anterior para a comparação
                console.log(postsSize.current);
            }
		});
		promise.catch((err) => {
			alert("An error occured while trying to fetch the updates, please refresh the page");
			console.log(err);
		});
	}, [checkingUpdates, userData.token, update]);

    useInterval(() => {
        setCheckingUpdates(!checkingUpdates);
    }, 8000);

    function showUpdates(){
        //setCount(count => count-count);
        setUpdate(update => update+1); 
        //console.log(count);
        updatesQuantity.current = 0;
    }

    return ( 
        <>
            <UpdatesBox display={ (updatesQuantity.current > 0) ? 'flex' : 'none'} onClick={ showUpdates }>
                <p>{updatesQuantity.current} new posts, load more!</p>
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
    margin-top: 10px;
    margin-bottom: 17px;
    p{
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
    }
`;
