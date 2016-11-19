
Meteor.methods({
  'submit-idea': function(idea) {
    // Is the user logged in?
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not logged in', 'You must login before you can submit an idea.');
    }

    Ideas.insert({
      owner: Meteor.userId(),
      idea: idea,
      pending: true,
      rejected: false,
      rating: '50'
    });
  },
  'your-ideas': function() {
    return Ideas.find({ owner: Meteor.userId() }).fetch().map((i)=>{
      return {
        _id: i._id,
        text: i.idea,
        pending: i.pending,
        rejected: i.rejected,
        rating: i.rating
      }});
  }
});