// @flow

import React from 'react';
import { View, Text, SectionList, RefreshControl, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { StopViewModel } from '../';
import { fetchStops } from '../state/actions';
import ArrivalItemCell from './ArrivalItemCell';
import SectionHeader from './SectionHeader';


type PropsShape = {
  stops: StopViewModel[],
  error: ?Error,
  stopName: ?string,
  refreshing: boolean,
  fetchStops: () => any,
};


const styles = StyleSheet.create({
  container: { flex: 1 },
  errorContainer: { justifyContent: 'center', alignItems: 'center', padding: 12 },
});

export const IDENTIFIER = 'Arrivals';

class Arrivals extends React.Component<PropsShape> {

  static navigationOptions = {
    title: 'Arrivals',
  };

  componentDidMount() {
    this.refresh();
  }

  refresh = () => {
    this.props.fetchStops();
  }

  render() {
    const { stops, error, refreshing, stopName } = this.props;
    if (null != error) {
      return (
        <View style={[styles.container, styles.errorContainer]}>
          <Text>{error.message}</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        { null == error ? null : <Text>{error.message + '\n' + error.stack}</Text> }
        <SectionList
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => String(index)}
          sections={[{ title: stopName, data: stops }]}
          renderSectionHeader={({ section }) => <SectionHeader text={(section.title:any)} />}
          renderItem={({ item }) => <ArrivalItemCell viewModel={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.refresh}
            />
          }
        />
      </View>
    );
  }
}

export function makeParams(stopNumber: string | number) {
  return { stopNumber };
}

const mapStateToProps = ({ arrivals }, ownProps) => {
  const storedStopId = arrivals.stopId;
  const navigatedStopId = ownProps.navigation.state.params.stopNumber;
  const stops = storedStopId !== navigatedStopId
    ? []
    : (arrivals.stops || []).map(x => new StopViewModel(x));
  return {
    stops,
    error: arrivals.error,
    refreshing: arrivals.refreshing,
    stopName: arrivals.name,
  };
};

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({
    fetchStops: fetchStops.bind(null, ownProps.navigation.state.params.stopNumber),
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Arrivals);
