import React, {useCallback} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  useSharedValue,
  useDerivedValue,
  interpolateColor,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const CIRCLE_PICKER_SIZE = 45;
const INTERNAL_PICKER_SIZE = 20;

const ColorPicker: () => Node = props => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      props.maxWidth - CIRCLE_PICKER_SIZE,
    );
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: adjustedTranslateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const rInternalStyle = useAnimatedStyle(() => {
    const inputRange = props.colors.map(
      (e, i) => ((i + 1) / props.colors.length) * props.maxWidth,
    );
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      props.colors,
    );

    props.onColorChanged?.(backgroundColor);

    return {
      backgroundColor,
    };
  });

  const onEnd = useCallback(() => {
    'worklet';
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  }, []);

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.x = translateX.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd,
  });

  const tapGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      translateY.value = withSpring(-CIRCLE_PICKER_SIZE - 10);
      scale.value = withSpring(1.2);
      translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
    },
    onActive: (event, context) => {},
    onEnd,
  });

  return (
    <TapGestureHandler onGestureEvent={tapGestureEvent}>
      <Animated.View>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={{justifyContent: 'center'}}>
            <LinearGradient {...props} />
            <Animated.View style={[styles.picker, rStyle]}>
              <Animated.View style={[styles.internalPicker, rInternalStyle]} />
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {},
  picker: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internalPicker: {
    width: INTERNAL_PICKER_SIZE,
    height: INTERNAL_PICKER_SIZE,
    borderRadius: INTERNAL_PICKER_SIZE / 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default ColorPicker;
