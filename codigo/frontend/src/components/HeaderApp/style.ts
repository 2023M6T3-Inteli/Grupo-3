import styled from 'styled-components';

export const Intro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0 30px 0;
`;

export const RightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LeftSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  img{
    margin-left: 15px;
  }
`;

export const RankingButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 3px 7px 3px 3px;
  color: white;
  background: #0672CB;
  border: 6px solid #0672CB;
  height:40px;
  width: 100px;

  
  svg{
    margin-right: 5px;
  }

  @media (min-width: 1280px){
    display: none;
  }
  
`;

