import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  border: 1px solid #E8E8E8;
  padding: 10px;
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
  }
  
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;

  h2{
    margin: 10px 0px 10px 0px;
  }
  
`;

export const ImgContainer = styled.div`
  width: 100%;
  height: 170px;
  overflow: hidden;
  background: blue;

  img{
    width: 100%;
  }
  
`;

export const PostTags = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
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
    margin: 0px 5px 0px 0px;
  }
`;

export const NotInterested = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p{
    margin: 0px 5px 0px 0px ;
  }

  
`;