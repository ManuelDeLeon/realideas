
Meteor.methods({
  'submit-idea': function(text) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('Not logged in', 'You must login before you can submit an idea.');
    }

    Ideas.insert({
      owner: Meteor.userId(),
      text: text,
      pending: true,
      rejected: false,
      rating: 5
    });
  },

  'accept-idea': function(id) {
    if (!Meteor.userId() || !Meteor.user().isAdmin ) {
      throw new Meteor.Error('Not Admin', 'Only admins can accept ideas.');
    }

    const idea = Ideas.findOne({ _id: id });
    if (!idea ) {
      throw new Meteor.Error('Invalid Id', "That idea doesn't exist.");
    }

    if (!idea.pending) {
      throw new Meteor.Error('Already processed', 'That idea has already been processed.');
    }

    Ideas.update({_id: id}, { $set: { pending: false }});

    const getSample = function(array, count) {
      const num = count > array.length ? array.length : count;
      const shuffled = array.sort(function(){return Math.random()});
      return shuffled.slice(0,num);
    }

    const giveIdeas = function(percentile, count) {
      const givenIdeas = Meteor.users.findOne({ _id: idea.owner }).otherIdeas || [];
      const candidates = Ideas.find({ 
        rating: { $gte: percentile }, 
        _id: { $nin: givenIdeas.map((i) => i._id ) }, 
        owner: { $ne: idea.owner },
        pending: false,
        rejected: false
      }, { fields: { 
        _id: 1,
        text: 1,
        rating: 1
      }}).fetch().map((i) => {
        return {
          _id: i._id,
          text: i.text,
          rating: i.rating.toFixed(2),
          yourRating: 5
        }
      });
      const random = getSample(candidates, count);
      const otherIdeas = givenIdeas.concat(random);
      Meteor.users.update({_id: idea.owner }, { $set: { otherIdeas: otherIdeas }})
      return random.length;
    }
    // Give user 10 ideas
    let total = giveIdeas(0.6, 4);
    total += giveIdeas(0.4, 3);
    giveIdeas(0.0, 10 - total);

    // Send email to user
  },

  'reject-idea': function(id) {
    if (!Meteor.userId() || !Meteor.user().isAdmin ) {
      throw new Meteor.Error('Not Admin', 'Only admins can reject ideas.');
    }

    const idea = Ideas.findOne({ _id: id });
    if (!idea ) {
      throw new Meteor.Error('Invalid Id', "That idea doesn't exist.");
    }

    if (!idea.pending) {
      throw new Meteor.Error('Already processed', 'That idea has already been processed.');
    }

    Ideas.update({_id: id}, { $set: { pending: false, rejected: true }});

    // Send email to user
  }
});