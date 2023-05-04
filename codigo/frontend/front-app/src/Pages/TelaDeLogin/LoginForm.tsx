import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
// import { makeStyles } from "@material-ui/core/styles";
// import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

function LoginForm() {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField label="Email" fullWidth margin="normal" className={classes.input} />
      <TextField label="Senha" fullWidth margin="normal" className={classes.input} />
      <Button variant="contained" color="primary" fullWidth>
        Sign In
      </Button>
    </form>
  );
}

export default LoginForm;

