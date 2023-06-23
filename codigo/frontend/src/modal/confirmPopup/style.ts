import styled from 'styled-components';

export const ModalWrapper = styled.div`
  overflow-y: scroll;
  height: fit-content;

  &::-webkit-scrollbar {
    width: 0.7rem;
  }

  &::-webkit-scrollbar-track {
    background: var(--dark-gray);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--light-gray);
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--light-gray);
  }

`;

export const Header = styled.div`
  
`;

export const Content = styled.div`
  
`;

export const Interaction = styled.div`
  
`;

export const Comments = styled.div`
  
`;
