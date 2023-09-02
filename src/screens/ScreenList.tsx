import React from 'react';
import {VStack} from '@react-native-material/core';
import {FAB, useTheme, ActivityIndicator} from 'react-native-paper';
import {Platform, StatusBar} from 'react-native';
import type {Todo} from '../store/todoStore';
import type {Tobuy} from '../store/tobuyStore';
import List from '../components/List';
import {useNavigation} from '@react-navigation/native';
import HeaderScreenList from '../components/HeaderScreenList';

export type Item = Todo | Tobuy;

type ScreenListProps = {
  setDoneHidden: (doneHidden: boolean) => void;
  setColorFilter: (colorFilter: string) => void;
  doneHidden: boolean;
  colorFilter: string;
  headerTitle: string;
  list: Item[];
  addToListRoute: string;
  editListItemRoute: string;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  updateColor: (id: number, color: string) => void;
  setList: (list: Item[]) => void;
  isLoading?: boolean;
};

export default function ScreenList({
  setDoneHidden,
  setColorFilter,
  doneHidden,
  colorFilter,
  headerTitle,
  list,
  addToListRoute,
  editListItemRoute,
  remove,
  toggle,
  updateColor,
  setList,
  isLoading,
}: ScreenListProps) {
  const navigation = useNavigation();
  const theme = useTheme();

  const doneFiltered = doneHidden ? list.filter(item => !item.done) : list;
  const colorAndDoneFiltered =
    colorFilter !== 'transparent'
      ? doneFiltered.filter(item => item.color === colorFilter)
      : doneFiltered;

  return (
    <VStack fill style={{backgroundColor: theme.colors.background}}>
      {isLoading && (
        <ActivityIndicator
          animating={true}
          size={'large'}
          style={{marginTop: Platform.OS === 'ios' ? 126 : 76}}
          color={theme.colors.secondary}
        />
      )}
      <List
        list={colorAndDoneFiltered}
        editListItemRoute={editListItemRoute}
        remove={remove}
        toggle={toggle}
        updateColor={updateColor}
        setList={setList}
      />
      <StatusBar barStyle={'light-content'} />
      <HeaderScreenList
        headerTitle={headerTitle}
        listLength={list.length}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
        doneHidden={doneHidden}
        setDoneHidden={setDoneHidden}
        colorAndDoneFiltered={colorAndDoneFiltered}
      />
      <FAB
        mode="elevated"
        icon={'plus'}
        customSize={64}
        color={theme.colors.onPrimary}
        onPress={() => navigation.navigate(addToListRoute as never)}
        style={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          borderRadius: 60,
          backgroundColor: theme.colors.secondary,
        }}
      />
    </VStack>
  );
}
