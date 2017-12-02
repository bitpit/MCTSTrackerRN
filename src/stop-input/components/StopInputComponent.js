// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { TabBarIcon } from '../../shared';
import BackgroundImage from './BackgroundImage';
import StopNumberTextInput from './StopNumberTextInput';
import { IDENTIFIER as ARRIVALS_ID, makeParams as makeArrivalsParams } from '../../arrivals';


const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  }
});


type PropsShape = {
  navigation: any,
  inputValue: string,
};

export const IDENTIFIER = 'StopInput';

class StopInputComponent extends React.Component<PropsShape> {

  static navigationOptions = {
    tabBarLabel: 'Stop #',
    title: 'Stop #',
    tabBarIcon: props => (
      <TabBarIcon
        img={require('./tab-icon/default.png')}
        imgFocused={require('./tab-icon/focused.png')}
        {...props}
      />
    ),
  };

  _navigateToArrivals = () => {
    const { navigation, inputValue } = this.props;
    if (isNaN(+inputValue) || isNaN(parseInt(inputValue))) {
      return;
    }

    navigation.navigate(ARRIVALS_ID, makeArrivalsParams(inputValue));
  }

  render() {
    return (
      <View style={style.container}>
        <BackgroundImage />
        <StopNumberTextInput onDone={this._navigateToArrivals} />
      </View>
    );
  }
}


const mapStateToProps = state => ({
  inputValue: state.stopInput.value,
});


export default connect(mapStateToProps)(StopInputComponent);
