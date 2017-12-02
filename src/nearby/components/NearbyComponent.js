// @flow

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TabBarIcon } from '../../shared';


import { gotLocation, gotLocationError } from '../state/actions';
import NearbyMap from './NearbyMap';

import { IDENTIFIER as ARRIVALS_ID, makeParams as makeArrivalsParams } from '../../arrivals';


type PropsShape = {
  location: ?Position,
  error: ?PositionError,
  hasStops: boolean,
  gotLocation: (location: ?Position) => any,
  gotLocationError: (error: ?PositionError) => any,
  navigation: any,
};


const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { justifyContent: 'center', alignItems: 'center' },
});

export const IDENTIFIER = 'Nearby';

class NearbyView extends React.Component<PropsShape> {

  static navigationOptions = {
    tabBarLabel: 'Nearby',
    title: 'Nearby',
    tabBarIcon: props => (
      <TabBarIcon
        img={require('./tab-icon/default.png')}
        imgFocused={require('./tab-icon/focused.png')}
        {...props}
      />
    ),
  };

  watchId: ?number;


  componentDidMount() {
    const { gotLocation, gotLocationError } = this.props;
    this.watchId = navigator.geolocation.watchPosition(
      gotLocation,
      gotLocationError
    );
  }

  componentWillUnmount() {
    if (null != this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  _navigateToArrivals = (stopNumber: number) => {
    const { navigation } = this.props;
    navigation.navigate(ARRIVALS_ID, makeArrivalsParams(stopNumber));
  }

  _loadingComponent() {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator />
      </View>
    );
  }

  _errorComponent(error: PositionError) {
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  _mapComponent() {
    return (
      <View style={styles.container}>
        <NearbyMap onStopSelected={stopId => this._navigateToArrivals(stopId)} />
      </View>
    );
  }

  render() {
    const { location, error, hasStops } = this.props;
    if (!hasStops) {
      if (null == error) {
        return this._loadingComponent();
      } else {
        return this._errorComponent(error);
      }
    }
    return this._mapComponent();
  }
}



const mapStateToProps = ({ nearby }) => ({
  location: nearby.location,
  error: nearby.error,
  hasStops: Array.isArray(nearby.stops),
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  gotLocation,
  gotLocationError,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NearbyView);
