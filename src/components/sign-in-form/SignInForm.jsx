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
  CircularProgress,
  FormHelperText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { auth, createUserProfileDocument } from '../../firebase';

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
    marginTop: theme.spacing(1)
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

export default function SignIn({ toggleDrawer, setShowSignInForm }) {
  const classes = useStyles();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    // Validation
    if (!email) {
      return setErrors({ email: 'Please enter your email' });
    } else if (!password) {
      return setErrors({ password: 'Please enter your password' });
    } else if (
      email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      return setErrors({ email: 'Email is invalid' });
    }

    setErrors({});
    setSubmitting(true);

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);

      return await createUserProfileDocument({ uid: user.uid });
    } catch (error) {
      console.log(error.message);
      setSubmitting(false);
      return setErrors({ general: error.message });
    }
  };

  return (
    <Container>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Email"
            type="email"
            autoFocus
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            error={!!errors.email || !!errors.general}
            helperText={
              errors.email ? (
                <span style={{ color: 'red', marginLeft: '-12px' }}>
                  {errors.email}
                </span>
              ) : null
            }
          />
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            error={!!errors.password || !!errors.general}
            helperText={
              errors.password ? (
                <span style={{ color: 'red', marginLeft: '-12px' }}>
                  {errors.password}
                </span>
              ) : null
            }
          />
          {errors.general && (
            <FormHelperText style={{ color: 'red' }}>
              {errors.general}
            </FormHelperText>
          )}
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
              Sign In
            </Button>
            <Button fullWidth onClick={toggleDrawer}>
              Cancel
            </Button>
          </div>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => setShowSignInForm(false)}
                variant="body2"
                style={{ cursor: 'pointer' }}
              >
                Don't have an account? Sign up now
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
