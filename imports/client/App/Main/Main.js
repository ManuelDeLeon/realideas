Main({
  mixin: { user: 'user' },
  created() {
    Tracker.autorun((c) => {
      Meteor.subscribe('your-ideas');
      Meteor.subscribe('user-data');
      if (this.user.isAdmin()) {
        pendingIdeas = Meteor.subscribe('pending-ideas');
      }
    });
  },
  rendered() {
    $('.tabular.menu .item').tab();
  },
  yourIdeas() {
    return Ideas.find({ owner: Meteor.userId() }).fetch();
  },
  otherIdeas() {
    const user = Meteor.user();
    return (user && user.otherIdeas) || [];
  },
  pendingIdeas() {
    return Ideas.find({ pending: true }).fetch();
  },
  logout(){
    Meteor.logout();
  },
  adminDisplay() {
    return this.user.isAdmin() ? "block" : "none";
  },
  render(){
    <div>
      <div class="ui top attached tabular menu">
        <a class="item active" data-tab="submit-idea">Submit Idea</a>
        <a class="item" data-tab="your-ideas">Your Ideas</a>
        <a class="item" data-tab="other-ideas">Other Ideas</a>
        <a class="item" data-tab="pending-ideas" b="style: { display: adminDisplay }" >Pending</a>
        <a class="item right floated" b="click: logout" title="Logout of this account.">Logout</a>
      </div>
      <div class="ui bottom attached tab segment active" data-tab="submit-idea">
        <SubmitIdea />
      </div>
      <div class="ui bottom attached tab segment" data-tab="your-ideas">
        <Idea b="repeat: yourIdeas, key: _id" tab="your-ideas" />
      </div>
      <div class="ui bottom attached tab segment" data-tab="other-ideas">
        <Idea b="repeat: otherIdeas, key: _id" tab="other-ideas" />
      </div>
      <div class="ui bottom attached tab segment" data-tab="pending-ideas" >
        <Idea b="repeat: pendingIdeas, key: _id" tab="pending-ideas" expand="true" />
      </div>
    </div>
  }
});