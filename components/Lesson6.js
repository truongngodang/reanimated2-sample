import React, {useCallback, useRef} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const imageUrl =
  'https://images.unsplash.com/photo-1624554684449-21692095b5df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80';

const Lesson5: () => Node = () => {
  const doubleTapRef = useRef();

  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const scale = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(scale.value, 0)}],
    };
  });

  const doubleTapHandler = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      scale.value = withDelay(500, withSpring(0));
    });
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        numberOfTaps={1}
        onActivated={() => {
          console.log('SINGLE TAP');
        }}>
        <TapGestureHandler
          maxDedayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={doubleTapHandler}>
          <Animated.View style={{flex: 1}}>
            <ImageBackground source={{uri: imageUrl}} style={[styles.image]}>
              <AnimatedImage
                source={require('./heart.png')}
                style={[styles.heart, rStyle]}
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heart: {
    width: 200,
    height: 200,
  },
});

export default Lesson5;
