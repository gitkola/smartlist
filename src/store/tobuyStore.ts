import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface Tobuy {
  id: number;
  title: string;
  description: string;
  done: boolean;
  color: string;
}

const updateTobuyTitle = (
  tobuys: Tobuy[],
  id: number,
  title: string,
): Tobuy[] =>
  tobuys.map(todo => ({
    ...todo,
    title: todo.id === id ? title : todo.title,
  }));

const updateTobuyDescription = (
  tobuys: Tobuy[],
  id: number,
  description: string,
): Tobuy[] =>
  tobuys.map(todo => ({
    ...todo,
    description: todo.id === id ? description : todo.description,
  }));

const updateTobuyColor = (
  tobuys: Tobuy[],
  id: number,
  color: string,
): Tobuy[] =>
  tobuys.map(todo => ({
    ...todo,
    color: todo.id === id ? color : todo.color,
  }));

const toggleTobuy = (tobuys: Tobuy[], id: number): Tobuy[] =>
  tobuys.map(todo => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTobuy = (tobuys: Tobuy[], id: number): Tobuy[] =>
  tobuys.filter(todo => todo.id !== id);

const addTobuy = (
  tobuys: Tobuy[],
  title: string,
  description: string,
): Tobuy[] => [
  ...tobuys,
  {
    id: Math.max(0, Math.max(...tobuys.map(({id}) => id))) + 1,
    title,
    description,
    done: false,
    color: 'transparent',
  },
];

type Store = {
  tobuys: Tobuy[];
  newTobuyTitle: string;
  newTobuyDescription: string;
  doneHidden: boolean;
  colorFilter: string;
  addTobuy: () => void;
  setNewTobuyTitle: (title: string) => void;
  setNewTobuyDescription: (description: string) => void;
  updateTitle: (id: number, title: string) => void;
  updateDescription: (id: number, description: string) => void;
  updateColor: (id: number, color: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  setList: (tobuys: Tobuy[]) => void;
  setDoneHidden: (hidden: boolean) => void;
  setColorFilter: (color: string) => void;
};

const useTobuyStore = create<Store, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      tobuys: [],
      newTobuyTitle: '',
      newTobuyDescription: '',
      doneHidden: false,
      colorFilter: 'transparent',
      addTobuy() {
        set((state: Store) => {
          if (state.newTobuyTitle === '') {
            return state;
          }
          return {
            ...state,
            tobuys: addTobuy(
              state.tobuys,
              state.newTobuyTitle,
              state.newTobuyDescription,
            ),
            newTobuyTitle: '',
            newTobuyDescription: '',
            newTodoDate: undefined,
            newTodoTime: {hours: 0, minutes: 0},
          };
        });
      },
      setNewTobuyTitle(title: string) {
        set((state: Store) => ({
          ...state,
          newTobuyTitle: title,
        }));
      },
      setNewTobuyDescription(description: string) {
        set((state: Store) => ({
          ...state,
          newTobuyDescription: description,
        }));
      },
      updateTitle(id: number, title: string) {
        set((state: Store) => ({
          ...state,
          tobuys: updateTobuyTitle(state.tobuys, id, title),
        }));
      },
      updateDescription(id: number, description: string) {
        set((state: Store) => ({
          ...state,
          tobuys: updateTobuyDescription(state.tobuys, id, description),
        }));
      },
      updateColor(id: number, color: string) {
        set((state: Store) => ({
          ...state,
          tobuys: updateTobuyColor(state.tobuys, id, color),
        }));
      },
      toggle(id: number) {
        set((state: Store) => ({
          ...state,
          tobuys: toggleTobuy(state.tobuys, id),
        }));
      },
      remove(id: number) {
        set((state: Store) => ({
          ...state,
          tobuys: removeTobuy(state.tobuys, id),
        }));
      },
      setList(tobuys: Tobuy[]) {
        set((state: Store) => ({
          ...state,
          tobuys,
        }));
      },
      setDoneHidden(hidden: boolean) {
        set((state: Store) => ({
          ...state,
          doneHidden: hidden,
        }));
      },
      setColorFilter(color: string) {
        set((state: Store) => ({
          ...state,
          colorFilter: color,
        }));
      },
    }),
    {
      name: 'tobuy-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useTobuyStore;
