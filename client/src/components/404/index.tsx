import React from 'react';
import Typography from '@mui/material/Typography';

const Four04: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 150, textAlign: 'center' }}>
      <div>
        <img src="/404.png" style={{ width: 330 }} />
        <Typography variant="h5" fontWeight={600} sx={{ color: 'text.primary' }}>
          Looks like the short url is not mapped for any redirection.
        </Typography>
      </div>
    </div>
  );
};

export default Four04;
