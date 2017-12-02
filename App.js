import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';
import AppNavigationWithState from './src/router/AppNavigation';
import './src/sqlite-config';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigationWithState />
      </Provider>
    );
  }
}
