import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {default as MaterialIcons} from 'react-native-vector-icons/MaterialIcons';
import {default as Entypo} from 'react-native-vector-icons/Entypo';
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {savePicture} from './src/util/CameraRoll';
import ViewShot from 'react-native-view-shot';

const App = () => {
  const [selectedImage, setSelectedImage] = useState<string>();
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

  return (
    <SafeAreaView style={[styles.flex1, styles.backgroundColor]}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={selectImageHandler}>
          <View style={styles.headerBtn}>
            <MaterialIcons name="add-photo-alternate" size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={saveSelectedImage}>
          <View style={styles.headerBtn}>
            <Entypo name="save" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <ViewShot ref={ref} style={styles.flex1}>
        <View style={[styles.flex1, styles.innerContainer]}>
          <Image
            source={{uri: selectedImage}}
            style={[styles.flex1]}
            resizeMode="contain"
          />
        </View>
      </ViewShot>
      {/* <View style={styles.flex1}></View> */}
    </SafeAreaView>
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
