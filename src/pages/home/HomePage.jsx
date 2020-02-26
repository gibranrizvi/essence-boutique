import React from 'react';
import { Container, Typography, Grid, Box } from '@material-ui/core';
import { format } from 'date-fns';

import { FirebaseContext } from '../../firebase';

const HomePage = () => {
  const { currentUser } = React.useContext(FirebaseContext);

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
    </Container>
  );
};

export default HomePage;
