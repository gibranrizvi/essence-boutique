import FirebaseContext from './context';
import firebase, {
  auth,
  firestore,
  createNewUser,
  createNewUserAsAdmin,
  createUserProfileDocument,
  createTicketDocument
} from './firebase';

export {
  FirebaseContext,
  auth,
  firestore,
  createNewUser,
  createNewUserAsAdmin,
  createUserProfileDocument,
  createTicketDocument
};

export default firebase;
