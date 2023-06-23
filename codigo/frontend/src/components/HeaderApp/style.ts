import styled from 'styled-components';

export const Intro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 10px 0;
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
  border: 1px solid #0672CB;
  
  svg{
    margin-right: 5px;
  }

  @media (min-width: 1280px){
    display: none;
  }
  
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 60px;
  height: fit-content;
  background-color: white;
  right: 5px;
  top: 40px;
  z-index: 2;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  span{
    height: 25%;
    width: 100%;
    z-index: 3;

    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0px 3px 0px 3px;

  }

  div{
    height: 25%;
    width: 100%;
    z-index: 3;
    

    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0px 3px 0px 3px;

    :hover{
      background-color: #E8E8E8;
    }

    & :last-child{
    background: none;

    

    button{
      width: 100%;
      height: 100%;
    }
  }
  }

  & :last-child{
    border-bottom: none;
  }
`;

