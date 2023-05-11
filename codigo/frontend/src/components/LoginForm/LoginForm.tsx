import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  //align-items: center; //comentei para tirar o instruction do meio da tela
  justify-content: center;
  margin-top: 4.5rem;
`;

const Input = styled(TextField)`
  margin-bottom: 15px;
  max-width: 400px;
  width: 100%;

  && {
    label.Mui-focused {
      color: #556cd6;
    }
    .MuiInput-underline:after {
      border-bottom-color: #556cd6;
    }
  }
`;

const StyledButton = styled(Button)`
  max-width: 400px;
  width: 100%;
  // border-radius: 50%;
`;

const Title = styled(Typography)`
  && {
    font-size: 40px;
    font-weight: lighter;
    margin-bottom: 0.5px; 
    // achei melhor um espaçamento bem pequeno
  }
`;

const Subtitle = styled(Typography)`
  && {
    font-size: 19px;
    margin-bottom: 2rem;
  }
`;

const Instruction = styled(Typography)`
&& {
  font-size: 12px;
  margin-bottom: 0.1px;
  color: gray;
}
`;

const ForgotPassword = styled(Typography)`
  && {
    margin-top: 10px;
    margin-bottom: 11px;
    font-size: 1rem;
    cursor: pointer;
    color: #0672CB;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginForm() {
  return (
    <Form>
          <Title>Welcome to LearnLink,</Title>
          <Subtitle>the app that encourages a culture of knowledge sharing in your company.</Subtitle>
          <Instruction>You must login with the SSO from your enterprise</Instruction>
          <Input label="E-mail" fullWidth margin="normal" />
          <Input label="Password" fullWidth margin="normal" type="password" />
          <ForgotPassword>Don't remember your password? Reset password</ForgotPassword>
          <StyledButton variant="contained" color="primary"> Sign In </StyledButton>
    </Form>
  );
}

export default LoginForm;