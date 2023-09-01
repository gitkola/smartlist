import React, {useEffect, useState} from 'react';
import ScreenList from './ScreenList';
import useAuthStore from '../store/authStore';
import {ref, set, onValue} from 'firebase/database';
import {db} from '../config/firebase';
import {Todo} from '../store/todoStore';

type ToDoList = {
  doneHidden: boolean;
  colorFilter: string;
  todos: {[key: string]: Todo};
};

export default function CloudTodoScreen() {
  const {user} = useAuthStore();
  const [value, setValue] = useState<ToDoList>();
  useEffect(() => {
    const dataRef = ref(db, 'lists/' + user?.uid);
    onValue(dataRef, snapshot => {
      const data = snapshot.val();
      setValue(data);
    });
  }, [user?.uid]);

  const setDoneHidden = () => {
    const doneHiddenRef = ref(db, 'lists/' + user?.uid + '/doneHidden');
    set(doneHiddenRef, !value?.doneHidden);
  };

  const setColorFilter = (color: string) => {
    const colorFilterRef = ref(db, 'lists/' + user?.uid + '/colorFilter');
    set(colorFilterRef, color);
  };

  const remove = (id: number | string) => {
    const removeRef = ref(db, 'lists/' + user?.uid + '/todos/' + id);
    set(removeRef, null);
  };

  const toggle = (id: number | string) => {
    const doneRef = ref(db, 'lists/' + user?.uid + '/todos/' + id + '/done');
    set(doneRef, !value?.todos[id].done);
  };

  const updateColor = (id: number | string, color: string) => {
    const colorRef = ref(db, 'lists/' + user?.uid + '/todos/' + id + '/color');
    set(colorRef, color);
  };

  const setList = (list: Todo[]) => {
    const todosRef = ref(db, 'lists/' + user?.uid + '/todos');
    const listObj = list.reduce<{[key: string]: Todo}>(
      (prevValue, current, currentIndex) => {
        prevValue[current.id] = {...current, index: currentIndex};
        return prevValue;
      },
      {},
    );
    set(todosRef, listObj);
  };

  return (
    <ScreenList
      doneHidden={value?.doneHidden || false}
      colorFilter={value?.colorFilter || 'transparent'}
      setDoneHidden={setDoneHidden}
      setColorFilter={setColorFilter}
      headerTitle="CloudToDo"
      list={
        value?.todos
          ? Object.keys(value.todos || {})
              .map((key: string) => value.todos[key])
              // @ts-ignore
              .sort((a, b) => a.index - b.index)
          : []
      }
      addToListRoute="addTodo"
      editListItemRoute="editTodo"
      remove={remove}
      toggle={toggle}
      updateColor={updateColor}
      setList={setList}
    />
  );
}
