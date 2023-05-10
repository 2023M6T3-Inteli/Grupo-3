import styled from 'styled-components';

export const Container = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

export const Intro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`;

export const FormSearch = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #D9D9D9;
  width: 95%;
  height: 40px;
  padding: 0px 10px 0px 10px;
  
`;

export const Input = styled.input`
  width: 100%;
  height: 95%;
  border: none;

  :focus{
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }

  ::placeholder {
    color: #8F8F8F;
  }

  ::-webkit-search-cancel-button{
    -webkit-appearance: none;
  }
`;

export const Trends = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  
`;

export const Trending = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  h2{
    font-size: 16px;
  }
  
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 75px;
  
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: fit-content;
  
`;


