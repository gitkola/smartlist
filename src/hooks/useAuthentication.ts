import React from 'react';
import {getAuth, onAuthStateChanged, User} from 'firebase/auth';
import useAuthStore from '../store/authStore';

const auth = getAuth();

export function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const authStore = useAuthStore();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, data => {
      if (data) {
        setUser(data);
        authStore.setUser(data);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, [authStore]);

  return {
    user: user || authStore.user,
  };
}
