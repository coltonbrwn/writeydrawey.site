console.log('HI')

$(function() {
  $('#undo').click(window.globals.onUndoClick)
  $('#photo').click(onPhotoClick)
})

window.globals = {
  onUndoClick: function() {}
}

function onPhotoClick() {
  var canvas = document.getElementById('myCanvas');
  var dataURL = canvas.toDataURL("image/png");
  document.location = dataURL;
}
