import React from 'react';
import ScreenEditListItem from '../screens/ScreenEditListItem';
import {Todo} from '../store/todoStore';
import {useRoute} from '@react-navigation/native';
import {ref, set} from 'firebase/database';
import {db} from '../config/firebase';
import useAuthStore from '../store/authStore';

const ModalEditCloudTodo = () => {
  const {listItem} = useRoute().params as {listItem: Todo};
  const {user} = useAuthStore();

  const updateItem = (
    id: string,
    title: string,
    description: string,
    date: Date | undefined,
    time: Date | undefined,
  ) => {
    const item = {
      ...listItem,
      title,
      description,
      date: date ? new Date(date)?.toUTCString() : null,
      time: time ? new Date(time)?.toUTCString() : null,
    };
    const timeRef = ref(db, 'lists/' + user?.uid + '/todos/' + id);
    set(timeRef, item);
  };

  return (
    <ScreenEditListItem
      updateDate={() => {}}
      updateTime={() => {}}
      listItem={listItem}
      updateItem={updateItem}
    />
  );
};

export default ModalEditCloudTodo;
