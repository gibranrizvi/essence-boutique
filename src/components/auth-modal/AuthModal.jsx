import React from 'react';
import { Button, Drawer, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SignInForm from '../sign-in-form/SignInForm';
import RegisterForm from '../register-form/RegisterForm';

const useStyles = makeStyles({
  drawer: {
    flex: 1,
    width: 300,
    marginTop: '8px',
    marginBottom: '12px'
  },
  authButton: {
    color: 'white',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
});

export default function AuthModal() {
  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [showSignInForm, setShowSignInForm] = React.useState(true);

  const toggleDrawer = () => setModalOpen(prev => !prev);

  const renderContent = () => {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.drawer}
      >
        {showSignInForm ? (
          <SignInForm
            toggleDrawer={toggleDrawer}
            setShowSignInForm={value => setShowSignInForm(value)}
          />
        ) : (
          <RegisterForm
            toggleDrawer={toggleDrawer}
            setShowSignInForm={value => setShowSignInForm(value)}
          />
        )}
      </Grid>
    );
  };

  return (
    <>
      <Button
        color="primary"
        className={classes.authButton}
        variant="contained"
        onClick={toggleDrawer}
      >
        Sign In
      </Button>
      <Drawer anchor="right" open={modalOpen} onClose={toggleDrawer}>
        {renderContent()}
      </Drawer>
    </>
  );
}
