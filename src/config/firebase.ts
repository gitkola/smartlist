import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAK0ESZ1QSoJCmpiELmt-ivTNEiYENMuhM',
  authDomain: 'todotobuy-41a4d.firebaseapp.com',
  projectId: 'todotobuy-41a4d',
  storageBucket: 'todotobuy-41a4d.appspot.com',
  messagingSenderId: '91544492510',
  appId: '1:91544492510:web:bb52caf6686f253f2be54f',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(
  app,
  'https://todotobuy-41a4d-default-rtdb.europe-west1.firebasedatabase.app/',
);
export default app;
