import styled from "styled-components";
import Publishing from "./Publishing";

export default function TimelinePage() {
	return (
    <TimelineContainer>
      <>
        <h1>timeline</h1>
        <Publishing />

      </>
    </TimelineContainer>
  );
}
const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  &>h1{
    font-size: 43px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 43px;
  }
`
