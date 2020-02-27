import React from 'react';
import {
  Button,
  Drawer,
  Typography,
  Grid,
  CircularProgress
} from '@material-ui/core';
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

const CreateTicketModal = ({ category }) => {
  const { currentUser, ticketCollection } = React.useContext(FirebaseContext);

  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);

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

  const renderButtonLabel = () => {
    // When tickets are still loading
    if (!ticketCollection) {
      return (
        <CircularProgress
          size={48}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            color: 'white'
          }}
        />
      );
    }

    const { categoryA, categoryB, categoryC } = ticketCollection;

    let buttonLabel;

    if (category === 'A') {
      if (categoryA.current === 0) buttonLabel = '+';
      else buttonLabel = `A${categoryA.current}`;
    } else if (category === 'B') {
      if (categoryB.current === 0) buttonLabel = '+';
      else buttonLabel = `B${categoryB.current}`;
    } else {
      if (categoryC.current === 0) buttonLabel = '+';
      else buttonLabel = `C${categoryC.current}`;
    }

    return <Typography variant="h1">{buttonLabel}</Typography>;
  };

  const renderOpenModalButton = () => {
    // When user is not authenticated
    if (!currentUser) {
      return (
        <Button
          fullWidth
          color="primary"
          variant="contained"
          className={classes.ticketButton}
          style={buttonBackground}
          onClick={toggleDrawer}
        >
          {renderButtonLabel()}
        </Button>
      );
    }

    const { tickets } = ticketCollection;

    const openUserTickets = tickets.filter(
      ticket => ticket.createdBy.id === currentUser.id && !ticket.closed
    );

    const maxTicketsReached = openUserTickets.length >= 3;

    return (
      <Button
        fullWidth
        color="primary"
        variant="contained"
        className={classes.ticketButton}
        style={
          maxTicketsReached
            ? { ...buttonBackground, opacity: '55%' }
            : buttonBackground
        }
        onClick={maxTicketsReached ? () => {} : toggleDrawer}
      >
        {renderButtonLabel()}
      </Button>
    );
  };

  return (
    <>
      {renderOpenModalButton()}
      <Drawer anchor="right" open={modalOpen} onClose={toggleDrawer}>
        {renderContent()}
      </Drawer>
    </>
  );
};

export default CreateTicketModal;
