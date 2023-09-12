import React, {useCallback, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Video, {LoadError, OnLoadData} from 'react-native-video';
import {CONTENT_SPACING, SAFE_AREA_PADDING} from '../utils/Constants';
import {useIsForeground} from '../hooks/useIsForeground';
import {PressableOpacity} from 'react-native-pressable-opacity';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Alert} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {StatusBarBlurBackground} from '../components/StatusBarBlurBackground';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useIsFocused} from '@react-navigation/core';
import FastImage, {OnLoadEvent} from 'react-native-fast-image';
import {RootStackParamList} from '../App';

const requestSavePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return true;
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) {
    return false;
  }
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );
    hasPermission = permissionRequestResult === 'granted';
  }
  return hasPermission;
};

const isVideoOnLoadEvent = (
  event: OnLoadData | OnLoadEvent,
): event is OnLoadData => 'duration' in event && 'naturalSize' in event;

type Props = NativeStackScreenProps<RootStackParamList, 'media'>;
export function MediaPage({navigation, route}: Props): React.ReactElement {
  const {path, type} = route.params;
  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const isForeground = useIsForeground();
  const isScreenFocused = useIsFocused();
  const isVideoPaused = !isForeground || !isScreenFocused;
  const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>(
    'none',
  );

  const onMediaLoad = useCallback((event: OnLoadData | OnLoadEvent) => {
    if (isVideoOnLoadEvent(event)) {
      console.log(
        `Video loaded. Size: ${event.naturalSize.width}x${event.naturalSize.height} (${event.naturalSize.orientation}, ${event.duration} seconds)`,
      );
    } else {
      console.log(
        `Image loaded. Size: ${event.nativeEvent.width}x${event.nativeEvent.height}`,
      );
    }
  }, []);
  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.');
    setHasMediaLoaded(true);
  }, []);
  const onMediaLoadError = useCallback((error: LoadError) => {
    console.log(`failed to load media: ${JSON.stringify(error)}`);
  }, []);

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving');

      const hasPermission = await requestSavePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission denied!',
          'Vision Camera does not have permission to save the media to your camera roll.',
        );
        return;
      }
      await CameraRoll.save(`file://${path}`, {
        type: type,
      });
      setSavingState('saved');
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      setSavingState('none');
      Alert.alert(
        'Failed to save!',
        `An unexpected error occured while trying to save your ${type}. ${message}`,
      );
    }
  }, [path, type]);

  const source = useMemo(() => ({uri: `file://${path}`}), [path]);

  const screenStyle = useMemo(
    () => ({opacity: hasMediaLoaded ? 1 : 0}),
    [hasMediaLoaded],
  );

  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'photo' && (
        <FastImage
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={onMediaLoadEnd}
          onLoad={onMediaLoad}
        />
      )}
      {type === 'video' && (
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          paused={isVideoPaused}
          resizeMode="cover"
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          useTextureView={false}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onReadyForDisplay={onMediaLoadEnd}
          onLoad={onMediaLoad}
          onError={onMediaLoadError}
        />
      )}
      <PressableOpacity style={styles.closeButton} onPress={navigation.goBack}>
        <MaterialIcon
          name="chevron-left"
          size={45}
          color="white"
          style={styles.icon}
        />
      </PressableOpacity>

      <PressableOpacity
        style={styles.saveButton}
        onPress={onSavePressed}
        disabled={savingState !== 'none'}>
        {savingState === 'none' && (
          <MaterialIcon
            name="download"
            size={35}
            color="white"
            style={styles.icon}
          />
        )}
        {savingState === 'saved' && (
          <MaterialIcon
            name="check-bold"
            size={35}
            color="white"
            style={styles.icon}
          />
        )}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </PressableOpacity>

      <StatusBarBlurBackground />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: SAFE_AREA_PADDING.paddingTop - CONTENT_SPACING / 2,
    left: SAFE_AREA_PADDING.paddingLeft - CONTENT_SPACING,
  },
  saveButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    left: SAFE_AREA_PADDING.paddingLeft,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 2,
  },
});