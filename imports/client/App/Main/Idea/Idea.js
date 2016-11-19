Idea({
  tab: '',
  pending: false,
  rejected: false,
  expand: false,
  rating: '',
  yourRating: 0,
  wrap(){
    return this.expand() ? 'pre-wrap' : 'nowrap';
  },
  text: '',
  ratings: [ 1,2,3,4,5,6,7,8,9,10 ],
  rate(rating) {
    this.yourRating(rating);
  },
  starState(rating) {
    return this.yourRating() === rating ? '' : 'empty';
  },
  displayText() {
    if (this.expand()) {
      return this.text();
    } else {
      const added = this.pending() || this.rejected() || !this.rating() ? '' : this.rating() + '%  -  ';
      return added + this.text().substr(0, 100) + '...';
    }
  },
  showLatestRating() {
    return this.expand() && (
      (!this.pending() && !this.rejected() && this.tab() === 'your-ideas')
      || this.tab() === 'other-ideas'
      );
  },
  render() {
    <div class="ui segment" b="class: { blue: expand }">
      <h3 b="if: pending && tab === 'your-ideas'">Pending Review</h3>
      <h3 b="if: rejected" style="color: red;">Rejected</h3>
      <p style="cursor: pointer" b="text: displayText, style: { white-space: wrap }, toggle: expand" />
      <div b="if: showLatestRating">
        <h3 title="The latest rating changes as people rate this idea.">Latest Rating: <span b="text: rating"/>%</h3>
      </div>

      <div b="if: expand && tab === 'other-ideas'" style="margin-top: 10px;">
        <span style="font-weight: bold">Your rating: </span>
        <i b="repeat: ratings, class: starState(repeatObject), click: rate(repeatObject)"
           class="star icon"
           style="cursor: pointer"
           title={repeatObject}
        />
      </div>

      <div b="if: expand && tab === 'pending-ideas'">
        <button type="button" class="ui green button">Accept</button>
        <button type="button" class="ui red button right floated">Reject</button>
      </div>

    </div>
  }
});