import styled from "styled-components";
import NavBar from "../../components/Navbar/NavBar";
import Publishing from "./Publishing";
import Sidebar from "./Sidebar";
import Posts from "./Posts";
import { useState } from "react";

export default function TimelinePage() {
  const [update, setUpdate] = useState(0);
  return (
    <>
      <NavBar/>
      <BodyContent>
        <TimelineContainer>
            <h1>timeline</h1>
            <Publishing setUpdate = {setUpdate} update = {update}/>
            <Posts update = {update}/>
        </TimelineContainer>
        <Sidebar />
      </BodyContent>  
    </>
  );
}

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 150px;
  & > h1 {
    font-size: 43px;
    font-weight: 700;
    font-family: 'Oswald';
    color: #FFFFFF;
    margin-bottom: 43px;
  }
  `
const BodyContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
`
