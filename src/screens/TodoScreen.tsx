import React from 'react';
import useTodoStore from '../store/todoStore';
import ScreenList, {Item} from './ScreenList';

export default function TodoScreen() {
  const {
    setDoneHidden,
    setColorFilter,
    doneHidden,
    colorFilter,
    todos,
    remove,
    toggle,
    updateColor,
    setList,
  } = useTodoStore();

  return (
    <ScreenList
      doneHidden={doneHidden}
      colorFilter={colorFilter}
      setDoneHidden={setDoneHidden}
      setColorFilter={setColorFilter}
      headerTitle="ToDo"
      list={todos}
      addToListRoute="addTodo"
      editListItemRoute="editTodo"
      remove={remove}
      toggle={toggle}
      updateColor={updateColor}
      setList={setList as (list: Item[]) => void}
    />
  );
}
