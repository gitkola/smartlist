import React, {useState} from 'react';
import {ref, push, set} from 'firebase/database';
import {db} from '../config/firebase';
import ScreenAddListItem from '../screens/ScreenAddListItem';
import useAuthStore from '../store/authStore';

const ModalAddCloudTodo = () => {
  const {user} = useAuthStore();
  const [newTodoTitle, setNewTodoTitle] = useState<string>();
  const [newTodoDescription, setNewTodoDescription] = useState<string>();
  const [newTodoDate, setNewTodoDate] = useState<Date>();
  const [newTodoTime, setNewTodoTime] = useState<Date>();

  const addCloudTodo = () => {
    if (!newTodoTitle) {
      return;
    }

    const todosRef = ref(db, `lists/${user?.uid}/todos`);
    const newToDoRef = push(todosRef);
    set(newToDoRef, {
      id: newToDoRef.key,
      title: newTodoTitle as string,
      description: newTodoDescription || '',
      date: newTodoDate?.toUTCString() || null,
      time: newTodoTime?.toUTCString() || null,
      done: false,
      color: 'transparent',
    });
  };

  return (
    <ScreenAddListItem
      newTitle={newTodoTitle as string}
      newDescription={newTodoDescription as string}
      newDate={newTodoDate}
      newTime={newTodoTime}
      setNewTitle={setNewTodoTitle}
      setNewDescription={setNewTodoDescription}
      setNewDate={setNewTodoDate}
      setNewTime={setNewTodoTime}
      addListItem={addCloudTodo}
    />
  );
};

export default ModalAddCloudTodo;
