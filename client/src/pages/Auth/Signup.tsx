import React from 'react';
import { Navigate } from 'react-router-dom';
import './Signup.css';
import { ColorModeContext } from 'context/theme';
import { AuthContext } from 'context/auth';
import { useRequest } from 'hooks/useRequest';
// material ui components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, CircularProgress, Typography } from '@mui/material';

type Field = 'firstName' | 'lastName' | 'email' | 'password';

const fields: { field: Field; label: string }[] = [
  { field: 'firstName', label: 'First Name' },
  { field: 'lastName', label: 'Last Name' },
  { field: 'email', label: 'Email' },
  { field: 'password', label: 'Password' },
];

const Signup: React.FC = () => {
  const colorMode = React.useContext(ColorModeContext);
  const { authState } = React.useContext(AuthContext);

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

  const changeHandler = (key: Field, value: string) => {
    setState((old) => ({ ...old, [key]: value }));
  };

  const submit = async () => {
    makeRequest();
  };

  if (authState) {
    return <Navigate replace to="/" />;
  }

  const renderTextFields = () => {
    return fields.map((each: { field: Field; label: string }) => {
      const { field, label } = each;
      return (
        <TextField
          key={field}
          label={label}
          sx={{ color: 'button.primary', width: '100%', my: 1 }}
          focused={colorMode.mode === 'dark'}
          size="small"
          value={state[field]}
          onChange={(e) => changeHandler(field, e.target.value)}
          error={errorsMap[field] ? true : false}
          helperText={errorsMap[field]}
        />
      );
    });
  };

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
            Dyte.io
          </Typography>
        </div>
        {errors && errors.length > 0 && (
          <Typography textAlign={'center'} variant="subtitle2" color="red">
            {errors[0]}
          </Typography>
        )}
        {renderTextFields()}

        <Button sx={{ width: '100%' }} variant="contained" onClick={submit} disabled={pending}>
          {pending ? <CircularProgress sx={{ width: 5 }} /> : 'Signup'}
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
