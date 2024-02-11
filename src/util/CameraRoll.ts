import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {Platform} from 'react-native';
import {hasAndroidPermission} from './AndroidPermissions';

export const savePicture = async (photo: string) => {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }

  return await CameraRoll.saveAsset(photo, {type: 'photo'});
};
