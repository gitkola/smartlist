import React from 'react';
import useTobuyStore from '../store/tobuyStore';
import ScreenAddListItem from '../screens/ScreenAddListItem';

const ModalAddTobuy = () => {
  const {
    newTobuyTitle,
    newTobuyDescription,
    setNewTobuyTitle,
    setNewTobuyDescription,
    addTobuy,
  } = useTobuyStore();

  return (
    <ScreenAddListItem
      newTitle={newTobuyTitle}
      newDescription={newTobuyDescription}
      setNewTitle={setNewTobuyTitle}
      setNewDescription={setNewTobuyDescription}
      addListItem={addTobuy}
    />
  );
};

export default ModalAddTobuy;
