import React from 'react';
import './Signup.css';
import { ColorModeContext } from '../context/theme';
import axios from 'axios';
import { useRequest } from 'hooks/useRequest';
// material ui components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

const Signup: React.FC = () => {
  const colorMode = React.useContext(ColorModeContext);

  const [state, setState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { errors, errorsMap, pending, makeRequest } = useRequest<{ firstName: string; lastName: string; id: string }>({
    url: 'http://localhost:5000/api/auth/signup',
    method: 'post',
    payload: { ...state },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });

  const changeHandler = (key: string, value: string) => {
    setState((old) => ({ ...old, [key]: value }));
  };

  const submit = async () => {
    makeRequest();
  };

  console.log(errors);

  return (
    <React.Fragment>
      <Box
        className="Signup"
        sx={{
          maxWidth: 400,
          padding: 10,
          margin: 'auto',
          marginTop: '5%',
          borderRadius: 2,
          backgroundColor: `${colorMode.mode === 'light' ? '#fff' : '#14192e'}`,
          border: `1px solid ${colorMode.mode === 'light' ? '#efefef' : '#8a8a8a'}`,
          boxShadow: `0px 2px 18px 0px ${colorMode.mode === 'light' ? '#efefef' : 'rgba(14,155,255,0.15)'} `,
        }}>
        <div className="wrapper">
          <Typography className="box" sx={{ color: 'text.primary', mb: 1, fontWeight: 600, textAlign: 'center' }} variant="h4">
            signup{' '}
          </Typography>
        </div>
        {errors && errors.length && (
          <Typography textAlign={'center'} variant="subtitle2" color="red">
            {errors[0]}
          </Typography>
        )}
        <TextField
          label="First Name"
          sx={{ color: 'button.primary', width: '100%', my: 1 }}
          focused={colorMode.mode === 'dark'}
          size="small"
          value={state.firstName}
          onChange={(e) => changeHandler('firstName', e.target.value)}
          error={errorsMap['firstName'] ? true : false}
          helperText={errorsMap['firstName']}
        />
        <TextField
          label="Last Name"
          sx={{ color: 'button.primary', width: '100%', my: 1 }}
          focused={colorMode.mode === 'dark'}
          size="small"
          value={state.lastName}
          onChange={(e) => changeHandler('lastName', e.target.value)}
          error={errorsMap['lastName'] ? true : false}
          helperText={errorsMap['lastName']}
        />
        <TextField
          label="Mail"
          sx={{ color: 'button.primary', width: '100%', my: 1 }}
          focused={colorMode.mode === 'dark'}
          size="small"
          value={state.email}
          onChange={(e) => changeHandler('email', e.target.value)}
          error={errorsMap['email'] ? true : false}
          helperText={errorsMap['email']}
        />
        <TextField
          label="Password"
          sx={{ color: 'button.primary', width: '100%', my: 1 }}
          focused={colorMode.mode === 'dark'}
          size="small"
          value={state.password}
          onChange={(e) => changeHandler('password', e.target.value)}
          error={errorsMap['password'] ? true : false}
          helperText={errorsMap['password']}
        />
        <Button sx={{ width: '100%' }} variant="contained" onClick={submit}>
          Signup
        </Button>
        <Typography
          sx={{
            color: 'text.primary',
            mt: 0.5,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}>
          Already have an account?{' '}
          <span
            style={{
              color: '#2060FD',
              fontSize: '16px',
              fontWeight: 500,
              cursor: 'pointer',
              marginLeft: 3,
            }}>
            Signin
          </span>
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export default Signup;
