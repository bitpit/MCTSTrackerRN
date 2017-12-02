// @flow

import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import { scaledImageSize } from '../constants';

const style = StyleSheet.create({
  image: { width: scaledImageSize.width, height: scaledImageSize.height }
});

const BackgroundImageComponent = ({ children }: { children?: any }) => (
    <Image style={style.image} source={require('./bus_input.png')}>
      {children}
    </Image>
);

export default BackgroundImageComponent;
