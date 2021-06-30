import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import ColorPicker from './ColorPicker';

const {width, height} = Dimensions.get('window');

const COLORS = [
  'red',
  'purple',
  'blue',
  'cyan',
  'green',
  'yellow',
  'orange',
  'black',
  'white',
];

const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.9)';

const PICKER_WIDTH = width * 0.9;
const CIRCLE_SIZE = width * 0.8;

const Lesson7: () => Node = () => {
  const pickerColor = useSharedValue(COLORS[0]);

  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pickerColor.value,
    };
  });

  const onColorChanged = useCallback(color => {
    'worklet';
    pickerColor.value = color;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Animated.View style={[styles.circle, rStyle]} />
      </View>
      <View style={styles.bottomContainer}>
        <ColorPicker
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.gradient]}
          colors={COLORS}
          maxWidth={PICKER_WIDTH}
          onColorChanged={onColorChanged}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 3,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'red',
  },
});

export default Lesson7;
