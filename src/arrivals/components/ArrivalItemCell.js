// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StopViewModel } from '../';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 7,
    paddingBottom: 7
  },
  cell: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 6,
  },
  routeName: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  destination: {
    marginLeft: 2,
    fontSize: 16,
  },
  arrivalInfo: {
    marginTop: 3,
    fontSize: 16,
    marginLeft: 2,
  },
  busNumberText: {
    marginTop: 3,
    marginLeft: 2,
  }
});

const ArrivalItemCell = ({ viewModel }: { viewModel: StopViewModel }) => (
  <View style={styles.container}>
    <View style={[styles.cell, {backgroundColor: viewModel.backgroundColorHex }]}>
      <Text style={[styles.routeName, {color: viewModel.textColorHex}]}>{viewModel.routeName}</Text>
      <Text style={[styles.destination, {color: viewModel.textColorHex}]}>{viewModel.destination}</Text>
      <Text style={[styles.arrivalInfo, {color: viewModel.textColorHex}]}>{viewModel.arrivalInfo}</Text>
      <Text style={[styles.busNumberText, {color: viewModel.textColorHex}]}>{viewModel.busNumberText}</Text>
    </View>
  </View>
);

export default ArrivalItemCell;
