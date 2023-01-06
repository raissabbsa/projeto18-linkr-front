import styled from "styled-components";
import NavBar from "../../components/Navbar/NavBar";
import Sidebar from "./Sidebar";
import Posts from "./Posts";
import { BodyContent, TimelineContainer } from "../../assets/style/TimelineStyle.js";

export default function HashtagPage() {

    return(
    <>
      <NavBar/>
      <BodyContent>
        <TimelineContainer>
            <h1># </h1>
            <Posts />
        </TimelineContainer>
        <Sidebar />
      </BodyContent>  
    </>
    );
}