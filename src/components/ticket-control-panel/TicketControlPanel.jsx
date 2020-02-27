import React from 'react';
import {
  Divider,
  Typography,
  Box,
  Grid,
  Link,
  Avatar
} from '@material-ui/core';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';

import TicketPopover from '../ticket-popover/TicketPopover';

import { FirebaseContext } from '../../firebase';

const TicketControlPanel = ({ setShowTicketControls, category }) => {
  const { ticketCollection } = React.useContext(FirebaseContext);

  if (!ticketCollection) {
    return setShowTicketControls(false);
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
    return openTickets.find(ticket => ticket.current) ? (
      <Box fontWeight="fontWeightRegular" fontSize={14} letterSpacing={1} m={2}>
        Current ticket: {openTickets.find(ticket => ticket.current).id}
        <br />
        Close current ticket and go to next ticket
      </Box>
    ) : (
      <Box fontWeight="fontWeightRegular" fontSize={14} letterSpacing={1} m={2}>
        Get started by setting current ticket to {category}1
      </Box>
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
