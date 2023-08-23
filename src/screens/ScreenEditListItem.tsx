import React, {useState} from 'react';
import {View} from 'react-native';
import {HStack, VStack} from '@react-native-material/core';
import {Appbar, Text, TextInput, useTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';
import DismissKeyboardWithAvoidingView from '../hocs/DismissKeyboardWithAvoidingView';
import type {Todo} from '../store/todoStore';
import type {Tobuy} from '../store/tobuyStore';
import {Switch} from 'react-native-gesture-handler';

type ScreenEditListItemProps = {
  updateTitle: (id: number, title: string) => void;
  updateDescription: (id: number, description: string) => void;
  updateDate?: (id: number, date: Date | undefined) => void;
  updateTime?: (id: number, time: Date | undefined) => void;
  list: Todo[] | Tobuy[];
};

const ScreenEditListItem = ({
  updateTitle,
  updateDescription,
  updateDate,
  updateTime,
  list,
}: ScreenEditListItemProps) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const {id} = useRoute().params as {id: number};

  const listItem = list.filter(
    item => item.id.toString() === id?.toString(),
  )[0];

  const [title, setTitle] = useState(listItem.title);
  const [description, setDescription] = useState(listItem.description);
  const [date, setDate] = useState('date' in listItem && listItem.date);
  const [time, setTime] = useState('time' in listItem && listItem.time);

  const [applyDate, setApplyDate] = useState(!!date);
  const [applyTime, setApplyTime] = useState(!!time);

  return (
    <DismissKeyboardWithAvoidingView>
      <View style={{flex: 1}}>
        <Appbar
          mode="center-aligned"
          style={{backgroundColor: theme.colors.primary}}>
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
              updateTitle(Number(id), title);
              updateDescription(Number(id), description);
              updateDate && updateDate(Number(id), date as Date | undefined);
              updateTime && updateTime(Number(id), time as Date | undefined);
              navigation.goBack();
            }}
            style={{
              right: -80,
            }}
          />
        </Appbar>
        <VStack
          pv={16}
          spacing={16}
          ph={16}
          fill
          style={{backgroundColor: theme.colors.background}}>
          <HStack items="center">
            <TextInput
              label={'Title'}
              onChangeText={text => setTitle(text)}
              value={title as string}
              mode="outlined"
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.background,
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
                backgroundColor: theme.colors.background,
              }}
              multiline
            />
          </HStack>
          {updateDate && (
            <HStack items="center" justify="between">
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.onBackground,
                }}>
                Date
              </Text>
              <DateTimePicker
                value={new Date((date as Date) || Date.now())}
                mode={'date'}
                is24Hour={true}
                display="spinner"
                style={{
                  height: 120,
                  width: 250,
                }}
                onChange={(e, value) => {
                  setDate(value);
                }}
                disabled={!applyDate}
              />
              <Switch
                value={applyDate}
                onValueChange={value => {
                  setApplyDate(value);
                  if (!value) {
                    setDate(undefined);
                  }
                }}
              />
            </HStack>
          )}
          {updateTime && (
            <HStack items="center" justify="between">
              <Text
                style={{
                  fontSize: 18,
                  color: theme.colors.onBackground,
                }}>
                Time
              </Text>
              <DateTimePicker
                value={new Date((time as Date) || Date.now())}
                mode={'time'}
                is24Hour={true}
                display={'spinner'}
                style={{
                  height: 120,
                  width: 250,
                }}
                onChange={(e, value) => {
                  setTime(value);
                }}
                disabled={!applyTime}
              />
              <Switch
                value={applyTime}
                onValueChange={value => {
                  setApplyTime(value);
                  if (!value) {
                    setTime(undefined);
                  }
                }}
              />
            </HStack>
          )}
        </VStack>
      </View>
    </DismissKeyboardWithAvoidingView>
  );
};

export default ScreenEditListItem;
