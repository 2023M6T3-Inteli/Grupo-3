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
    marginTop: theme.spacing(2), //remove
    maginLeft: theme.spacing(2), //remove
    marginRight: theme.spacing(2), //remove
    //here it goes //but remove all there above
  },
}));

function LoginForm() {
  const classes = useStyles();

  return (
    <form className={classes.form}>
      <TextField label="E-mail" fullWidth margin="normal" className={classes.input} />
      <TextField label="Password" fullWidth margin="normal" className={classes.input} />
      <Button variant="contained" color="primary" fullWidth> Sign In </Button>
    </form>
  );
}

export default LoginForm;

