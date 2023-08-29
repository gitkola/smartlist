import React, {useState} from 'react';
import {View} from 'react-native';
import {HStack, VStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {Appbar, TextInput, useTheme} from 'react-native-paper';
import DismissKeyboardWithAvoidingView from '../hocs/DismissKeyboardWithAvoidingView';
import DateTimeCustomPicker from '../components/DateTimeCustomPicker';

type ScreenAddListItemProps = {
  newTitle: string;
  newDescription: string;
  newDate?: Date | undefined;
  newTime?: Date | undefined;
  setNewTitle: (title: string) => void;
  setNewDescription: (description: string) => void;
  setNewDate?: (date: Date | undefined) => void;
  setNewTime?: (time: Date | undefined) => void;
  addListItem: () => void;
};

const ScreenAddListItem = ({
  newTitle,
  newDescription,
  newDate,
  newTime,
  setNewTitle,
  setNewDescription,
  setNewDate,
  setNewTime,
  addListItem,
}: ScreenAddListItemProps) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [applyDate, setApplyDate] = useState(false);
  const [applyTime, setApplyTime] = useState(false);

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
              onChangeText={text => setNewTitle(text)}
              value={newTitle}
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
              onChangeText={text => setNewDescription(text)}
              value={newDescription}
              mode="outlined"
              style={{
                flex: 1,
                fontSize: 18,
                backgroundColor: theme.colors.surface,
              }}
              multiline
            />
          </HStack>
          {setNewDate && (
            <DateTimeCustomPicker
              mode="date"
              value={newDate as Date}
              onChange={setNewDate}
              apply={applyDate}
              onApplyChange={value => {
                setApplyDate(value);
                if (!value) {
                  setNewDate(undefined);
                } else {
                  setNewDate(new Date(Date.now()));
                }
              }}
            />
          )}
          {setNewTime && (
            <DateTimeCustomPicker
              mode="time"
              value={newTime as Date}
              onChange={setNewTime}
              apply={applyTime}
              onApplyChange={value => {
                setApplyTime(value);
                if (!value) {
                  setNewTime(undefined);
                } else {
                  setNewTime(new Date(Date.now()));
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
            title={'Add'}
            color={theme.colors.onPrimary}
            onPress={() => {
              addListItem();
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

export default ScreenAddListItem;
