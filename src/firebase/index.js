import FirebaseContext from './context';
import firebase, {
  auth,
  firestore,
  createNewUser,
  createNewUserAsAdmin,
  createUserProfileDocument
} from './firebase';

export {
  FirebaseContext,
  auth,
  firestore,
  createNewUser,
  createNewUserAsAdmin,
  createUserProfileDocument
};

export default firebase;
