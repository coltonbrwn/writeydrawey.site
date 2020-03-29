
export default class Test extends React.Component {

  onUndoClick = () => {
    document.getElementById('drawingCanvas').contentWindow.globals.undo()
  }

  onPhotoClick = () => {
    const dataURL = document.getElementById('drawingCanvas').contentWindow.document.getElementById('myCanvas').toDataURL("image/png");
    document.location = dataURL;
  }


  render() {
    <div>
      <div className="buttons">
        <button onClick={ this.onUndoClick }>
          Undo
        </button>
        <button onClick={ this.onPhotoClick }>
          Photo
        </button>
      </div>
      <iframe id="drawingCanvas" src="/canvas/index.html" />
    </div>
  }
}
