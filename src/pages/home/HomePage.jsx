import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

import { FirebaseContext } from '../../firebase';
import serviceList from '../../service-list/serviceList';

const serviceListA = serviceList.filter(({ category }) => category === 'A');
const serviceListB = serviceList.filter(({ category }) => category === 'B');
const serviceListC = serviceList.filter(({ category }) => category === 'C');

const useStyles = makeStyles(theme => ({
  tickets: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '42px',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(38)
    }
  },
  ticketGrid: {
    padding: 0
  },
  ticketButtonA: {
    display: 'flex',
    flex: 1,
    height: theme.spacing(24),
    background: 'linear-gradient(45deg, #e65c00 30%, #f9d423 90%)',
    opacity: '75%'
  },
  ticketButtonB: {
    display: 'flex',
    flex: 1,
    height: theme.spacing(24),
    background: 'linear-gradient(45deg, #5433ff 30%, #20bdff 90%)',
    opacity: '75%'
  },
  ticketButtonC: {
    display: 'flex',
    flex: 1,
    height: theme.spacing(24),
    background: 'linear-gradient(45deg, #cc2b5e 30%, #753a88 90%)',
    opacity: '75%'
  }
}));

const HomePage = () => {
  const { currentUser } = React.useContext(FirebaseContext);

  const classes = useStyles();

  const currentHour = Number(format(new Date(), 'H'));

  const renderGreeting = () => {
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
    <Typography align="left" component="div">
      <Box fontWeight="fontWeightRegular" letterSpacing={6} fontSize={24}>
        {format(new Date(), 'do MMMM yyyy')}
      </Box>
      {renderGreeting()}
    </Typography>
  );

  return (
    <Container style={{ paddingTop: '24px', paddingBottom: '24px' }}>
      {/* Heading */}
      {renderHeading()}

      {/* Tickets */}
      <Grid container className={classes.tickets}>
        {/* Ticket A */}
        <Grid
          display="flex"
          flexDirection="column"
          className={classes.ticketGrid}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.ticketButtonA}
          >
            <Typography variant="h1">A64</Typography>
          </Button>
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
          flexDirection="column"
          className={classes.ticketGrid}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.ticketButtonB}
          >
            <Typography variant="h1">B6</Typography>
          </Button>
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
        <Box
          display="flex"
          flexDirection="column"
          className={classes.ticketGrid}
        >
          <Button
            fullWidth
            color="primary"
            variant="contained"
            className={classes.ticketButtonC}
          >
            <Typography variant="h1">C24</Typography>
          </Button>
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
        </Box>
      </Grid>
    </Container>
  );
};

export default HomePage;
