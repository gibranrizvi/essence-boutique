import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';

import { FirebaseContext } from '../../firebase';

const useStyles = makeStyles(theme => ({
  tickets: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(26),
      height: theme.spacing(32)
    },
    justifyContent: 'center',
    marginTop: '36px'
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
    greetingMessage = 'Good Evening';

    if (currentUser && !currentUser.displayName.includes('Display')) {
      const name = currentUser.displayName.split(' ')[0];
      return (
        <Typography variant="h4" align="left">
          {greetingMessage + ', ' + name}
        </Typography>
      );
    }

    return (
      <Typography variant="h4" align="left">
        {greetingMessage}
      </Typography>
    );
  };

  return (
    <Container style={{ padding: '24px' }}>
      <Typography variant="h6" align="left">
        {format(new Date(), 'do MMMM yyyy')}
      </Typography>
      <Grid container>{renderGreeting()}</Grid>
      <Container maxWidth="md" className={classes.tickets}>
        <Button
          color="primary"
          variant="contained"
          style={{
            background: 'linear-gradient(45deg, #e65c00 30%, #f9d423 90%)',
            opacity: '75%'
          }}
        >
          Ticket Number
          <br />
          24
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{
            background: 'linear-gradient(45deg, #5433ff 30%, #20bdff 90%)',
            opacity: '75%'
          }}
        >
          Ticket Number
          <br />
          24
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={{
            background: 'linear-gradient(45deg, #cc2b5e 30%, #753a88 90%)',
            opacity: '75%'
          }}
        >
          Ticket Number
          <br />
          24
        </Button>
      </Container>
    </Container>
  );
};

export default HomePage;
