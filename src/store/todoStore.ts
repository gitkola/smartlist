import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface Todo {
  id: number;
  title: string;
  description: string;
  date: Date | undefined;
  time: Date | undefined;
  done: boolean;
  color: string;
}

// export interface Time extends Date {
//   // hours: number;
//   // minutes: number;
// }

const updateTodoTitle = (todos: Todo[], id: number, title: string): Todo[] =>
  todos.map(todo => ({
    ...todo,
    title: todo.id === id ? title : todo.title,
  }));

const updateTodoDescription = (
  todos: Todo[],
  id: number,
  description: string,
): Todo[] =>
  todos.map(todo => ({
    ...todo,
    description: todo.id === id ? description : todo.description,
  }));

const updateTodoDate = (
  todos: Todo[],
  id: number,
  date: Date | undefined,
): Todo[] =>
  todos.map(todo => ({
    ...todo,
    date: todo.id === id ? date : todo.date,
  }));

const updateTodoTime = (
  todos: Todo[],
  id: number,
  time: Date | undefined,
): Todo[] =>
  todos.map(todo => ({
    ...todo,
    time: todo.id === id ? time : todo.time,
  }));

const updateTodoColor = (todos: Todo[], id: number, color: string): Todo[] =>
  todos.map(todo => ({
    ...todo,
    color: todo.id === id ? color : todo.color,
  }));

const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map(todo => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter(todo => todo.id !== id);

const addTodo = (
  todos: Todo[],
  title: string,
  description: string,
  date: Date | undefined,
  time: Date | undefined,
): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({id}) => id))) + 1,
    title,
    description,
    date,
    time,
    done: false,
    color: 'transparent',
  },
];

type Store = {
  todos: Todo[];
  newTodoTitle: string;
  newTodoDescription: string;
  newTodoDate: undefined | Date;
  newTodoTime: undefined | Date;
  doneHidden: boolean;
  colorFilter: string;
  addTodo: () => void;
  setNewTodoTitle: (title: string) => void;
  setNewTodoDescription: (description: string) => void;
  setNewTodoDate: (date: Date | undefined) => void;
  setNewTodoTime: (time: Date | undefined) => void;
  updateTitle: (id: number, title: string) => void;
  updateDescription: (id: number, description: string) => void;
  updateDate: (id: number, date: Date | undefined) => void;
  updateTime: (id: number, time: Date | undefined) => void;
  updateColor: (id: number, color: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
  setList: (todos: Todo[]) => void;
  setDoneHidden: (hidden: boolean) => void;
  setColorFilter: (color: string) => void;
};

const useTodoStore = create<Store, [['zustand/persist', unknown]]>(
  persist(
    set => ({
      todos: [],
      newTodoTitle: '',
      newTodoDescription: '',
      newTodoDate: undefined,
      newTodoTime: undefined,
      doneHidden: false,
      colorFilter: 'transparent',
      addTodo() {
        set((state: Store) => {
          if (state.newTodoTitle === '') {
            return state;
          }
          return {
            ...state,
            todos: addTodo(
              state.todos,
              state.newTodoTitle,
              state.newTodoDescription,
              state.newTodoDate,
              state.newTodoTime,
            ),
            newTodoTitle: '',
            newTodoDescription: '',
            newTodoDate: undefined,
            newTodoTime: undefined,
          };
        });
      },
      setNewTodoTitle(title: string) {
        set((state: Store) => ({
          ...state,
          newTodoTitle: title,
        }));
      },
      setNewTodoDescription(description: string) {
        set((state: Store) => ({
          ...state,
          newTodoDescription: description,
        }));
      },
      setNewTodoDate(date: Date | undefined) {
        set((state: Store) => ({
          ...state,
          newTodoDate: date,
        }));
      },
      setNewTodoTime(time: Date | undefined) {
        set((state: Store) => ({
          ...state,
          newTodoTime: time,
        }));
      },
      updateTitle(id: number, title: string) {
        set((state: Store) => ({
          ...state,
          todos: updateTodoTitle(state.todos, id, title),
        }));
      },
      updateDescription(id: number, description: string) {
        set((state: Store) => ({
          ...state,
          todos: updateTodoDescription(state.todos, id, description),
        }));
      },
      updateDate(id: number, date: Date | undefined) {
        set((state: Store) => ({
          ...state,
          todos: updateTodoDate(state.todos, id, date),
        }));
      },
      updateTime(id: number, time: Date | undefined) {
        set((state: Store) => ({
          ...state,
          todos: updateTodoTime(state.todos, id, time),
        }));
      },
      updateColor(id: number, color: string) {
        set((state: Store) => ({
          ...state,
          todos: updateTodoColor(state.todos, id, color),
        }));
      },
      toggle(id: number) {
        set((state: Store) => ({
          ...state,
          todos: toggleTodo(state.todos, id),
        }));
      },
      remove(id: number) {
        set((state: Store) => ({
          ...state,
          todos: removeTodo(state.todos, id),
        }));
      },
      setList(todos: Todo[]) {
        set((state: Store) => ({
          ...state,
          todos,
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
      name: 'todo-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useTodoStore;
