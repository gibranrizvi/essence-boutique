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
import TicketControlPanel from '../ticket-control-panel/TicketControlPanel';

const useStyles = makeStyles(theme => ({
  drawer: {
    flex: 1,
    width: 300
  },
  ticketButton: {
    display: 'flex',
    height: theme.spacing(24),
    opacity: '75%'
  }
}));

const TicketActionsModal = ({ category }) => {
  const { currentUser, ticketCollection } = React.useContext(FirebaseContext);

  const classes = useStyles();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [showTicketControls, setShowTicketControls] = React.useState(true);

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

  const toggleDrawer = () => {
    if (currentUser && currentUser.isAdmin) setShowTicketControls(true);
    return setModalOpen(prev => !prev);
  };

  const renderContent = () => {
    let drawerContent;
    if (!currentUser) {
      drawerContent = (
        <CreateTicketForm
          toggleDrawer={toggleDrawer}
          currentUser={currentUser}
          category={category}
        />
      );
    } else {
      if (currentUser.isAdmin) {
        drawerContent = showTicketControls ? (
          <TicketControlPanel
            category={category}
            setShowTicketControls={setShowTicketControls}
          />
        ) : (
          <CreateTicketForm
            toggleDrawer={toggleDrawer}
            category={category}
            currentUser={currentUser}
            setShowTicketControls={setShowTicketControls}
          />
        );
      } else {
        drawerContent = (
          <CreateTicketForm
            toggleDrawer={toggleDrawer}
            currentUser={currentUser}
            category={category}
          />
        );
      }
    }

    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.drawer}
      >
        {drawerContent}
      </Grid>
    );
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
          {renderOpenModalButtonLabel()}
        </Button>
      );
    }

    if (!ticketCollection) {
      return (
        <Button
          fullWidth
          color="primary"
          variant="contained"
          className={classes.ticketButton}
          style={buttonBackground}
          onClick={toggleDrawer}
        >
          {renderOpenModalButtonLabel()}
        </Button>
      );
    }

    // If user is logged in, check how many tickets are booked
    // If user has reached max tickets, disable buttons
    const { tickets } = ticketCollection;

    const openUserTickets = tickets.filter(
      ticket =>
        ticket.createdBy.id &&
        ticket.createdBy.id === currentUser.id &&
        !ticket.closed
    );

    const maxTicketsReached = openUserTickets.length >= 3;

    return (
      <Button
        fullWidth
        color="primary"
        variant="contained"
        className={classes.ticketButton}
        style={
          !currentUser.isAdmin && maxTicketsReached
            ? { ...buttonBackground, opacity: '55%' }
            : buttonBackground
        }
        onClick={maxTicketsReached ? () => {} : toggleDrawer}
      >
        {renderOpenModalButtonLabel()}
      </Button>
    );
  };

  const renderOpenModalButtonLabel = () => {
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

  return (
    <>
      {renderOpenModalButton()}
      <Drawer anchor="left" open={modalOpen} onClose={toggleDrawer}>
        {renderContent()}
      </Drawer>
    </>
  );
};

export default TicketActionsModal;
