Input({
  required: false,
  label: '',
  icon: '',
  placeholder: '',
  text: '',
  enter() {

  },
  error() {

  },
  render() {
    <div class="field" b="class: { required: required, error: error }">
      <label b="text: label" />
      <div class="ui icon input">
        <input type="text" placeholder={ this.placeholder() } b="value: text, enter: enter"/>
        <i class="icon" b="class: icon"></i>
      </div>
    </div>
  }
})