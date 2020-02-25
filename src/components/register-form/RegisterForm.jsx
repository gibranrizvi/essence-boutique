import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
  CircularProgress
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { createNewUser, createUserProfileDocument } from '../../firebase';

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
  email: '',
  password: '',
  confirmPassword: ''
};

export default function RegisterForm({ toggleDrawer, setShowSignInForm }) {
  const classes = useStyles();

  const [values, setValues] = React.useState(INITIAL_VALUES);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  const {
    firstName,
    lastName,
    telephone,
    email,
    password,
    confirmPassword
  } = values;

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
    } else if (!email) {
      return setErrors({
        email: 'Email is required'
      });
    } else if (!password) {
      return setErrors({
        password: 'Password is required'
      });
    } else if (password.length < 6) {
      return setErrors({
        password: 'Password must be at least 6 characters'
      });
    } else if (!confirmPassword) {
      return setErrors({
        confirmPassword: 'Please confirm password'
      });
    } else if (password !== confirmPassword) {
      return setErrors({
        confirmPassword: 'Passwords do not match'
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

    const displayName =
      formattedFirstName.charAt(0).toUpperCase() +
      formattedFirstName.substring(1) +
      ' ' +
      formattedLastName.charAt(0).toUpperCase() +
      formattedLastName.substring(1);

    const formattedEmail = email;

    try {
      const user = await createNewUser(formattedEmail, password);

      const { uid, email } = user;

      const userData = {
        uid,
        displayName,
        telephone,
        email
      };

      await createUserProfileDocument(userData);

      await setSubmitting(false);
      await setValues(INITIAL_VALUES);
      return toggleDrawer;
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      return setErrors({
        email: 'Email is already in use'
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            type="email"
            label="Email"
            value={email}
            onChange={({ target }) =>
              setValues({ ...values, email: target.value })
            }
            error={!!errors.email}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) =>
              setValues({ ...values, password: target.value })
            }
            error={!!errors.password}
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={({ target }) =>
              setValues({ ...values, confirmPassword: target.value })
            }
            error={!!errors.confirmPassword}
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
              Create Account
            </Button>
            <Button fullWidth onClick={toggleDrawer}>
              Cancel
            </Button>
          </div>
          <Grid container justify="center">
            <Grid item>
              <Link
                onClick={() => setShowSignInForm(true)}
                variant="body2"
                style={{ cursor: 'pointer' }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
