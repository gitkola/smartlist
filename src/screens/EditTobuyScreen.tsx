import React from 'react';
import ScreenEditListItem from '../screens/ScreenEditListItem';
import useTobuyStore from '../store/tobuyStore';

const ModalEditTobuy = () => {
  const {updateTitle, updateDescription, tobuys} = useTobuyStore();

  return (
    <ScreenEditListItem
      updateTitle={updateTitle}
      updateDescription={updateDescription}
      list={tobuys}
    />
  );
};

export default ModalEditTobuy;
