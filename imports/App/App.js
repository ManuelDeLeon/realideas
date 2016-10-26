import '../Mixins/loadMixins';
const ViewModelExplorer = process.env.NODE_ENV === 'production' ?
  (()=> null)
  : require('viewmodel-react-explorer').ViewModelExplorer;

App({
  mixin: {
    user: 'user'
  },
  render() {
    <div>
      <ViewModelExplorer />
      <div  class="ui one column centered grid">
        <div class="column" style="max-width: 1024px; margin: 30px;">
          <Main b="if: user.logged" />
          <Introduction b="if: !user.logged" />
        </div>
      </div>
    </div>
  }
})