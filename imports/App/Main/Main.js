Main({
  logout(){
    Meteor.logout();
  },
  render(){
    <div>
      <button class="ui button" b="click: logout">Logout</button>
      <h1>Main</h1>
    </div>

  }
})