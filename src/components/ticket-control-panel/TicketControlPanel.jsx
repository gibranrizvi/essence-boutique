import React from 'react';
import { Divider, Typography, Box, Grid, Link } from '@material-ui/core';
import { FirebaseContext } from '../../firebase';

const TicketControlPanel = ({ setShowTicketControls, category }) => {
  const { ticketCollection } = React.useContext(FirebaseContext);

  let content;
  if (!ticketCollection) {
    return setShowTicketControls(false);
  }

  const { tickets } = ticketCollection;

  const categoryTickets = tickets.filter(
    ticket => ticket.category === category
  );

  if (categoryTickets.length === 0)
    content = (
      <Box fontWeight="fontWeightRegular" fontSize={14} letterSpacing={2} m={2}>
        There are 0 tickets under this category
      </Box>
    );
  else {
    const openTickets = categoryTickets.filter(ticket => !ticket.closed);

    content = (
      <>
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
      </>
    );
  }

  return (
    <>
      <Typography align="center" component="div">
        <Box
          fontWeight="fontWeightRegular"
          fontSize={24}
          letterSpacing={2}
          m={2}
        >
          Admin Control Panel
        </Box>
        <Box fontWeight="fontWeightRegular" fontSize={20} letterSpacing={2}>
          Category {category}
        </Box>
        {content}
      </Typography>
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

export default TicketControlPanel;
