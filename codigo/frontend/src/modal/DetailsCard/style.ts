import styled from 'styled-components';

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  height: fit-content;

  &::-webkit-scrollbar {
    width: 0.7rem;
  }

  &::-webkit-scrollbar-track {
    /* background: #6e767d; */
  }

  &::-webkit-scrollbar-thumb {
    /* background: #6e767d; */
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    /* background: red; */
  }

`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  p{
    font-size: 20px;
  }
  
`;

export const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;

  p{
    margin-right: 2px;
  }

  span{
    font-weight: bold
  }
`;

export const Interaction = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 0.5px solid #939393;
  border-bottom: 0.5px solid #939393;
  justify-content: space-between;
  padding: 3px 0px 3px 0px;
`;

export const PostComments = styled.div`
  
`;
