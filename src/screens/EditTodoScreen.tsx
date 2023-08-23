import React from 'react';
import ScreenEditListItem from '../screens/ScreenEditListItem';
import useTodoStore from '../store/todoStore';

const ModalEditTodo = () => {
  const {updateTitle, updateDescription, updateDate, updateTime, todos} =
    useTodoStore();

  return (
    <ScreenEditListItem
      updateTitle={updateTitle}
      updateDescription={updateDescription}
      updateDate={updateDate}
      updateTime={updateTime}
      list={todos}
    />
  );
};

export default ModalEditTodo;
