import React from 'react';
import ScreenEditListItem from '../screens/ScreenEditListItem';
import {Todo} from '../store/todoStore';
import {useRoute} from '@react-navigation/native';
import {ref, set} from 'firebase/database';
import {db} from '../config/firebase';
import {useAuthentication} from '../hooks/useAuthentication';

const ModalEditCloudTodo = () => {
  const {listItem} = useRoute().params as {listItem: Todo};
  const {user} = useAuthentication();

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
      updateItem={updateItem}
    />
  );
};

export default ModalEditCloudTodo;
