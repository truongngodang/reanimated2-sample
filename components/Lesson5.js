import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PinchGestureHandler} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const imageUrl =
  'https://images.unsplash.com/photo-1624554684449-21692095b5df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';

const Lesson5: () => Node = () => {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: event => {
      scale.value = event.scale;
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onEnd: () => {
      scale.value = withTiming(1);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: focalX.value},
        {translateY: focalY.value},
        {translateX: -width / 2},
        {translateY: -height / 2},
        {scale: scale.value},
        {translateX: -focalX.value},
        {translateY: -focalY.value},
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  });

  const fStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: focalX.value}, {translateY: focalY.value}],
    };
  });

  return (
    <PinchGestureHandler onGestureEvent={pinchHandler}>
      <Animated.View style={{flex: 1}}>
        <AnimatedImage
          source={{uri: imageUrl}}
          style={[styles.image, rStyle]}
        />
        <Animated.View style={[styles.focalPoint, fStyle]} />
      </Animated.View>
    </PinchGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  focalPoint: {
    width: 20,
    height: 20,
    borderRadius: 10,
    ...StyleSheet.absoluteFill,
    backgroundColor: 'violet',
  },
});

export default Lesson5;
