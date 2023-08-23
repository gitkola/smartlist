import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HStack, IconButton} from '@react-native-material/core';
import type {Todo} from '../store/todoStore';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Checkbox, Divider, Text, useTheme} from 'react-native-paper';
import {View, Dimensions} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ColorCircle from './ColorCircle';
import colors from '../utils/colors';
import ColorCircleContainer from './ColorCircleContainer';
import type {Tobuy} from '../store/tobuyStore';
import {useRef} from 'react';

const renderIconTrash = ({color, size}: {color: string; size: number}) => (
  <Icon name="trash" size={size} color={color} />
);

export default function ListItem({
  listItem,
  index,
  editListItemRoute,
  remove,
  toggle,
  updateColor,
  list,
}: {
  listItem: Todo | Tobuy;
  index: number;
  editListItemRoute: string;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  updateColor: (id: number, color: string) => void;
  list: Todo[] | Tobuy[];
}) {
  const navigation = useNavigation();
  const theme = useTheme();
  const itemHeight = 60;

  const height = useSharedValue<number>(60);
  const {width} = Dimensions.get('window');

  const swipeable = useRef<Swipeable>(null);

  const deleteItem = () => {
    height.value = withTiming(0, {duration: 500}, () => {
      runOnJS(remove)(listItem.id);
    });
  };

  const leftButtons = () => (
    <>
      {colors.map((color: string) => (
        <ColorCircleContainer
          children={
            <ColorCircle
              onPress={() => {
                updateColor(listItem.id, color);
                swipeable?.current?.close();
              }}
              color={color}
            />
          }
          w={35}
          h={60}
          key={color}
        />
      ))}
    </>
  );

  const rightButtons = () => (
    <View
      style={{
        width: itemHeight,
        height: itemHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.error,
      }}>
      <IconButton
        icon={renderIconTrash}
        onPress={deleteItem}
        color={theme.colors.onError}
      />
    </View>
  );

  return (
    <Animated.View
      style={{
        height,
      }}>
      {index === 0 && <Divider />}
      <Swipeable
        ref={swipeable}
        renderRightActions={rightButtons}
        renderLeftActions={leftButtons}>
        <HStack
          items="center"
          style={{
            backgroundColor: theme.colors.surface,
            height: itemHeight,
          }}>
          <View
            style={{
              width: itemHeight,
              height: itemHeight,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Checkbox.Android
              status={listItem.done ? 'checked' : 'unchecked'}
              onPress={() => toggle(listItem.id)}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(editListItemRoute, {id: listItem.id})
            }
            style={{
              width: width - itemHeight,
              height: itemHeight,
              justifyContent: 'center',
            }}>
            <HStack items="center" justify="between" pr={18}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.onSurface,
                  }}>
                  {listItem.title}
                </Text>
                {listItem.description && (
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 16,
                      color: theme.colors.onSurfaceDisabled,
                    }}>
                    {listItem.description}
                  </Text>
                )}
                <HStack spacing={8}>
                  {'date' in listItem && listItem.date && (
                    <Text
                      style={{
                        color: theme.colors.onSurfaceDisabled,
                        fontSize: 12,
                      }}>
                      {new Date(listItem.date).toLocaleDateString()}
                    </Text>
                  )}
                  {'time' in listItem && listItem.date && listItem.time && (
                    <Text
                      style={{
                        color: theme.colors.onSurfaceDisabled,
                        fontSize: 12,
                      }}>
                      {listItem.time?.toLocaleTimeString()}
                    </Text>
                  )}
                </HStack>
              </View>
              <ColorCircle color={listItem.color} />
            </HStack>
          </TouchableOpacity>
        </HStack>
      </Swipeable>
      {index === list.length - 1 && <Divider />}
    </Animated.View>
  );
}
