import React from 'react';
import { Typography, Container, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '18vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white'
  }
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="inherit">
      {'Copyright © '}
      <Link component={RouterLink} color="inherit" to="/">
        Essence Boutique
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
