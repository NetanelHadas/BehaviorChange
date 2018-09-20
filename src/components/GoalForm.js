import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Input } from './common';
import { goalUpdate } from '../actions';

class GoalForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Goal Title"
            placeholder="Assertive"
            value={this.props.goalTitle}
            onChangeText={text => this.props.goalUpdate({ prop: 'goalTitle', value: text })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Regreful Moment"
            placeholder="Lossing Money"
            value={this.props.regretMoment}
            onChangeText={value => this.props.goalUpdate({ prop: 'regretMoment', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Action to Take"
            placeholder="Believe in yourself"
            value={this.props.actionToTake}
            onChangeText={text => this.props.goalUpdate({ prop: 'actionToTake', value: text })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>Success Counter</Text>
          <Picker
            selectedValue={this.props.successCounter}
            onValueChange={text => this.props.goalUpdate({ prop: 'successCounter', value: text })}
          >
            <Picker.Item label="Lets get started!" value="Lets get started!" />
            <Picker.Item label="One, way to go!" value="One" />
            <Picker.Item label="Two, nice one!" value="Two" />
            <Picker.Item label="Three, third time's a charm!" value="Third" />
            <Picker.Item label="Four, making progress!" value="Four" />
            <Picker.Item label="Five, message Yonatan!" value="Five" />
            <Picker.Item label="Six, already easier!" value="Six" />
            <Picker.Item label="Seven, growing!" value="Seven" />
            <Picker.Item label="Eight, Appreciate!" value="Eight" />
            <Picker.Item label="Nine, almost there!" value="Nine" />
            <Picker.Item label="Ten, our better half!" value="Ten" />
            <Picker.Item label="Eleven, on a new path!" value="Eleven" />
            <Picker.Item label="Twelve, enjoy the journey" value="Twelve" />
            <Picker.Item label="Thirteen, conquering our fears!" value="Thirteen" />
            <Picker.Item label="Fourteen, more more step!" value="Fourteen" />
            <Picker.Item label="Fifteen, message Yonatan!" value="Fifteen" />
            <Picker.Item label="Sixteen, you can see the peak!" value="Sixteen" />
            <Picker.Item label="Seventeen, almost there!" value="Seventeen" />
            <Picker.Item label="Eighteen, push through!" value="Eighteen" />
            <Picker.Item label="Nineteen, practically there!" value="Nineteen" />
            <Picker.Item label="Twenty, you did it!" value="Twenty" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = ({ goalForm }) => {
  const { goalTitle, regretMoment, actionToTake, successCounter } = goalForm;

  return {
    goalTitle,
    regretMoment,
    actionToTake,
    successCounter
  };
};

export default connect(mapStateToProps, { goalUpdate })(GoalForm);
