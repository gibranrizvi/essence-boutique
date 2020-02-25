import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.png';
import { FirebaseContext, auth } from '../../firebase';

import AuthModal from '../auth-modal/AuthModal';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  offset: theme.mixins.toolbar,
  toolbar: { backgroundColor: 'white', color: 'black' },
  imageDiv: { marginRight: '10px', height: '32px' },
  image: { height: '32px' },
  authButton: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}));

const Header = () => {
  const { currentUser } = React.useContext(FirebaseContext);

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Button component={Link} to="/">
            <div className={classes.imageDiv}>
              <img src={logo} alt="Essence" className={classes.image} />
            </div>
          </Button>
          <div className={classes.grow} />

          {currentUser ? (
            <Button
              className={classes.authButton}
              variant="contained"
              onClick={() => auth.signOut()}
            >
              Sign Out
            </Button>
          ) : (
            <AuthModal />
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default Header;
