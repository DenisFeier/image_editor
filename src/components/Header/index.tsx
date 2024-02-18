import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface HeaderProps {
  selectImage: () => void;
  save: () => void;
  pickColor: () => void;
}

const Header: React.FC<HeaderProps> = ({save, selectImage, pickColor}) => {
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.header, {paddingTop: top}]}>
      <TouchableOpacity onPress={selectImage}>
        <View style={styles.headerBtn}>
          <MaterialIcons name="add-photo-alternate" size={30} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickColor}>
        <View style={styles.headerBtn}>
          <Ionicons name="color-palette" size={30} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={save}>
        <View style={styles.headerBtn}>
          <Entypo name="save" size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  headerBtn: {
    margin: 8,
  },
});

export default Header;
