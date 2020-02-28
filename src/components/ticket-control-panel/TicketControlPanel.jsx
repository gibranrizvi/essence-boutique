import React from 'react';
import {
  Divider,
  Typography,
  Box,
  Grid,
  Link,
  Avatar,
  Button,
  CircularProgress
} from '@material-ui/core';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { makeStyles } from '@material-ui/core/styles';

import TicketPopover from '../ticket-popover/TicketPopover';

import {
  FirebaseContext,
  closeCurrentTicket,
  startNextTicket
} from '../../firebase';

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 2, 2)
  },
  submitButton: {
    color: 'white',
    marginBottom: theme.spacing(1),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}));

const TicketControlPanel = ({
  setShowTicketControls,
  category,
  toggleDrawer
}) => {
  const { ticketCollection } = React.useContext(FirebaseContext);

  const classes = useStyles();

  const [submitting, setSubmitting] = React.useState(false);

  if (!ticketCollection) {
    setShowTicketControls(false);
    return null;
  }

  const { tickets } = ticketCollection;

  const categoryTickets = tickets.filter(
    ticket => ticket.category === category
  );

  const openTickets = categoryTickets.filter(ticket => !ticket.closed);

  const renderHeading = () => {
    return (
      <Grid
        item
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar
          style={{
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
          }}
        >
          <ConfirmationNumberIcon />
        </Avatar>
        <Typography align="center" component="div">
          <Box
            fontWeight="fontWeightRegular"
            fontSize={24}
            letterSpacing={1}
            m={2}
          >
            Admin Control Panel
          </Box>
          <Box fontWeight="fontWeightRegular" fontSize={20} letterSpacing={1}>
            Category {category}
          </Box>
        </Typography>
      </Grid>
    );
  };

  const renderSummary = () => {
    if (categoryTickets.length === 0) {
      return (
        <Box
          fontWeight="fontWeightRegular"
          fontSize={14}
          letterSpacing={1}
          m={2}
        >
          There are 0 tickets under this category
        </Box>
      );
    }
    return (
      <Box fontWeight="fontWeightRegular" fontSize={14} letterSpacing={1} m={2}>
        Total tickets: {categoryTickets.length}
        <br />
        Open tickets: {openTickets.length}
        <br />
        Closed tickets: {categoryTickets.length - openTickets.length}
        <br />
      </Box>
    );
  };

  const renderTickets = () => {
    return categoryTickets
      .reverse()
      .map(ticket => (
        <TicketPopover
          key={ticket.id}
          ticket={ticket}
          current={ticket.current}
          closed={ticket.closed}
        />
      ));
  };

  const renderActions = () => {
    const currentTicket = openTickets.find(ticket => ticket.current);

    const noMoreTickets = openTickets.length === 0;

    const nextTicket = !noMoreTickets
      ? openTickets[openTickets.length - 1]
      : null;

    let categoryObject =
      category === 'A'
        ? ticketCollection.categoryA
        : category === 'B'
        ? ticketCollection.categoryB
        : ticketCollection.categoryC;

    return (
      <div className={classes.submit}>
        <Box
          fontWeight="fontWeightRegular"
          fontSize={14}
          letterSpacing={1}
          m={2}
        >
          {currentTicket && `Current ticket: ${currentTicket.id}`}
        </Box>
        {currentTicket ? (
          <Button
            fullWidth
            variant="contained"
            className={classes.submitButton}
            onClick={() => closeCurrentTicket(currentTicket, tickets)}
          >
            {submitting && (
              <CircularProgress
                size={20}
                style={{
                  position: 'absolute',
                  left: 20,
                  alignSelf: 'center',
                  color: 'white'
                }}
              />
            )}
            Complete Ticket
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            className={classes.submitButton}
            onClick={() => startNextTicket(nextTicket, tickets, categoryObject)}
            disabled={noMoreTickets}
          >
            {submitting && (
              <CircularProgress
                size={20}
                style={{
                  position: 'absolute',
                  left: 20,
                  alignSelf: 'center',
                  color: 'white'
                }}
              />
            )}
            Start Next Ticket
          </Button>
        )}
        <Button fullWidth onClick={toggleDrawer}>
          Cancel
        </Button>
      </div>
    );
  };

  return (
    <Grid container justify="center">
      <Typography align="center" component="div">
        {renderHeading()}
        {renderSummary()}
        {renderTickets()}
        <div style={{ margin: '20px 12px' }}>
          <Divider />
        </div>
        {renderActions()}
      </Typography>
      <Grid item>
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
    </Grid>
  );
};

export default TicketControlPanel;
