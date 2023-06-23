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
    background: #6e767d;
  }

  &::-webkit-scrollbar-thumb {
    background: #6e767d;
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #6e767d;
  }

`;