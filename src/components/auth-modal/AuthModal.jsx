import React from 'react';
import {
  Button,
  Drawer,
  Divider,
  Container,
  TextField,
  Typography,
  IconButton,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SignInForm from '../sign-in-form/SignInForm';
import RegisterForm from '../register-form/RegisterForm';

const useStyles = makeStyles({
  drawer: {
    flex: 1,
    width: 350
  },
  authButton: {
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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        className={classes.drawer}
        border={1}
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
      </Box>
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
