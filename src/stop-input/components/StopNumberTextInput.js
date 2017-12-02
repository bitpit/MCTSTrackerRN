// @flow

import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { stopNumberChange } from '../state/actions';

import { scaledImageSize, imageSize, imageInputPosition } from '../constants';

const left = (imageInputPosition.x / imageSize.width) * scaledImageSize.width;
const top = (imageInputPosition.y / imageSize.height) * scaledImageSize.height;
const WIDTH_RATIO = 0.2915;
const HEIGHT_RATIO = 0.105;

const style = StyleSheet.create({
  input: {
    fontSize: 20,
    position: 'absolute',
    left,
    top,
    width: scaledImageSize.width * WIDTH_RATIO,
    height: scaledImageSize.width * HEIGHT_RATIO,
    textAlign: 'center',
  }
});

type PropsShape = {
  value: string,
  onChange: (str: string) => any, state: any,
  onDone: () => any
};

const StopNumberTextInput = ({ value, onChange, state, onDone }: PropsShape) => (
  <TextInput
    placeholder="####"
    keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
    returnKeyType="done"
    style={style.input}
    underlineColorAndroid="transparent"
    value={value || ''}
    onChangeText={text => onChange(text)}
    onEndEditing={onDone}
    selectTextOnFocus={true}
  />
);

const mapStateToProps = state => ({
  value: state.stopInput.value,
  state,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange: stopNumberChange
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(StopNumberTextInput);
