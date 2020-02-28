import FirebaseContext from './context';
import firebase, {
  auth,
  firestore,
  createNewUser,
  createNewUserAsAdmin,
  createUserProfileDocument,
  createTicketDocument,
  closeCurrentTicket,
  startNextTicket
} from './firebase';

export {
  FirebaseContext,
  auth,
  firestore,
  createNewUser,
  createNewUserAsAdmin,
  createUserProfileDocument,
  createTicketDocument,
  closeCurrentTicket,
  startNextTicket
};

export default firebase;
