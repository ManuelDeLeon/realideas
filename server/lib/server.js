

Server = {
  allow: {
    owner: {
      insert: (userId, doc) => (userId && doc.owner === userId) || (Meteor.user() && Meteor.user().isAdmin),
      update: (userId, doc) => doc.owner === userId || (Meteor.user() && Meteor.user().isAdmin),
      remove: (userId, doc) => doc.owner === userId || (Meteor.user() && Meteor.user().isAdmin),
      fetch: [ 'owner' ]
    },
    admin: {
      insert: () => (Meteor.user() && Meteor.user().isAdmin),
      update: () => (Meteor.user() && Meteor.user().isAdmin),
      remove: () => (Meteor.user() && Meteor.user().isAdmin)
    }
  }
};
