import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

const SIZE = 100;

const handleRotation = _progress => {
  'worklet';
  return `${_progress.value * 2 * Math.PI}rad`;
};

const Lesson1: () => Node = () => {
  const _progress = useSharedValue(1);
  const _scale = useSharedValue(2);

  const _reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: _progress.value,
      transform: [{scale: _scale.value}, {rotate: handleRotation(_progress)}],
      borderRadius: (_progress.value * SIZE) / 2,
    };
  });

  useEffect(() => {
    _progress.value = withRepeat(withSpring(0.5), -1, true);
    _scale.value = withRepeat(withSpring(1), -1, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, _reanimatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'tomato',
  },
});

export default Lesson1;
