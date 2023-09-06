import React from 'react';
import {Divider, useTheme} from 'react-native-paper';
import type {Todo} from '../store/todoStore';
import type {Tobuy} from '../store/tobuyStore';
import ListItem from './ListItem';
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ListProps = {
  list: Todo[] | Tobuy[];
  editListItemRoute: string;
  remove: (id: number) => void;
  toggle: (id: number) => void;
  updateColor: (id: number, color: string) => void;
  setList: (list: Todo[] | Tobuy[]) => void;
};

export default function List({
  list,
  editListItemRoute,
  remove,
  toggle,
  updateColor,
  setList,
}: ListProps) {
  const theme = useTheme();
  const {top} = useSafeAreaInsets();

  const renderDivider = () => (
    <Divider style={{backgroundColor: theme.colors.outline}} />
  );

  const renderItem = ({
    item,
    drag,
    isActive,
    getIndex,
  }: RenderItemParams<Todo | Tobuy>) => {
    return (
      <ShadowDecorator>
        <ScaleDecorator>
          <OpacityDecorator>
            <TouchableOpacity
              activeOpacity={1}
              onLongPress={drag}
              disabled={isActive}>
              <ListItem
                listItem={item}
                index={getIndex() as number}
                editListItemRoute={editListItemRoute}
                remove={remove}
                toggle={toggle}
                updateColor={updateColor}
                list={list}
              />
            </TouchableOpacity>
          </OpacityDecorator>
        </ScaleDecorator>
      </ShadowDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={list}
      onDragEnd={({data}) => {
        setList(data);
      }}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      style={{
        backgroundColor: theme.colors.background,
      }}
      ItemSeparatorComponent={renderDivider}
      contentContainerStyle={{
        paddingTop: 0,
        paddingBottom: 100,
      }}
      containerStyle={{
        paddingTop: 45 + top,
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
