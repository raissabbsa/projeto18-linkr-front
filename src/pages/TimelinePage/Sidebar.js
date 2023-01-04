import axios from "axios";
import { useState } from "react"
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";

function Hashtags(prop) {
    return (
        <h2># {prop.hashtag}</h2>
    );
}

export default function Sidebar(){
    const [hashtags, setHashtags] = useState(["aqui", "sao", "todas", "as", "hashtags", "do", "banco"]); //null

/*     const promise = axios.get(`${BASE_URL}/trending`);
    promise.then(res => {
        setHashtags(res.data);
    }).catch(err => {
        console.log(err.res.data);
    }) 
*/
    if(hashtags === null) {
        return(
            <TrendingContainer display={`none`}></TrendingContainer>
        )
	}

    return(
        <TrendingContainer display={`flex`}>
            <h1>trending</h1>   
            <div></div>
            {hashtags.map((value) => ( 
                <Hashtags hashtag={value} /> 
            ))}
        </TrendingContainer>
    )
}

const TrendingContainer = styled.div`
    background-color: #171717;
    display: ${props => props.display};
    flex-direction: column;
    align-items: flex-start;
    min-width: 301px;
    margin-left: 25px;
    margin-top: 232px;
    border-radius: 16px;
    padding-top: 9px;
    padding-bottom: 30px;
    h1{
        font-family: 'Oswald';
        font-size: 27px;
        font-weight: 700;
        color: #FFFFFF;
        padding-left: 16px;
        padding-right: 16px;
        line-height: 40px;
    }
    div{
        min-width: 100%;
        border-bottom: 1px solid #484848;
        margin-bottom: 22px;
        margin-top: 12px;
    }
    h2{
        font-size: 19px;
        font-weight: 700;
        color: #FFFFFF;
        padding-left: 16px;
        padding-right: 16px;
        padding-bottom: 10px;
        line-height: 40px;
        font-family: 'Lato';
        line-height: 23px;
        letter-spacing: 0.05em;
    }
`