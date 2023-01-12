import styled from "styled-components";

export default function LoadComments({ comment, post }) {
  function loadname() {
    if (comment.username_comment === post.username) {
      return "• post's author";
    }
  }
  return (
    <CommentContainer>
      <CommentBox>
        <img src={comment.picture_user_comment} alt="img" />
        <CommentText>
          <h1>
            <span>{comment.username_comment}</span>
            {loadname()}
          </h1>
          <p>{comment.comment}</p>
        </CommentText>
      </CommentBox>
      <Linha></Linha>
    </CommentContainer>
  );
}
const CommentContainer = styled.div`
  height: 60px;
`;
const Linha = styled.div`
  height: 1px;
  width: 571px;
  background-color: #353535;
  margin-left: 20px;
`;

const CommentBox = styled.div`
  display: flex;
  height: 60px;
  width: 571px;
  margin-top: 25px;
  margin-left: 20px;
  img {
    width: 39px;
    height: 39px;
    margin-right: 18px;
    border-radius: 50%;
  }
`;

const CommentText = styled.div`
  font-size: 14px;

  h1 {
    margin-bottom: 3px;
    font-weight: 400;
    color: #565656;
  }
  span {
    font-weight: 700;
    color: #f3f3f3;
    margin-right: 4px;
  }

  p {
    color: #acacac;
  }
`;
