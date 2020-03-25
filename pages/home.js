import Router from 'next/router';
import Layout from '../components/layout';
import { get } from 'dotty';
import { debounce } from 'throttle-debounce'

import "../styles/styles.scss";

export default class Home extends React.Component {

  onUndoClick = () => {
    document.getElementById('drawingCanvas').contentWindow.globals.undo()
  }

  onPhotoClick = () => {
    const dataURL = document.getElementById('drawingCanvas').contentWindow.document.getElementById('myCanvas').toDataURL("image/png");
    document.location = dataURL;
  }

  render() {
    return (
      <Layout theme="light">
        <div className="buttons">
          <button onClick={ this.onUndoClick }>
            Undo
          </button>
          <button onClick={ this.onPhotoClick }>
            Photo
          </button>
        </div>
        <iframe id="drawingCanvas" src="/canvas/index.html" />
      </Layout>
    );
  }

}
