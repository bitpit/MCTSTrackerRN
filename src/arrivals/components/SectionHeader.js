// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 4,
  },
  text: {
    fontSize: 14,
    color: '#444',
  },
});

const SectionHeader = ({ text }: { text: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{(text || '').toUpperCase()}</Text>
  </View>
);

export default SectionHeader;
