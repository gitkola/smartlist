import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {User} from 'firebase/auth';

type Store = {
  user: User | undefined;
  setUser: (value: User) => void;
};

const useAuthStore = create<Store, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      user: undefined,
      setUser(value: User) {
        set((state: Store) => ({
          ...state,
          user: value,
        }));
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useAuthStore;
