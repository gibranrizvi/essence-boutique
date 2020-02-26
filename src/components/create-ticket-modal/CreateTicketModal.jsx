import React from 'react';
import { Button, Drawer, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FirebaseContext } from '../../firebase';
import CreateTicketForm from '../create-ticket-form/CreateTicketForm';

const useStyles = makeStyles(theme => ({
  drawer: {
    flex: 1,
    width: 300,
    border: 'solid 1px black'
  },
  ticketButton: {
    display: 'flex',
    height: theme.spacing(24),
    opacity: '75%'
  }
}));

const CreateTicketModal = ({ currentTicket }) => {
  const { currentUser } = React.useContext(FirebaseContext);

  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);

  const { id, category } = currentTicket;

  let buttonBackground;

  if (category === 'A') {
    buttonBackground = {
      background: 'linear-gradient(45deg, #e65c00 30%, #f9d423 90%)'
    };
  } else if (category === 'B') {
    buttonBackground = {
      background: 'linear-gradient(45deg, #5433ff 30%, #20bdff 90%)'
    };
  } else {
    buttonBackground = {
      background: 'linear-gradient(45deg, #cc2b5e 30%, #753a88 90%)'
    };
  }

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
        <CreateTicketForm
          toggleDrawer={toggleDrawer}
          currentUser={currentUser}
          category={category}
        />
      </Grid>
    );
  };

  return (
    <>
      <Button
        fullWidth
        color="primary"
        variant="contained"
        className={classes.ticketButton}
        style={buttonBackground}
        onClick={toggleDrawer}
      >
        <Typography variant="h1">
          {category}
          {id}
        </Typography>
      </Button>
      <Drawer anchor="right" open={modalOpen} onClose={toggleDrawer}>
        {renderContent()}
      </Drawer>
    </>
  );
};

export default CreateTicketModal;
