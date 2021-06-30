import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Page from './Page';

const WORDS = ["What's", 'up', 'mobile', 'devs?'];

const Lesson3: () => Node = () => {
  const translateX = useSharedValue(0);

  const _scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const _renderItem = (item, index) => {
    return (
      <Page
        key={index.toString()}
        title={item}
        index={index}
        translateX={translateX}
      />
    );
  };

  return (
    <Animated.ScrollView
      pagingEnabled
      horizontal
      scrollEventThrottle={16}
      style={styles.container}
      onScroll={_scrollHandler}>
      {WORDS.map(_renderItem)}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Lesson3;
