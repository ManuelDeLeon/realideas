Meteor.publish('your-ideas', function() {
  return Ideas.find({ owner: this.userId }); 
});

Meteor.publish('pending-ideas', function() {
  const user = Meteor.users.findOne(this.userId);
  if (user && user.isAdmin){
    return Ideas.find({ pending: true });
  } else {
    return [];
  }
} );

Meteor.publish('user-data', function() {
  return Meteor.users.find(this.userId, { fields: { isAdmin: 1, otherIdeas: 1 }} );
})