import React from 'react';
import useTodoStore from '../store/todoStore';
import ScreenAddListItem from '../screens/ScreenAddListItem';

const ModalAddTodo = () => {
  const {
    newTodoTitle,
    newTodoDescription,
    newTodoDate,
    newTodoTime,
    setNewTodoTitle,
    setNewTodoDescription,
    setNewTodoDate,
    setNewTodoTime,
    addTodo,
  } = useTodoStore();

  return (
    <ScreenAddListItem
      newTitle={newTodoTitle}
      newDescription={newTodoDescription}
      newDate={newTodoDate}
      newTime={newTodoTime}
      setNewTitle={setNewTodoTitle}
      setNewDescription={setNewTodoDescription}
      setNewDate={setNewTodoDate}
      setNewTime={setNewTodoTime}
      addListItem={addTodo}
    />
  );
};

export default ModalAddTodo;
