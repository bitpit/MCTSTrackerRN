// @flow

import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import reducers from './reducers';

// import { AppNavigation } from '../router/AppNavigation';

// Start with two routes: The Main screen, with the Login screen on top.

const AppReducer = combineReducers({
  ...reducers,
});

export default AppReducer;
