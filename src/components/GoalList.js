import _ from 'lodash';
import React, { Component } from 'react';
import { View, ListView } from 'react-native';
import { connect } from 'react-redux';

import { goalsFetch, logoutUser } from '../actions';
import ListItem from './ListItem';
import { CardSection, Button } from './common';

class GoalList extends Component {
  componentWillMount() {
    this.props.goalsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ goals }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(goals);
  }

  renderRow(goal) {
    return <ListItem goal={goal} />;
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <ListView
          enableEmptySection
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />

        <CardSection>
          <Button onPress={this.props.logoutUser}>
            Log-out
          </Button>
        </CardSection>
      </View>
    );
  }
}

// so we can bring our pieces of state and use it in this component
const mapStateToProps = state => {
  const goals = _.map(state.goals, (val, uid) => {
    return { ...val, uid }; // { goalTitle: 'Assertive', regretMoment: 'lossing money', ..., id: 'bsadaswhatever'}
  });

  return { goals };
};

// Make the component available to other parts of the app
export default connect(mapStateToProps, {
  goalsFetch, logoutUser
})(GoalList);
