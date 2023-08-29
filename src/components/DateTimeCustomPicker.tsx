import React from 'react';
import {HStack} from '@react-native-material/core';
import {Text, useTheme} from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import {Switch} from 'react-native-gesture-handler';
import {Platform} from 'react-native';

export default function DateTimeCustomPicker({
  mode,
  value,
  onChange,
  apply,
  onApplyChange,
}: {
  mode: 'date' | 'time';
  value: Date;
  onChange: (value: Date | undefined) => void;
  apply: boolean;
  onApplyChange: (value: boolean) => void;
}) {
  const theme = useTheme();

  const str = value
    ? mode === 'date'
      ? new Date(value).toLocaleDateString()
      : new Date(value).toLocaleTimeString()
    : 'Pick ' + mode;

  if (Platform.OS === 'android') {
    return (
      <HStack items="center" justify="between" mb={16}>
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.onBackground,
          }}>
          {mode === 'date' ? 'Date:' : 'Time:'}
        </Text>
        <Text
          disabled={!apply}
          onPress={() => {
            DateTimePickerAndroid.open({
              mode,
              value: new Date((value as Date) || Date.now()),
              onChange: (e, data) => {
                onChange(data);
              },
            });
          }}
          style={{
            fontSize: 18,
            color: theme.colors.onBackground,
          }}>
          {str}
        </Text>
        <Switch
          value={apply}
          onValueChange={data => {
            onApplyChange(data);
          }}
        />
      </HStack>
    );
  }
  return (
    <HStack items="center" justify="between">
      <Text
        style={{
          fontSize: 18,
          color: theme.colors.onBackground,
        }}>
        {mode === 'date' ? 'Date:' : 'Time:'}
      </Text>
      <DateTimePicker
        themeVariant="light"
        value={new Date((value as Date) || Date.now())}
        mode={mode}
        is24Hour={true}
        display="spinner"
        style={{
          height: 120,
          width: 250,
        }}
        onChange={(e, data) => {
          onChange(data);
        }}
        disabled={!apply}
      />
      <Switch
        value={apply}
        onValueChange={data => {
          onApplyChange(data);
        }}
      />
    </HStack>
  );
}
