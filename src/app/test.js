const element = <TouchPlayerWrapper>
        <VideoPlayer/>
    </TouchPlayerWrapper>;


document.body.addEventListener('keypress', function(event){
    console.log(event.keyCode);
})

ReactDOM.render(
  element,
  document.getElementById('body')
);