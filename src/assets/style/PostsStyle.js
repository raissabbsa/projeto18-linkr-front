import styled from 'styled-components';

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  & > p {
    color: white;
    font-size: 30px;
    margin-top: 20px;
  }
`;

export const Loader = styled.div`
  display: flex;
  align-items: center;
  & > p {
    color: white;
    font-size: 25px;
    margin-right: 10px;
  }
`;
