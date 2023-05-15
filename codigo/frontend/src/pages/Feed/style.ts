import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  @media (min-width: 1280px){
    max-width: 1280px;
  }
`;