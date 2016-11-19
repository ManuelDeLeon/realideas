NewIdea({
  idea: '',
  submit() {
    Meteor.call("submit-idea", this.idea(), (err) => {
      if (err) {
        toastr.error(err.reason);
      } else {
        this.parent().isNew(false);
      }
    });
  },
  render(){
    <form class="ui form">
      <div class="field">
        <label>Idea:</label>
        <textarea b="value: idea" rows="20" placeholder="What's the big idea?" />
      </div>

      <button class="ui primary button" type="button" b="enable: idea, click: submit" title="Submit your idea for review.">Submit</button>
    </form>
  }
});