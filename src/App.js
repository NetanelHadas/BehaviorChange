// Import a library to help create a component
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';
import Router from './Router';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

console.ignoredYellowBox = [
  'Setting a timer',
  'Warning: In next release empty',
  'Warning: React',
  'Warning: Can',
  'Unable to symbolicate'
];


// Create a component
class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAaphwO-R1BUQzsUC8be0gRAvdTOgq_u_8',
      authDomain: 'behavior-change-1d604.firebaseapp.com',
      databaseURL: 'https://behavior-change-1d604.firebaseio.com',
      projectId: 'behavior-change-1d604',
      storageBucket: 'behavior-change-1d604.appspot.com',
      messagingSenderId: '70642535197'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}




// Make the component available to other parts of the app
export default App;
