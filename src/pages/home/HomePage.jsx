import React from 'react';
import { Container, Typography, Grid, Box } from '@material-ui/core';
import { format } from 'date-fns';

import { FirebaseContext } from '../../firebase';

const HomePage = () => {
  const { currentUser } = React.useContext(FirebaseContext);

  const currentHour = Number(format(new Date(), 'H'));

  const renderGreeting = () => {
    const name = currentUser.displayName.split(' ')[0];
    if (currentHour >= 2 && currentHour < 12)
      return (
        <Typography fontFamily="Raleway" variant="h4" align="left">
          Good Morning, {name}
        </Typography>
      );
    else if (currentHour >= 12 && currentHour < 6)
      return (
        <Typography variant="h4" align="left">
          Good Afternoon, {name}
        </Typography>
      );
    return (
      <Typography variant="h4" align="left">
        Good Evening, {name}
      </Typography>
    );
  };

  return (
    <Container style={{ margin: '12px' }}>
      <Grid container>{currentUser && renderGreeting()}</Grid>
    </Container>
  );
};

export default HomePage;
