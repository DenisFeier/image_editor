import {Slider} from '@miblanchard/react-native-slider';
import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ColorPicker from 'react-native-wheel-color-picker';

export interface ConfirmSelector {
  color: string;
  stroke: number;
}

interface ColorPickerProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  onConfirm: (value: ConfirmSelector) => void;
}

const DrawSettingsModal: React.FC<ColorPickerProps> = ({
  isVisible,
  setVisible,
  onConfirm,
}) => {
  const [color, setColor] = useState('#000');
  const [silderValue, setSliderValue] = useState<number[]>([1]);
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const stroke = silderValue[0] ? Math.trunc(silderValue[0]) : 1;

  const onColorChange = (c: string) => {
    setColor(c);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const handlerConfirm = () => {
    onConfirm({color, stroke});
    closeModal();
  };

  return (
    <Modal
      swipeDirection={['down']}
      style={styles.view}
      propagateSwipe={true}
      onSwipeComplete={closeModal}
      isVisible={isVisible}>
      <View
        style={[
          styles.background,
          styles.sectionContainer,
          {paddingBottom: insets.bottom},
        ]}>
        <View style={styles.top}>
          <View style={styles.sliderIndicatior} />
        </View>
        <View style={[{height: height / 1.7}]}>
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
        <View style={styles.confirmBtn}>
          <Slider
            minimumValue={1}
            maximumValue={10}
            value={silderValue}
            onValueChange={value => setSliderValue(value)}
          />
          <View>
            <Text>{`Stroke: ${stroke}`}</Text>
          </View>
        </View>
        <View style={styles.confirmBtn}>
          <Button title="Confirm" onPress={handlerConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  top: {
    width: '100%',
    height: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  sliderIndicatior: {
    backgroundColor: 'gray',
    width: '15%',
    height: 4,
    borderRadius: 50,
  },
  confirmBtn: {
    marginVertical: 16,
  },
});

export default DrawSettingsModal;
