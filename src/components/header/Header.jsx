import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import {} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/logo.png';
import { FirebaseContext } from '../../firebase';

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
  offset: theme.mixins.toolbar
}));

const Header = () => {
  const { currentUser } = React.useContext(FirebaseContext);

  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: 'white', color: 'black' }}>
          <div style={{ marginRight: '10px' }}>
            <img src={logo} alt="Essence" style={{ height: '32px' }} />
          </div>

          <div className={classes.grow} />
          {currentUser ? (
            <Button color="black" component={Link} to="/">
              Sign Out
            </Button>
          ) : (
            <Button color="black" component={Link} to="/sign-in">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
};

export default Header;
