import React from 'react';
import {VStack} from '@react-native-material/core';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Appbar, FAB, useTheme, Menu} from 'react-native-paper';
import {Platform, StatusBar} from 'react-native';
import type {Todo} from '../store/todoStore';
import type {Tobuy} from '../store/tobuyStore';
import {useState} from 'react';
import ColorCircle from '../components/ColorCircle';
import ColorCircleContainer from '../components/ColorCircleContainer';
import colors from '../utils/colors';
import List from '../components/List';
import {Share} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';

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
};

const generateShareMessage = (headerTitle: string, list: Item[]) =>
  `${headerTitle} (${list.length})\n${list
    .map(item => {
      if ('date' in item) {
        return (
          (item.done ? '\u2611' : '\u2610') +
          ' ' +
          item.title +
          (item.description ? '\n' + item.description : '') +
          (item?.date
            ? '\n' +
              new Date(item?.date as unknown as string).toLocaleDateString()
            : '') +
          (item.time ? ' ' + item.time?.toLocaleTimeString() : '') +
          '\n'
        );
      } else {
        return (
          (item.done ? '\u2611' : '\u2610') +
          ' ' +
          item.title +
          (item.description ? '\n' + item.description : '') +
          '\n'
        );
      }
    })
    .join('')}`;

const renderColorCircle = (colorFilter: string) => (
  <ColorCircle color={colorFilter} />
);

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
}: ScreenListProps) {
  const navigation = useNavigation();
  const {top} = useSafeAreaInsets();
  const theme = useTheme();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const doneFiltered = doneHidden ? list.filter(item => !item.done) : list;
  const colorAndDoneFiltered =
    colorFilter !== 'transparent'
      ? doneFiltered.filter(item => item.color === colorFilter)
      : doneFiltered;

  return (
    <VStack fill style={{backgroundColor: theme.colors.background}}>
      <List
        list={colorAndDoneFiltered}
        editListItemRoute={editListItemRoute}
        remove={remove}
        toggle={toggle}
        updateColor={updateColor}
        setList={setList}
      />
      <StatusBar barStyle={'light-content'} />
      <Appbar
        elevated
        safeAreaInsets={{top}}
        style={{
          height: Platform.OS === 'ios' ? 90 : 60,
          backgroundColor: theme.colors.primary,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}>
        <Appbar.Action
          icon={'menu'}
          iconColor={theme.colors.onPrimary}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
        <Appbar.Content
          title={`${headerTitle} (${list.length})`}
          color={theme.colors.onPrimary}
        />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action
              icon={() => renderColorCircle(colorFilter)}
              onPress={openMenu}
            />
          }
          anchorPosition="bottom"
          contentStyle={{left: 2, bottom: 10}}>
          {colors.map((color: string) => (
            <ColorCircleContainer
              children={
                <ColorCircle
                  onPress={() => {
                    setColorFilter(color);
                    closeMenu();
                  }}
                  color={color}
                />
              }
              key={color}
            />
          ))}
        </Menu>
        <Appbar.Action
          icon={!doneHidden ? 'filter-outline' : 'filter-off-outline'}
          iconColor={theme.colors.onPrimary}
          onPress={() => setDoneHidden(!doneHidden)}
        />
        <Appbar.Action
          icon={'share-outline'}
          iconColor={theme.colors.onPrimary}
          onPress={() => {
            const message = generateShareMessage(
              headerTitle,
              colorAndDoneFiltered,
            );
            Share.share({
              title: `${headerTitle} (${colorAndDoneFiltered.length})`,
              message,
            });
          }}
        />
      </Appbar>
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
