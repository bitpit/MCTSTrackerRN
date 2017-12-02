// @flow

import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation';

import { ArrivalsNavigation, IDENTIFIER as ARRIVALS_ID } from '../arrivals';
import { StopInputComponent, IDENTIFIER as STOP_INPUT_ID } from '../stop-input';
import { NearbyComponent, IDENTIFIER as NEARBY_ID } from '../nearby';


const styles = StyleSheet.create({ container: { flex: 1  } });

const isIOS = Platform.OS === 'ios';
const header = isIOS ? void 0 : null;

export const IDENTIFIER = 'TabNav';

const TabNav = TabNavigator({
  [STOP_INPUT_ID]: { screen: StopInputComponent },
  [NEARBY_ID]: { screen: NearbyComponent },
}, { lazy: true });


export const AppNavigation = StackNavigator({
  [IDENTIFIER]: { screen: TabNav, navigationOptions: { header } },
  [ARRIVALS_ID]: { screen: ArrivalsNavigation },
}, {
  mode: 'modal'
});


const AppWithNavigationState = ({ dispatch, router }) => (
  <View style={styles.container}>
    <AppNavigation navigation={addNavigationHelpers({ dispatch, state: router })} />
  </View>
);


const mapStateToProps = state => ({
  router: state.router,
});


export default connect(mapStateToProps)(AppWithNavigationState);
