import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type ThemeColors = {
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
        // primary: '#A4D0A4',
        // secondary: '#617A55',
        // background: '#FFF8D6',
        // surface: '#F7E1AE',
        primary: '#8B1874',
        secondary: '#B71375',
        background: '#FC4F00',
        surface: '#F79540',
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
