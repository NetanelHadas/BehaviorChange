import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { connect } from 'react-redux';

import { goalUpdate, goalCreate } from '../actions';
import { Card, CardSection, Input, Button } from './common';
import GoalForm from './GoalForm';


class GoalCreate extends Component {
  onButtonPress() {
    const { goalTitle, regretMoment, actionToTake, successCounter } = this.props;

    this.props.goalCreate({
      goalTitle,
      regretMoment,
      actionToTake,
      successCounter: successCounter || 'Lets get started!' });
  }

  render() {
    return (
      <Card>
        <GoalForm {...this.props} />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Add Goal
          </Button>
        </CardSection>
      </Card>
    );
  }
}



// so we can bring our pieces of state and use it in this component
const mapStateToProps = ({ goalForm }) => {
  const { goalTitle, regretMoment, actionToTake, successCounter } = goalForm;

  return {
    goalTitle,
    regretMoment,
    actionToTake,
    successCounter
  };
};

export default connect(mapStateToProps, {
  goalUpdate, goalCreate
})(GoalCreate);
