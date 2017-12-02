// @flow

import React from 'react';
import { Image } from 'react-native';

type PropsShape = {
  focused: boolean,
  tintColor: string,
  img: any,
  imgFocused: any,
};

const TabBarIcon = ({ focused, tintColor, img, imgFocused }: PropsShape) => (
  <Image
    source={focused ? imgFocused : img}
    style={{tintColor: tintColor}}
  />
);

export default TabBarIcon;
