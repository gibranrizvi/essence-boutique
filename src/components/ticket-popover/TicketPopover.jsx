import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { format } from 'date-fns';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function TicketPopover({ ticket }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let buttonBackground;

  switch (ticket.category) {
    case 'A':
      buttonBackground = {
        background: 'linear-gradient(45deg, #e65c00 30%, #f9d423 90%)'
      };
      break;
    case 'B':
      buttonBackground = {
        background: 'linear-gradient(45deg, #5433ff 30%, #20bdff 90%)'
      };
      break;
    case 'C':
      buttonBackground = {
        background: 'linear-gradient(45deg, #cc2b5e 30%, #753a88 90%)'
      };
      break;
    default:
      break;
  }

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        style={{
          padding: '6px 12px',
          margin: '2px',
          opacity: '85%',
          ...buttonBackground
        }}
        onClick={handleClick}
      >
        {ticket.id}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography className={classes.typography} component="div">
          <Box fontWeight="fontWeightRegular" letterSpacing={2} fontSize={14}>
            Ticket no. <strong>{ticket.id}</strong>
            <br />
            Customer: <strong>{ticket.customerName}</strong>
            <br />
            Telephone: <strong>{ticket.telephone}</strong>
            <br />
            Email: {ticket.email ? <strong>{ticket.email}</strong> : '-'}
            <br />
            Created at{' '}
            <strong>{format(ticket.createdAt.toDate(), 'HH:mm')} today</strong>
          </Box>
        </Typography>
      </Popover>
    </div>
  );
}
