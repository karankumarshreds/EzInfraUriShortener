import { PaletteMode } from '@mui/material';
import { grey } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		...mode === 'light'
			? {
					// palette values for light mode
					background: {
						default: '#fff'
					},
					text: {
						primary: grey[900],
						secondary: grey[800]
					},
					button: { dark: '#2060FD' }
				}
			: {
					// palette values for dark mode
					background: {
						default: '#050e30'
					},
					text: {
						primary: grey[50],
						secondary: grey[300]
					},
					button: { dark: '#2060FD' }
				}
	}
});
