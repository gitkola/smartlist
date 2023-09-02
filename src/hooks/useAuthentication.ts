import React from 'react';
import {onAuthStateChanged, User} from 'firebase/auth';
import {auth} from '../config/firebase';

export function useAuthentication() {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, data => {
      setUser(data);
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {user};
}
