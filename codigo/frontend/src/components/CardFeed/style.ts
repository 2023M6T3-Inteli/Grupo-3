import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  font-family: 'Roboto', sans-serif;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid #E8E8E8;
  padding: 10px;
  margin-bottom: 20px;
  z-index: 0;
`;

export const CardIntro = styled.div`
position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
`;

export const OwnerPost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CardProfile = styled.div`
  p{
    margin: 0;
    width: fit-content;

    span{
      font-weight: bold;
    }
  }
  
`;

export const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  h2{
    margin: 10px 0px 5px 0px;
    font-weight: bold;
    text-align: start;
  }

  p{
    text-align: justify;
  }
`;

export const ShowButton = styled.div`
  z-index: 2;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: white;
  right: 3px;
  top: 15px;
  border: 0.5px solid grey;
  z-index: 3;
  border-radius: 2px;

  div{
    height: 25%;
    width: 80%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0px 3px 0px 3px;

    & :last-child{
    background: none;
  }
  }

  & :last-child{
    border-bottom: none;
  }
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 170px;
  overflow: hidden;
  background: none;

  img{
    width: 100%;
  }
  
`;

export const PostTags = styled.div`
  margin: 5px 0 15px 0;
  display: flex;
  flex-direction: row;
  height: 17px;

  span{
    margin-right: 10px;
  }
  
`;

export const CardFootbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`;

export const PostInteraction = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p{
    margin: 0px 15px 5px 5px;
  }
`;

export const NotInterested = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p{
    margin: 0px 5px 5px 0px;
  }
`;