import ViewModel from 'viewmodel-react';

ViewModel.mixin({
  user: {
    logged() {
      return !!Meteor.userId();
    }
  }
})