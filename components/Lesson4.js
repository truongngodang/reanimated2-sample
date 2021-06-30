import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Page from './Page';
import {Switch} from 'react-native-gesture-handler';

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256, 0, 256, 0.2)',
  false: 'rgba(0, 0, 0, 0.1)',
};

const Colors = {
  dark: {
    backgroundColor: '#1E1E1E',
    circle: '#252525',
    text: '#F8F8F8',
  },
  light: {
    backgroundColor: '#F8F8F8',
    circle: '#fff',
    text: '#1E1E1E',
  },
};

const Lesson4: () => Node = () => {
  const [theme, setTheme] = useState('light');

  const progress = useDerivedValue(() => {
    return theme === 'dark' ? withTiming(1) : withTiming(0);
  }, [theme]);

  const _valueChangeHandler = toggled => {
    setTheme(toggled ? 'dark' : 'light');
  };

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.backgroundColor, Colors.dark.backgroundColor],
    );
    return {
      backgroundColor,
    };
  });

  const rCircleStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {
      backgroundColor,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
      <Animated.View style={[styles.wrapSwitch, rCircleStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={_valueChangeHandler}
          thumbColor="violet"
          trackColor={SWITCH_TRACK_COLOR}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapSwitch: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
    letterSpacing: 12,
  },
});

export default Lesson4;
