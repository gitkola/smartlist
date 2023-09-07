import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import colorSchemas, {ThemeColors} from '../utils/colorSchemas';

type Store = {
  colors: ThemeColors;
  setTheme: (themeColors: ThemeColors) => void;
};

const useSettingsTheme = create<Store, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      colors: {
        ...colorSchemas[0],
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
