import React, {useState} from 'react';
import {View, StatusBar} from 'react-native';
import {HStack, VStack} from '@react-native-material/core';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput, useTheme} from 'react-native-paper';
import DismissKeyboardWithAvoidingView from '../hocs/DismissKeyboardWithAvoidingView';
import DateTimeCustomPicker from '../components/DateTimeCustomPicker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HeaderScreenAddOrEdit from '../components/HeaderScreenAddOrEdit';

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
  const {top} = useSafeAreaInsets();

  const [applyDate, setApplyDate] = useState(false);
  const [applyTime, setApplyTime] = useState(false);

  return (
    <DismissKeyboardWithAvoidingView>
      <View style={{flex: 1}}>
        <StatusBar barStyle={'light-content'} />
        <VStack
          pv={80 + top}
          spacing={16}
          ph={16}
          fill
          style={{backgroundColor: theme.colors.surface}}>
          <HStack items="center">
            <TextInput
              activeOutlineColor={theme.colors.secondary}
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
              activeOutlineColor={theme.colors.secondary}
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
          <VStack items="center">
            <Button
              icon="camera"
              mode="contained"
              onPress={() => navigation.navigate('camera' as never)}
              style={{
                width: 200,
              }}>
              Open Camera
            </Button>
          </VStack>
        </VStack>
        <HeaderScreenAddOrEdit
          leftTitle="Cancel"
          leftOnPress={navigation.goBack}
          rightTitle="Add"
          rightOnPress={() => {
            addListItem();
            navigation.goBack();
          }}
        />
      </View>
    </DismissKeyboardWithAvoidingView>
  );
};

export default ScreenAddListItem;
