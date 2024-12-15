/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import { Provider } from 'react-redux';
import store from './redux/store';

function App(): React.JSX.Element {
  return (
      <Provider store={store}>
        <NavigationContainer>
          {/* <SafeAreaView style={backgroundStyle}> */}
          <StackNavigation/>
          {/* </SafeAreaView> */}
        </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({

});

export default App;
