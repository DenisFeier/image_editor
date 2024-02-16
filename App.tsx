import React, {useRef, useState} from 'react';
import {StyleSheet, SafeAreaView, View, Image, Alert} from 'react-native';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {savePicture} from './src/util/CameraRoll';
import Header from './src/components/Header';
import ColorPickerModal from './src/components/ColorPickerModal';

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string>();
  const [isModalVisible, setModalVisible] = useState(false);
  const ref = useRef<ViewShot | null>(null);

  const selectImageHandler = () => {
    Alert.alert(
      'Select a photo',
      'You need to select the source of the photo you want to edit.',
      [
        {
          text: 'Camera',
          onPress: openCamera,
        },
        {
          text: 'Gallery',
          onPress: openGallery,
        },
      ],
    );
  };

  const openCamera = async () => {
    const response = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: false,
    });
    handlerImageSelection(response);
  };

  const openGallery = async () => {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });
    handlerImageSelection(response);
  };

  const handlerImageSelection = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      Alert.alert('Image picker canceld!');
      return;
    }

    if (response.errorCode) {
      Alert.alert(response.errorCode || '', response.errorMessage);
      return;
    }
    const photo = response.assets![0];
    setSelectedImage(photo.uri);
  };

  const saveSelectedImage = async () => {
    if (!selectedImage) {
      Alert.alert('No image to save!');
      return;
    }
    const captureView = ref.current;
    if (!captureView || !captureView.capture) {
      return;
    }

    const uri = await captureView.capture();

    await savePicture(uri);

    Alert.alert('Image saved!');
  };

  const openColorPicker = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.flex1, styles.backgroundColor]}>
        <Header
          save={saveSelectedImage}
          selectImage={selectImageHandler}
          pickColor={openColorPicker}
        />
        <ViewShot ref={ref} style={styles.flex1}>
          <View style={[styles.flex1, styles.innerContainer]}>
            <Image
              source={{uri: selectedImage}}
              style={[styles.flex1]}
              resizeMode="contain"
            />
          </View>
        </ViewShot>
      </SafeAreaView>
      <ColorPickerModal
        setVisible={setModalVisible}
        isVisible={isModalVisible}
      />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: '#fff',
  },
  backgroundColor: {
    backgroundColor: '#ccc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBtn: {
    margin: 8,
  },
});

export default App;
