import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type ThemeColors = {
  id: number;
  primary: string;
  secondary: string;
  background: string;
  surface: string;
};

type Store = {
  colors: ThemeColors;
  setTheme: (themeColors: ThemeColors) => void;
};

const useSettingsTheme = create<Store, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      colors: {
        id: 0,
        primary: '#6527BE',
        secondary: '#45CFDD',
        surface: '#FFFFFF',
        background: '#DDDDDD',
      },
      setTheme(themeColors: ThemeColors) {
        set((state: Store) => ({
          ...state,
          colors: {
            ...themeColors,
          },
        }));
      },
    }),
    {
      name: 'theme-settings',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useSettingsTheme;
