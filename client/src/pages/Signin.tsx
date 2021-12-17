import React from 'react';
import './Signup.css';
import { ColorModeContext } from '../context/theme';
// material ui components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

const Signin: React.FC = () => {
	const colorMode = React.useContext(ColorModeContext);

	const [ state, setState ] = React.useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});

	const changeHandler = (key: string, value: string) => {
		setState((old) => ({ ...old, [key]: value }));
	};

	return (
		<React.Fragment>
			<Box
				className="Signup"
				sx={{
					maxWidth: 400,
					padding: 10,
					margin: 'auto',
					marginTop: 20,
					borderRadius: 2,
					backgroundColor: `${colorMode.mode === 'light' ? '#fff' : '#14192e'}`,
					border: `1px solid ${colorMode.mode === 'light' ? '#efefef' : '#8a8a8a'}`,
					boxShadow: `0px 2px 18px 0px ${colorMode.mode === 'light' ? '#efefef' : 'rgba(14,155,255,0.15)'} `
				}}
			>
				<Typography sx={{ color: 'text.primary', mb: 1, fontWeight: 600, textAlign: 'center' }} variant="h4">
					Url Shortener
				</Typography>

				<TextField
					label="Mail"
					sx={{ color: 'button.primary', width: '100%', my: 1 }}
					focused={colorMode.mode === 'dark'}
					size="small"
					value={state.email}
				/>
				<TextField
					label="Password"
					sx={{ color: 'button.primary', width: '100%', my: 1 }}
					focused={colorMode.mode === 'dark'}
					size="small"
					value={state.password}
				/>
				<Button sx={{ width: '100%' }} variant="contained">
					Signin
				</Button>
				<Typography
					sx={{
						color: 'text.primary',
						mt: 0.5,
						textAlign: 'center',
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					Already have an account?{' '}
					<span
						style={{
							color: '#2060FD',
							fontSize: '16px',
							fontWeight: 500,
							cursor: 'pointer',
							marginLeft: 3
						}}
					>
						Signin
					</span>
				</Typography>
			</Box>
		</React.Fragment>
	);
};

export default Signin;
