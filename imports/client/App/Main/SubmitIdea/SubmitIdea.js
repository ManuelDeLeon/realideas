SubmitIdea({
  isNew: true,
  render(){
    <div>
      <NewIdea b="if: isNew" />
      <Submitted b="if: !isNew" />
    </div>
  }
})