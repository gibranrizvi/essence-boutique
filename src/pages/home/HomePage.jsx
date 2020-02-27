import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Divider,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

import { FirebaseContext } from '../../firebase';
import serviceList from '../../service-list/serviceList';

import TicketActionsModal from '../../components/ticket-actions-modal/TicketActionsModal';
import TicketPopover from '../../components/ticket-popover/TicketPopover';

const serviceListA = serviceList.filter(({ category }) => category === 'A');
const serviceListB = serviceList.filter(({ category }) => category === 'B');
const serviceListC = serviceList.filter(({ category }) => category === 'C');

const useStyles = makeStyles(theme => ({
  tickets: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '12px',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(36)
    }
  },
  ticketGrid: {
    padding: 0
  }
}));

// COMPONENT
const HomePage = () => {
  const { currentUser, ticketCollection } = React.useContext(FirebaseContext);

  const classes = useStyles();

  const renderDate = () => (
    <Box fontWeight="fontWeightRegular" letterSpacing={6} fontSize={24}>
      {format(new Date(), 'do MMMM yyyy')}
    </Box>
  );

  const renderGreeting = () => {
    const currentHour = Number(format(new Date(), 'H'));
    let greetingMessage = '';

    if (currentHour >= 2 && currentHour < 12) greetingMessage = 'Good Morning';
    else if (currentHour >= 12 && currentHour < 6)
      greetingMessage = 'Good Afternoon';
    else greetingMessage = 'Good Evening';

    if (currentUser && !currentUser.displayName.includes('Display')) {
      const name = currentUser.displayName.split(' ')[0];
      return (
        <Box fontWeight="fontWeightLight" letterSpacing={3} fontSize={48}>
          {greetingMessage + ', ' + name}
        </Box>
      );
    }

    return (
      <Box fontWeight="fontWeightLight" letterSpacing={3} fontSize={48}>
        {greetingMessage}
      </Box>
    );
  };

  const renderHeading = () => (
    <Grid
      container
      direction="row"
      justify="center"
      style={{ paddingBottom: '24px' }}
    >
      <Grid item xs={12} md={8}>
        <Typography align="left" component="div">
          {renderDate()}
          {renderGreeting()}
        </Typography>
        <Typography variant="h6" align="left">
          <Box fontWeight="fontWeightRegular" letterSpacing={2} fontSize={14}>
            {!currentUser &&
              'Sign in or Register to save your information for your next visit.'}
            <div style={{ margin: '8px 0', paddingRight: '24px' }}>
              <Divider />
            </div>
            Get started by selecting one of the three ticket categories below.
            <br />
            Each ticket category covers a different set of services.
          </Box>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
        style={{
          marginTop: '24px'
        }}
      >
        <Paper
          elevation={3}
          style={{
            display: 'flex',
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {!ticketCollection && (
            <Typography align="center" component="div">
              <Box
                fontWeight="fontWeightRegular"
                letterSpacing={2}
                fontSize={20}
              >
                View upcoming tickets here
              </Box>
            </Typography>
          )}
          {!currentUser
            ? null
            : !ticketCollection
            ? null
            : renderOpenUserTickets()}
        </Paper>
      </Grid>
    </Grid>
  );

  const renderOpenUserTickets = () => {
    const { tickets } = ticketCollection;

    const openUserTickets = tickets.filter(
      ticket =>
        ticket.createdBy.id &&
        ticket.createdBy.id === currentUser.id &&
        !ticket.current &&
        !ticket.closed
    );

    // NOTE registered customers can create tickets on behalf of others
    // TODO remove anonymous ticket creation - only admin can create tickets for walk-ins - maybe

    const userTicketButtons = openUserTickets.map(ticket => (
      <TicketPopover key={ticket.id} ticket={ticket} />
    ));

    return (
      <Typography align="center" component="div">
        <Box
          fontWeight="fontWeightRegular"
          letterSpacing={2}
          fontSize={20}
          mt={2}
        >
          {openUserTickets.length === 0
            ? 'View upcoming tickets here'
            : 'Upcoming tickets'}
        </Box>
        <Grid
          container
          style={{
            display: 'flex',
            marginTop: '12px',
            marginBottom: '20px',
            paddingLeft: '8px',
            paddingRight: '8px',
            justifyContent: 'center',
            alignContent: 'flex-start'
          }}
        >
          {userTicketButtons}
        </Grid>
        {!currentUser.isAdmin && openUserTickets.length >= 3 && (
          <Box fontWeight="fontWeightRegular" letterSpacing={2} fontSize={14}>
            You have reached a maximum of 3 tickets
          </Box>
        )}
      </Typography>
    );
  };

  const renderTickets = () => (
    <>
      <Grid>
        <Typography variant="h6">
          <Box fontWeight="fontWeightLight" letterSpacing={2} fontSize={32}>
            - Currently Serving -
          </Box>
        </Typography>
      </Grid>
      <Grid container className={classes.tickets}>
        {/* Ticket A */}
        <Grid
          display="flex"
          flexdirection="column"
          className={classes.ticketGrid}
        >
          <TicketActionsModal category="A" />
          <Typography
            align="left"
            component="div"
            style={{
              padding: '12px 4px',
              marginBottom: '12px'
            }}
          >
            <Box fontWeight="fontWeightRegular" letterSpacing={1} fontSize={16}>
              Services include:
            </Box>
            <Box
              fontWeight="fontWeightRegular"
              letterSpacing={1}
              fontSize={14}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              {serviceListA.map(service => (
                <div key={service.id}>
                  <p style={{ marginBottom: '2px' }}>
                    {service.name} - {service.price}sr ~ {service.duration} mins
                  </p>
                  <Divider />
                </div>
              ))}
            </Box>
          </Typography>
        </Grid>

        {/* Ticket B */}
        <Grid
          display="flex"
          flexdirection="column"
          className={classes.ticketGrid}
        >
          <TicketActionsModal category="B" />
          <Typography
            align="left"
            component="div"
            style={{
              padding: '12px 4px',
              marginBottom: '12px'
            }}
          >
            <Box fontWeight="fontWeightRegular" letterSpacing={1} fontSize={16}>
              Services include:
            </Box>
            <Box
              fontWeight="fontWeightRegular"
              letterSpacing={1}
              fontSize={14}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              {serviceListB.map(service => (
                <div key={service.id}>
                  <p style={{ marginBottom: '2px' }}>
                    {service.name} - {service.price}sr ~ {service.duration} mins
                  </p>
                  <Divider />
                </div>
              ))}
            </Box>
          </Typography>
        </Grid>

        {/* Ticket C */}
        <Grid
          display="flex"
          flexdirection="column"
          className={classes.ticketGrid}
        >
          <TicketActionsModal category="C" />
          <Typography
            align="left"
            component="div"
            style={{
              padding: '12px 4px',
              marginBottom: '12px'
            }}
          >
            <Box fontWeight="fontWeightRegular" letterSpacing={1} fontSize={16}>
              Services include:
            </Box>
            <Box
              fontWeight="fontWeightRegular"
              letterSpacing={1}
              fontSize={14}
              style={{ paddingLeft: '8px', paddingRight: '8px' }}
            >
              {serviceListC.map(service => (
                <div key={service.id}>
                  <p style={{ marginBottom: '2px' }}>
                    {service.name} - {service.price}sr ~ {service.duration} mins
                  </p>
                  <Divider />
                </div>
              ))}
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container style={{ padding: '24px' }}>
      {/* Heading */}
      {renderHeading()}

      {/* Tickets */}
      {renderTickets()}
    </Container>
  );
};

export default HomePage;
