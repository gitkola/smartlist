import React, {useState} from 'react';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {Appbar, Menu, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Share, TouchableHighlight} from 'react-native';
import colors from '../utils/colors';
import ColorCircleContainer from './ColorCircleContainer';
import ColorCircle from './ColorCircle';
import generateShareMessage from '../utils/generateShareMessage';
import {Item} from '../screens/ScreenList';

const Header = ({
  headerTitle,
  listLength,
  colorFilter,
  setColorFilter,
  doneHidden,
  setDoneHidden,
  colorAndDoneFiltered,
}: {
  headerTitle: string;
  listLength: number;
  colorFilter: string;
  setColorFilter: (color: string) => void;
  doneHidden: boolean;
  setDoneHidden: (doneHidden: boolean) => void;
  colorAndDoneFiltered: Item[];
}) => {
  const {top} = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar
      elevated
      safeAreaInsets={{top}}
      style={{
        height: 45 + top,
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
        title={`${headerTitle} (${listLength})`}
        color={theme.colors.onPrimary}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'rgba(255,255,255,0.1)'}
            onPress={openMenu}
            style={{
              width: 40,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ColorCircle onPress={openMenu} color={colorFilter} />
          </TouchableHighlight>
        }
        anchorPosition="bottom"
        contentStyle={{
          right: 5,
          backgroundColor: theme.colors.surface,
        }}>
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
  );
};

export default Header;
