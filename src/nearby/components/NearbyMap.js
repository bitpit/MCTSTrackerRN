// @flow

import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux';

import type { StopShape } from '../state/models';


const D_LAT = 43.030831;
const D_LON = -87.990716;
const REGION_SIZE = 0.27243;


const styles = StyleSheet.create({
  map: { flex: 1 },
  tooltipContainer: { backgroundColor: 'white', padding: 12 },
});


type Props = { stops: ?StopShape[], onStopSelected: (stopId: number) => any };


class NearbyMap extends React.Component<Props> {

  map: MapView;

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.stops !== this.props.stops && null != this.map) {
      setTimeout(() => this.map.fitToElements(false), 350);
    }
  }

  render() {
    const { stops, onStopSelected } = this.props;
    return (
      <MapView
        ref={ref => this.map = ref}
        style={styles.map}
        showsMyLocationButton={true}
        showsUserLocation={true}
        initialRegion={{
          latitude: D_LAT,
          longitude: D_LON,
          latitudeDelta: REGION_SIZE,
          longitudeDelta: REGION_SIZE,
        }}
      >
        {(stops || []).map(({ name_text, lat, lon, _id }, idx) =>
          <Marker
            key={idx}
            coordinate={{ latitude: lat, longitude: lon }}
            zIndex={2}
          >
            <Callout tooltip={true} onPress={() => onStopSelected(_id)}>
              <View style={styles.tooltipContainer}>
                <TouchableOpacity>
                  <Text>{name_text}</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    );
  }
}


export default connect(({ nearby }) => ({ stops: nearby.stops }))(NearbyMap);
