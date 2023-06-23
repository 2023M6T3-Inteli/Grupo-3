import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import GlobalStyles from "../../styles/GlobalStyles";
import axios from 'axios';
import { setAuthorizationHeader } from '../../axios';
import { useContext } from 'react';
import AuthContext, { AuthProvider } from '../../context/AuthContext';
import UserContext from "../../context/UserContext";

const Father = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Password = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Create = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  //align-items: center; //comentei para tirar o instruction do meio da tela
  justify-content: center;
  margin-top: 4.5rem;
`;

const Input = styled(TextField)`
  margin-bottom: 15px;
  max-width: 366px;
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
  max-width: 350px;
  width: 100%;
  // border-radius: 50%;
`;

const Title = styled(Typography)`
  && {
    font-size: 40px;
    font-weight: lighter;
    margin-left: 12px;
    // achei melhor um espaçamento bem pequeno
  }
`;

const Subtitle = styled(Typography)`
  && {
    font-size: 19px;
    margin-bottom: 2rem;
    margin-left: 12px;
  }
`;

const Instruction = styled(Typography)`
  && {
    font-size: 12px;
    margin-bottom: 0.1px;
    color: gray;
    margin-left: 12px;
  }
`;

const ForgotPassword = styled(Typography)`
  && {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    color: #0672cb;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CreateAccount = styled(Typography)`
  && {
    margin-top: 12px;
    margin-bottom: 10px;
    font-size: 0.75rem;
    cursor: pointer;
    color: #0672cb;
    align-itens: center;
    justify-content: center;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const { setLoggedInUserId } = useContext(UserContext);

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5500/auth/signin', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      setEmail('');
      setPassword('');
      const { access_token } = response.data;
      setAuthorizationHeader(access_token);
      setAuthenticated(true);
      setLoggedInUserId((response.data).userId);
      navigate("/Account", { replace: true })
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Title>Welcome to LearnLink,</Title>
      <Subtitle>the app that encourages a culture of knowledge sharing in your company.</Subtitle>
      <Instruction>
        You must login with the SSO from your enterprise
      </Instruction>
      <Father>
        <Input label="E-mail" value={email} onChange={handleEmailChange} fullWidth margin="normal" />
        <Input label="Password" name="password" value={password} onChange={handlePasswordChange} fullWidth margin="normal" type="password" />
        <Password>
          <ForgotPassword> Don't remember your password? Reset password </ForgotPassword>
        </Password>
        <StyledButton type="submit" variant="contained" color="primary">
          {" "}
          Sign In{" "}
        </StyledButton>
        <Create>
          <CreateAccount>Don't have an account? Create account.</CreateAccount>
        </Create>
      </Father>
      <GlobalStyles></GlobalStyles>  
    </Form>
  );
}

export default LoginForm;
