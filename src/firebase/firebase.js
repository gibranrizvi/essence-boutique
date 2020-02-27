import firebase from 'firebase/app';
import { format } from 'date-fns';
import 'firebase/firestore';
import 'firebase/auth';

import config from './config';

const secondaryApp = firebase.initializeApp(config, 'Secondary');

// Create or update ticket
export const createTicketDocument = async ticketData => {
  if (!ticketData) return;

  const currentDate = format(new Date(), 'dd-MM-yyyy');

  const ticketCollectionsRef = firestore.doc(
    `ticketCollections/${currentDate}`
  );

  const snapshot = await ticketCollectionsRef.get();

  const { customerName, category, telephone, email, currentUser } = ticketData;
  const createdAt = new Date();

  if (!snapshot.exists) {
    // Use set method - this will only run once a day
    const id = 1;

    const newTicket = {
      id: category + id,
      customerName,
      category,
      telephone,
      email,
      createdBy: currentUser
        ? {
            id: currentUser.id,
            displayName: currentUser.displayName,
            telephone: currentUser.telephone
          }
        : { displayName: customerName, telephone: telephone },
      createdAt,
      current: false,
      closed: false
    };

    try {
      await ticketCollectionsRef.set({
        categoryA: { count: category === 'A' ? 1 : 0, current: 0 },
        categoryB: { count: category === 'B' ? 1 : 0, current: 0 },
        categoryC: {
          count: category === 'C' ? 1 : 0,
          current: 0
        },
        tickets: [newTicket]
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    // Use update method

    const { categoryA, categoryB, categoryC, tickets } = snapshot.data();

    let id;
    let newDoc;

    // Updating counts
    if (category === 'A') {
      id = categoryA.count + 1;
      newDoc = { categoryA: { count: id, current: categoryA.current } };
    } else if (category === 'B') {
      id = categoryB.count + 1;
      newDoc = { categoryB: { count: id, current: categoryB.current } };
    } else {
      id = categoryC.count + 1;
      newDoc = { categoryC: { count: id, current: categoryC.current } };
    }

    const newTicket = {
      id: category + id,
      customerName,
      category,
      telephone,
      email,
      createdBy: currentUser
        ? {
            id: currentUser.id,
            displayName: currentUser.displayName,
            telephone: currentUser.telephone
          }
        : { displayName: customerName, telephone: telephone },
      createdAt,
      current: false,
      closed: false
    };

    newDoc.tickets = [newTicket, ...tickets];

    try {
      await ticketCollectionsRef.update(newDoc);
    } catch (error) {
      console.log(error.message);
    }
  }

  return ticketCollectionsRef;
};

// Create user with firebase auth as admin
export const createNewUserAsAdmin = (email, password) => {
  return secondaryApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      secondaryApp.auth().signOut();
      return user;
    });
};

// Create user with firebase auth
export const createNewUser = (email, password) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return user;
    });
};

// Saving new user or updating existing user in Firestore
export const createUserProfileDocument = async userAuth => {
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    // Create new user
    const { displayName, telephone, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        telephone,
        email,
        createdAt
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    // Update user
    const lastLoggedIn = new Date();

    try {
      await userRef.update({
        lastLoggedIn
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userRef;
};

// Initialize Firebase
firebase.initializeApp(config);

// Export Auth and Firestore services
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google OAuth set up
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Export signInWithGoogle method
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// Firebase default export
export default firebase;
