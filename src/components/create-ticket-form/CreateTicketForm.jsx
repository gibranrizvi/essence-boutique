import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
  FormHelperText,
  Link
} from '@material-ui/core';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import { makeStyles } from '@material-ui/core/styles';
import { createTicketDocument } from '../../firebase';

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  submitButton: {
    color: 'white',
    marginBottom: theme.spacing(1),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  }
}));

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  telephone: '',
  email: ''
};

const CreateTicketForm = ({
  toggleDrawer,
  currentUser,
  category,
  setShowTicketControls
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState(INITIAL_VALUES);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (currentUser) {
      const { displayName, telephone, email } = currentUser;
      const names = displayName.split(' ');
      const firstName = names[0],
        lastName = names[1];
      setValues({
        firstName,
        lastName,
        telephone,
        email
      });
    }
  }, [currentUser]);

  const { firstName, lastName, telephone, email } = values;

  const handleSubmit = async event => {
    event.preventDefault();

    // Validation
    if (!firstName) {
      return setErrors({ firstName: 'First name is required' });
    } else if (!lastName) {
      return setErrors({
        lastName: 'Last name is required'
      });
    } else if (!telephone) {
      return setErrors({
        telephone: 'Please enter a telephone number'
      });
    } else if (
      email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      return setErrors({ email: 'Email is invalid' });
    }

    setSubmitting(true);
    setErrors({});

    const formattedFirstName = firstName.trim(),
      formattedLastName = lastName.trim();

    const customerName =
      formattedFirstName.charAt(0).toUpperCase() +
      formattedFirstName.substring(1) +
      ' ' +
      formattedLastName.charAt(0).toUpperCase() +
      formattedLastName.substring(1);

    try {
      const ticketData = {
        customerName,
        category,
        telephone,
        email: email ? email : null,
        currentUser: currentUser ? currentUser : null
      };

      await createTicketDocument(ticketData);

      return toggleDrawer();
    } catch (error) {
      console.log(error.message);
      setSubmitting(false);
      return setErrors({
        general: error.message
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ConfirmationNumberIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create ticket
        </Typography>
        <small>Catergory - {category}</small>
        <small>Enter your details</small>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                type="text"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={({ target }) =>
                  setValues({ ...values, firstName: target.value })
                }
                error={!!errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="dense"
                required
                fullWidth
                type="text"
                label="Last Name"
                value={lastName}
                onChange={({ target }) =>
                  setValues({ ...values, lastName: target.value })
                }
                error={!!errors.lastName}
              />
            </Grid>
          </Grid>
          <FormHelperText
            style={{
              marginLeft: '2px',
              marginTop: '-2px',
              marginBottom: '4px',
              color: 'red'
            }}
          >
            {errors.firstName && errors.firstName}
            {errors.lastName && errors.lastName}
          </FormHelperText>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            type="tel"
            label="Telephone"
            value={telephone}
            onChange={({ target }) =>
              setValues({ ...values, telephone: target.value })
            }
            error={!!errors.telephone}
            helperText={
              errors.telephone ? (
                <span style={{ color: 'red', marginLeft: '-12px' }}>
                  {errors.telephone}
                </span>
              ) : null
            }
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={({ target }) =>
              setValues({ ...values, email: target.value })
            }
            error={!!errors.email}
            helperText={
              errors.email ? (
                <span style={{ color: 'red', marginLeft: '-12px' }}>
                  {errors.email}
                </span>
              ) : null
            }
          />
          <div className={classes.submit}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submitButton}
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
              Create Ticket
            </Button>
            <Button fullWidth onClick={toggleDrawer}>
              Cancel
            </Button>
          </div>
          {setShowTicketControls && (
            <Grid container justify="center">
              <Grid item>
                <Link
                  onClick={() => setShowTicketControls(true)}
                  variant="body2"
                  style={{ cursor: 'pointer' }}
                >
                  Go to control panel
                </Link>
              </Grid>
            </Grid>
          )}
        </form>
      </div>
    </Container>
  );
};

export default CreateTicketForm;
