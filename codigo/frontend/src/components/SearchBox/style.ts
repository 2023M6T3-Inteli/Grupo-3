import styled from 'styled-components';

export const FormSearch = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #D9D9D9;
  width: 100%;
  height: 40px;
  padding: 0px 10px 0px 10px;
  margin: 0 0 10px 0;
  
`;

export const Input = styled.input`
  width: 100%;
  height: 95%;
  border: none;

  :focus{
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }

  ::placeholder {
    color: #8F8F8F;
  }

  ::-webkit-search-cancel-button{
    -webkit-appearance: none;
  }
`;