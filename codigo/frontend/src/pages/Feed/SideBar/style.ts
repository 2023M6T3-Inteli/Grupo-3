import styled from "styled-components";

export const Container = styled.div`
  display: none;
  width: 20%;
  
  @media (min-width: 1280px){
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: sticky;
    top: 0;
    left: 0;

    padding: 9px 19px 20px;

    max-height: 100vh;
    max-width: 100vh;
    overflow-y: auto;
  }
`;

export const TopSide = styled.div`

`;

export const BotSide = styled.div`
  a{
    color: #0561FC;

    p:hover{
      border-bottom: 1px solid #0561FC;
      cursor: pointer;

    }

    &:hover{
      border-bottom: 1px solid #0561FC;
    }
  }

`;