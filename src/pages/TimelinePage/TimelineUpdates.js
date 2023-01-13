import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInterval from 'use-interval';
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";

export default function TimelineUpdates({ update, setUpdate }) {
    const [checkingUpdates, setCheckingUpdates] = useState(false);
	const { userData } = useContext(UserContext);
    const countUpdates = useRef(0);
    const postsRef = useRef([{id: 0}]);
	const [posts, setPosts] = useState([]);
    const [showCounter, setShowCounter] = useState(countUpdates.current);

	useEffect(() => {
		const config = { headers: { Authorization: `Bearer ${userData.token}` } };
		const promise = axios.get(`${BASE_URL}/posts`, config);
		promise.then((res) => {
			setPosts(res.data);

            const isTheOwner = (res.data[0].username === userData.username);
            const isThereUpdates = (res.data[0].id > postsRef.current[0].id);

            if (isThereUpdates && isTheOwner) {
                postsRef.current = res.data;
                countUpdates.current = 0;
            } 
            else if (isThereUpdates && !isTheOwner) {
                let count = 0;
                res.data.forEach( (post) => {
                    postsRef.current.forEach( value => {
                        if(post.id > value.id)
                            count++;
                    });
                    if(count === postsRef.current.length && postsRef.current[0].id !== 0)
                        countUpdates.current++;
                });
                postsRef.current = res.data;
            }
        });
        
		promise.catch((err) => {
			alert("An error occured while trying to fetch the updates, please refresh the page");
			console.log(err);
		});

	}, [checkingUpdates, userData.token, update, posts]);

    useInterval(() => {
        setCheckingUpdates(!checkingUpdates);
        setShowCounter(countUpdates.current);
    }, 15000);

    function showUpdates(){
        setUpdate(update => update+1); 
        countUpdates.current = 0;
        setShowCounter(countUpdates.current);
    }

    return ( 
        <>
            <UpdatesBox display={ (showCounter > 0) ? 'flex' : 'none' } onClick={ showUpdates }>
                <p>{showCounter} new posts, load more!</p>
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
    cursor: pointer;
    p {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
    }
`;
