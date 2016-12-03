import '../Mixins/loadMixins';

AccountsTemplates.configure({
  confirmPassword: false,
  showForgotPasswordLink: true
});

const ViewModelExplorer = process.env.NODE_ENV === 'production' ?
  (()=> null)
  : require('viewmodel-react-explorer').ViewModelExplorer;

App({
  mixin: {
    user: 'user'
  },
  loggingInDisplay() {
    return this.user.loggingIn() ? "none" : "block";
  },
  render() {
    <div>
      <div  class="ui one column centered grid">
        <div b="style: { display: loggingInDisplay }" class="column" style="max-width: 1024px; margin: 30px;">
          <Main b="if: user.logged" />
          <Introduction b="if: !user.logged" />
        </div>
      </div>
      <div  class="ui one column centered grid">
        <a href="mailto:everyone@realideas.site">Contact Us</a>
      </div>
    </div>
  }
})