import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const SIZE = 200;

const Page: () => Node = ({title, index, translateX}) => {
  const inputRange = [(index - 1) * width, width * index, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{scale}],
      borderRadius,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{translateY}],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: `rgba(0, 0, 256, 0.${index + 1})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{position: 'absolute'}, rTextStyle]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    fontSize: 40,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default Page;
