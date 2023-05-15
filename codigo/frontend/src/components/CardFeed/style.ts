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
`;

export const CardIntro = styled.div`
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

    span{
      font-weight: bold;
    }
  }
  
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  h3{
    margin: 5px 0px 5px 0px;
    font-weight: bold;
  }

  p{
    text-align: justify;
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