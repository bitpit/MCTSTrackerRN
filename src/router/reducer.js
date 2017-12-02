// @flow

import { AppNavigation } from './AppNavigation';
import { NavigationActions } from 'react-navigation';

import { IDENTIFIER as NAVIGATION_ID } from './AppNavigation';

const initialNavState= AppNavigation.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
	    routeName: NAVIGATION_ID,
	  }),
	],
}))

function nav(state: any = initialNavState, action: any) {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigation.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}

export default nav;
