import ViewModel from 'viewmodel-react';

ViewModel.mixin({
  user: {
    logged() {
      return !!Meteor.userId();
    },
    loggingIn() {
      return Meteor.loggingIn();
    },
    isAdmin() {
      const user = Meteor.user();
      return user && user.isAdmin;
  },
  }
})