import React, { useEffect } from 'react'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export const Footer = () => {
  return (
    <Container component="main" maxWidth="lg">
      <Box mt={ 8 }>
        <Typography variant="body2" color="textSecondary" align="center">
          { 'Copyright © ' }
          <Link color="inherit" href="https://material-ui.com/">
            Your Website
          </Link>{ ' ' }
          { new Date().getFullYear() }
          { '.' }
        </Typography>
      </Box>
    </Container>
  );
}
