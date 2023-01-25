/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import StoriesList from './components/StoriesList';
import {store} from './stores';
import Header from './components/Header';
import {colors} from './utils/colors';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <Header />
        <StoriesList />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.primary},
});

export default App;
