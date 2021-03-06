/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {View} from 'react-native';
import Lesson7 from './components/Lesson7';

const App: () => Node = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Lesson7 />
    </View>
  );
};

export default App;
