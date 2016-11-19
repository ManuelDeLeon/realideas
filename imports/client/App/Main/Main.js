Main({
  created() {
    Meteor.call('your-ideas', (err, ideas) => {
      if (err) {
        toastr.error(err.reason);
      } else {
        this.yourIdeas(ideas);
      }
    })
  },
  text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc hendrerit libero id velit egestas aliquam. Fusce in finibus purus. Phasellus nisi est, condimentum id lectus sed, aliquam tincidunt odio. Aenean at gravida urna, a volutpat diam. Aenean pellentesque vitae neque ut ultrices. Sed vehicula porttitor sem at consequat. Cras eget tortor sem. Integer vestibulum diam eu accumsan egestas. Phasellus vehicula sed sem et efficitur. Vestibulum interdum orci vel tempus ultricies. Proin hendrerit tempor urna sit amet iaculis.

Sed viverra ligula mi, ut condimentum turpis facilisis non. Pellentesque lectus neque, facilisis vel maximus id, eleifend sed nunc. Aliquam non odio at arcu fermentum laoreet. Donec interdum dolor vel mollis tincidunt. Maecenas non dui id odio bibendum imperdiet vel non neque. Aliquam erat volutpat. Duis hendrerit mi quis massa accumsan, a consectetur enim imperdiet.`,
  yourIdeas: [],
  yourIdeasX() {
    return [
      { _id: '1', text: this.text(), pending: true, rejected: false, rating: '68.5' },
      { _id: '2', text: this.text(), pending: false, rejected: false, rating: '70.1' },
      { _id: '3', text: this.text(), pending: false, rejected: true, rating: '80.1' }
    ]
  },
  otherIdeas() {
    return [
      { _id: '1', text: this.text(), yourRating: 8, rating: '68.5' },
      { _id: '2', text: this.text(), yourRating: 5, rating: '80.1' },
      { _id: '3', text: this.text(), yourRating: 9, rating: '50.2' },
      { _id: '4', text: this.text(), yourRating: 6, rating: '35.7' }
    ]
  },
  pendingIdeas() {
    return [
      { _id: '1', text: this.text() },
      { _id: '2', text: this.text() },
      { _id: '3', text: this.text() },
      { _id: '4', text: this.text() }
    ]
  },
  isAdmin() {
    return true;
  },
  logout(){
    Meteor.logout();
  },
  rendered() {
    $('.tabular.menu .item').tab();
  },
  render(){
    <div>
      <div class="ui top attached tabular menu">
        <a class="item active" data-tab="submit-idea">Submit Idea</a>
        <a class="item" data-tab="your-ideas">Your Ideas</a>
        <a class="item" data-tab="other-ideas">Other Ideas</a>
        <a class="item" data-tab="pending-ideas" b="if: isAdmin">Pending</a>
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
      <div class="ui bottom attached tab segment" data-tab="pending-ideas" b="if: isAdmin">
        <Idea b="repeat: pendingIdeas, key: _id" tab="pending-ideas" expand="true" />
      </div>
    </div>
  }
});