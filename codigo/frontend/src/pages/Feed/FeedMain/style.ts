import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px){
    width: 80%;
    border-right: 1px solid black;
    border-left: 1px solid black;
  }

  @media (min-width: 1280px){
    width: 60%;
    border-right: 1px solid black;
    border-left: 1px solid black;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;

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
  justify-content: space-between;
  margin: 0 0 10px 0;
  padding: 5px;

  p{
    color: #0561FC;
  }

  div{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  h2{
    font-size: 16px;
  }
  
`;

export const ForYou = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  border: 1px solid #D9D9D9;
  margin: 0 0 15px 0;

  div{ 
    margin: 0 0 2px 0;
    width: 50%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  p{
    font-weight: bold;
    color: black;

    span{
      font-weight: normal;
    }
  }

  h4{
    color: #0063b8;
    font-weight: bold;
  }

  span{
    font-size: 14px;
  }
  
`;

export const Feed = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: fit-content;
  
`;


