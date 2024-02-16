import React, {useState} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ColorPicker from 'react-native-wheel-color-picker';

interface ColorPickerProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}

const ColorPickerModal: React.FC<ColorPickerProps> = ({
  isVisible,
  setVisible,
}) => {
  const [color, setColor] = useState('');
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const onColorChange = (c: string) => {
    setColor(c);
  };

  const toggleModal = () => {
    setVisible(false);
  };

  return (
    <Modal
      swipeDirection={['down']}
      style={styles.view}
      propagateSwipe={true}
      onSwipeComplete={toggleModal}
      isVisible={isVisible}>
      <View
        style={[
          styles.sectionContainer,
          {height: height / 1.7, paddingBottom: insets.bottom + 16},
        ]}>
        <View style={styles.top}>
          <View style={styles.sliderIndicatior} />
        </View>
        <ColorPicker
          gapSize={20}
          color={color}
          onColorChange={onColorChange}
          thumbSize={30}
          sliderSize={30}
          noSnap={false}
          row={false}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex1: {
    backgroundColor: '#fff',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  top: {
    width: '100%',
    height: 15,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sliderIndicatior: {
    backgroundColor: 'gray',
    width: '15%',
    height: 4,
    borderRadius: 50,
  },
});

export default ColorPickerModal;
