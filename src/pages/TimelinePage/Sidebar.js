import axios from "axios";
import { useState } from "react"
import styled from "styled-components"
import { BASE_URL } from "../../constants/urls";
import { UserContext } from "../../providers/UserData";

export default function Sidebar(){
    return(
        <TrendingContainer>
            <h1>trending</h1>   
            <div></div> 
            <h2># brasilcopa2026</h2>
            <h2># brasilcopa2026</h2>
            <h2># brasilcopa2026</h2>
            <h2># brasilcopa2026</h2>
            <h2># brasilcopa2026</h2>
            <h2># brasilcopa2026</h2>
            <h2># brasilcopa2026brasilcopa2026brasilcopa2026copa2026</h2>
            {/* aqui vai ser feito um map com o array de hashtags que vai vir lá do back */}
        </TrendingContainer>
    )
}

const TrendingContainer = styled.div`
    background-color: #171717;
    display: flex;
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