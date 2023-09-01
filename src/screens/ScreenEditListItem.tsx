import React, {useState} from 'react';
import {View} from 'react-native';
import {HStack, VStack} from '@react-native-material/core';
import {Appbar, TextInput, useTheme} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import DismissKeyboardWithAvoidingView from '../hocs/DismissKeyboardWithAvoidingView';
import type {Todo} from '../store/todoStore';
import type {Tobuy} from '../store/tobuyStore';
import DateTimeCustomPicker from '../components/DateTimeCustomPicker';

type ScreenEditListItemProps = {
  updateTitle?: (id: number, title: string) => void;
  updateDescription?: (id: number, description: string) => void;
  updateDate?: (id: number, date: Date | undefined) => void;
  updateTime?: (id: number, time: Date | undefined) => void;
  listItem: Todo | Tobuy;
  updateItem?: (
    id: string,
    title: string,
    description: string,
    date: Date | undefined,
    time: Date | undefined,
  ) => void;
};

const ScreenEditListItem = ({
  updateTitle,
  updateDescription,
  updateDate,
  updateTime,
  updateItem,
}: ScreenEditListItemProps) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const {id, listItem} = useRoute().params as {
    id: number | string;
    listItem: Todo | Tobuy;
  };

  const [title, setTitle] = useState(listItem.title);
  const [description, setDescription] = useState(listItem.description);
  const [date, setDate] = useState('date' in listItem && listItem.date);
  const [time, setTime] = useState('time' in listItem && listItem.time);

  const [applyDate, setApplyDate] = useState(!!date);
  const [applyTime, setApplyTime] = useState(!!time);

  return (
    <DismissKeyboardWithAvoidingView>
      <View style={{flex: 1}}>
        <VStack
          pv={80}
          spacing={16}
          ph={16}
          fill
          style={{backgroundColor: theme.colors.surface}}>
          <HStack items="center">
            <TextInput
              numberOfLines={1}
              label={'Title'}
              onChangeText={text => setTitle(text)}
              value={title as string}
              mode="outlined"
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.surface,
              }}
              autoFocus
            />
          </HStack>
          <HStack items="center">
            <TextInput
              label={'Description'}
              onChangeText={text => setDescription(text)}
              value={description as string}
              mode="outlined"
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.surface,
              }}
              multiline
            />
          </HStack>
          {updateDate && (
            <DateTimeCustomPicker
              mode="date"
              value={date as Date}
              onChange={setDate}
              apply={applyDate}
              onApplyChange={value => {
                setApplyDate(value);
                if (!value) {
                  setDate(undefined);
                } else {
                  setDate(new Date(Date.now()));
                }
              }}
            />
          )}
          {updateTime && (
            <DateTimeCustomPicker
              mode="time"
              value={time as Date}
              onChange={setTime}
              apply={applyTime}
              onApplyChange={value => {
                setApplyTime(value);
                if (!value) {
                  setTime(undefined);
                } else {
                  setTime(new Date(Date.now()));
                }
              }}
            />
          )}
        </VStack>
        <Appbar
          elevated
          mode="center-aligned"
          style={{
            backgroundColor: theme.colors.primary,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}>
          <Appbar.Content
            title={'Cancel'}
            color={theme.colors.onPrimary}
            onPress={() => navigation.goBack()}
            style={{
              left: -80,
            }}
          />
          <Appbar.Content
            title={'Save'}
            color={theme.colors.onPrimary}
            onPress={() => {
              if (updateItem) {
                updateItem(
                  String(id),
                  title,
                  description,
                  date as Date | undefined,
                  time as Date | undefined,
                );
              } else {
                updateTitle!(Number(id), title);
                updateDescription!(Number(id), description);
                updateDate && updateDate(Number(id), date as Date | undefined);
                updateTime && updateTime(Number(id), time as Date | undefined);
              }
              navigation.goBack();
            }}
            style={{
              right: -80,
            }}
          />
        </Appbar>
      </View>
    </DismissKeyboardWithAvoidingView>
  );
};

export default ScreenEditListItem;
