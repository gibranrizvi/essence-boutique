import React from 'react';
import {
  Button,
  Drawer,
  Typography,
  Grid,
  CircularProgress,
  Link,
  Divider,
  Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FirebaseContext } from '../../firebase';
import CreateTicketForm from '../create-ticket-form/CreateTicketForm';

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

  const toggleDrawer = () => setModalOpen(prev => !prev);

  const renderContent = () => {
    let drawerContent;
    if (!currentUser) {
      if (!ticketCollection) {
        drawerContent = (
          <CircularProgress
            size={48}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              color: '#333'
            }}
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
    } else {
      if (currentUser.isAdmin) {
        drawerContent = showTicketControls ? (
          renderTicketControls()
        ) : (
          <CreateTicketForm
            toggleDrawer={toggleDrawer}
            category={category}
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

  const renderTicketControls = () => {
    const { tickets } = ticketCollection;

    const categoryTickets = tickets.filter(
      ticket => ticket.category === category
    );

    let content;
    if (categoryTickets.length === 0)
      content = (
        <Box
          fontWeight="fontWeightRegular"
          fontSize={14}
          letterSpacing={2}
          m={2}
        >
          There are 0 tickets under this category
        </Box>
      );
    else {
      const openTickets = categoryTickets.filter(ticket => !ticket.closed);

      content = (
        <Typography align="center" component="div">
          <Box
            fontWeight="fontWeightRegular"
            fontSize={24}
            letterSpacing={2}
            m={2}
          >
            Category {category}
          </Box>
          <Box
            fontWeight="fontWeightRegular"
            fontSize={14}
            letterSpacing={2}
            m={2}
          >
            Total tickets: {categoryTickets.length}
            <br />
            Open tickets: {openTickets.length}
            <br />
            Closed tickets: {categoryTickets.length - openTickets.length}
            <br />
          </Box>
          <Divider />
          {openTickets.find(ticket => ticket.current) ? (
            <Box
              fontWeight="fontWeightRegular"
              fontSize={14}
              letterSpacing={2}
              m={2}
            >
              Current ticket: {openTickets.find(ticket => ticket.current).id}
              <br />
              Close current ticket and go to next ticket
            </Box>
          ) : (
            <Box
              fontWeight="fontWeightRegular"
              fontSize={14}
              letterSpacing={2}
              m={2}
            >
              Set current ticket to {category}1
            </Box>
          )}
        </Typography>
      );
    }

    return (
      <>
        {content}
        <Grid container justify="center">
          <Grid item>
            <Link
              onClick={() => setShowTicketControls(false)}
              variant="body2"
              style={{ cursor: 'pointer' }}
            >
              Create a ticket for a customer
            </Link>
          </Grid>
        </Grid>
      </>
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
      <Drawer anchor="left" open={modalOpen} onClose={toggleDrawer}>
        {renderContent()}
      </Drawer>
    </>
  );
};

export default TicketActionsModal;
