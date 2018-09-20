import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';

import { Card, CardSection, Button, Confirm } from './common';
import GoalForm from './GoalForm';
import { goalUpdate, goalSave, goalUpdateCancel, goalDelete } from '../actions';

class GoalEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.goal, (value, prop) => {
      this.props.goalUpdate({ prop, value });
    });
  }

  componentWillUnmount() {
    this.props.goalUpdateCancel();
  }

  onButtonPress() {
    const { goalTitle, regretMoment, actionToTake, successCounter } = this.props;

    console.log(goalTitle, regretMoment, actionToTake, successCounter);
    this.props.goalSave({ goalTitle, regretMoment, actionToTake, successCounter, uid: this.props.goal.uid });
  }

  renderMsgorCallButton() {
      const { successCounter } = this.props;

      if (successCounter === 'Twenty') {
        return (
          <Button onPress={this.onCallPress.bind(this)}>
            Call Yonatan!
          </Button>
        );
      }

    return (
      <Button onPress={this.onTextPress.bind(this)}>
        Message Yonatan!
      </Button>
    );
  }

  onTextPress() {
    const { successCounter } = this.props;

    Communications.textWithoutEncoding('972502112616', `Yonatan I'm on stage number \n${successCounter}!`);
  }

  onCallPress() {
    Communications.phonecall('972502112616', true);
  }

  onAccept() {
    const { uid } = this.props.goal;

    this.props.goalDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <GoalForm />
        
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          {this.renderMsgorCallButton()}
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Goal Achieved
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you achieved your goal?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { goalTitle, regretMoment, actionToTake, successCounter } = state.goalForm;

  return {
    goalTitle,
    regretMoment,
    actionToTake,
    successCounter
  };
};

export default connect(mapStateToProps, {
  goalUpdate, goalSave, goalUpdateCancel, goalDelete
})(GoalEdit);
