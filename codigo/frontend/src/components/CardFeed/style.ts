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
    font-weight: 200;
    font-size: 12px;

    span{
      font-weight: 300;
      font-size: 16px;
    }
  }
  
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 14px 0px 14px;

  h3{
    margin: 15px 0px 10px 0px;
    font-weight: 200;
    color: #0E0E0E; 
  }

  p{
    text-align: justify;
    font-weight: 200;
    color: #666666;
    
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
  padding: 10px 0px 24px 0px;
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