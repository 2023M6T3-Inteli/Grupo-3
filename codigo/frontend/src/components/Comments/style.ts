import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  
`;

export const UserComment = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.5px solid #939393;
  padding: 5px 0px 5px 0px;

  p{

    span{
      margin-left: 50px;
    }
    
  }

  div{
    display: flex;
    flex-direction: row;

    div{
      display: flex;
      flex-direction: column;
    }
  }
  
`;