import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {Canvas, Path} from '@shopify/react-native-skia';

interface DrawPath {
  segments: String[];
  color?: string;
  stroke?: number;
}

interface DrawingCanvasProps {
  selectedColor: string;
  selectedStroke: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  selectedColor,
  selectedStroke,
}) => {
  const [paths, setPaths] = useState<DrawPath[]>([]);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(g => {
      setPaths(prev => {
        const path: DrawPath = {
          segments: [`M ${g.x} ${g.y}`],
          color: selectedColor,
          stroke: selectedStroke,
        };
        return [...prev, path];
      });
    })
    .onUpdate(g => {
      setPaths(prev => {
        const index = prev.length - 1;
        const newPaths = [...prev];
        if (newPaths?.[index]?.segments) {
          newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        }
        return newPaths;
      });
    });

  return (
    <GestureHandlerRootView style={styles.flex1}>
      <GestureDetector gesture={pan}>
        <View style={[styles.flex1, styles.background]}>
          <Canvas style={styles.flex1}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(' ')}
                strokeWidth={p.stroke}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  background: {
    backgroundColor: 'transparent',
  },
});

export default DrawingCanvas;
