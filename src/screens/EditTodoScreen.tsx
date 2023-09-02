import React from 'react';
import ScreenEditListItem from '../screens/ScreenEditListItem';
import useTodoStore from '../store/todoStore';

const ModalEditTodo = () => {
  const {updateTitle, updateDescription, updateDate, updateTime} =
    useTodoStore();

  return (
    <ScreenEditListItem
      updateTitle={updateTitle}
      updateDescription={updateDescription}
      updateDate={updateDate}
      updateTime={updateTime}
    />
  );
};

export default ModalEditTodo;
