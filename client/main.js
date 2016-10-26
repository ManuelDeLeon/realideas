import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import React from 'react';
import { render } from 'react-dom';
import { App } from '../imports/App/App';
import ViewModel from 'viewmodel-react';

// Use Meteor's dependency management
ViewModel.Tracker = Tracker;
window.ViewModel = ViewModel;

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});