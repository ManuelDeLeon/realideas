Login({
  mixin: 'email',
  isNew: true,
  name: ViewModel.property.string
    .validate(function(value) { return !this.isNew() || !!value; })
    .invalidMessage("Name is required"),
  email: ViewModel.property.string
    .validate(function(value) { return this.validEmail(value) })
    .invalidMessage("Valid email is required"),
  password: ViewModel.property.string
    .validate(function(value) { return (!!value && value.length >= 10) || this.resetHover(); })
    .invalidMessage("Password must be at least 10 characters long"),
  signHover: false,
  signText() {
    return this.isNew() ? 'Sign Up' : 'Sign In';
  },
  enter() {
    if (!this.valid()) return;

    if (this.isNew()){
      Accounts.createUser({
        email: this.email(),
        password: this.password(),
        profile: {
          name: this.name()
        }
      }, function(err){
        if (err) {
          toastr.error("Could not create your user:<br>" + err.reason);
        }
      })
    } else {
      Meteor.loginWithPassword(this.email(), this.password(), function(err){
        if (err) {
          toastr.error("Could not log you in:<br>" + err.reason);
        }
      });
    }
  },
  resetPassword() {

  },
  resetHover: false,
  showRail() {
    return (this.signHover() || this.resetHover()) && this.invalid();
  },
  showEmailError() {
    return this.email.invalid() && (this.signHover() || this.resetHover());
  },
  render() {
    <div>
      <div class="ui centered grid">
    <div class="six wide column">
      <div class="ui two column grid top attached">
        <div class="column">
          <div class="ui button fluid" b="click: isNew(true), class: { positive: isNew }">I'm new here</div>
        </div>
        <div class="column">
          <div class="ui button fluid" b="click: isNew(false), class: { positive: !isNew }">I have an account</div>
        </div>
      </div>
      <div class="ui form segment attached">
        <div b="if: showRail" class="ui right rail" >
          <div class="ui red segment">
            <ul class="ui list">
              <li b="text: name.invalidMessage, if: name.invalid" />
              <li b="text: email.invalidMessage, if: email.invalid" />
              <li b="text: password.invalidMessage, if: password.invalid" />
            </ul>
          </div>
        </div>

        <div class="field required" b="if: isNew, class: { error: signHover && name.invalid }">
          <label>First Name</label>
          <div class="ui icon input">
            <input type="text" placeholder="First Name" b="value: name" />
            <i class="user icon" />
          </div>
        </div>

        <div class="field required" b="class: { error: showEmailError }">
          <label>Email</label>
          <div class="ui icon input">
            <input type="text" placeholder="Email" b="value: email, enter: enter"/>
            <i class="mail icon" />
          </div>
        </div>
        <div class="field required" b="class: { error: signHover && password.invalid }">
          <label>Password</label>
          <div class="ui icon input">
            <input type="password" b="value: password, enter: enter"/>
            <i class="lock icon" />
          </div>
        </div>
        <div class="ui button" b="click: enter, text: signText, class: { primary: valid && !resetHover }, hover: signHover"></div>
        <hr/>
        <div class="field" b="if: !isNew">
          <label>Forgot Password</label>
            <button class="ui button" b="click: resetPassword, hover: resetHover, class: { orange: email.valid && resetHover }"><i class="flag outline icon" />Reset password</button>

        </div>

      </div>
    </div>
  </div>

    </div>
  }
});