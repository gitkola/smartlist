import React from 'react';
import useTobuyStore from '../store/tobuyStore';
import ScreenList from '../screens/ScreenList';

export default function TobuyScreen() {
  const {
    setDoneHidden,
    setColorFilter,
    doneHidden,
    colorFilter,
    tobuys,
    remove,
    toggle,
    updateColor,
    setList,
  } = useTobuyStore();

  return (
    <ScreenList
      doneHidden={doneHidden}
      colorFilter={colorFilter}
      setDoneHidden={setDoneHidden}
      setColorFilter={setColorFilter}
      headerTitle="ToBuy"
      list={tobuys}
      addToListRoute="addTobuy"
      editListItemRoute="editTobuy"
      remove={remove}
      toggle={toggle}
      updateColor={updateColor}
      setList={setList}
    />
  );
}
