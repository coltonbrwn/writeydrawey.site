import Button from './button'

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
        <Button onClick={ this.onUndoClick }>
          Undo
        </Button>
        <Button onClick={ this.onPhotoClick }>
          Photo
        </Button>
      </div>
      <iframe id="drawingCanvas" src="/canvas/index.html" />
    </div>
  }
}
