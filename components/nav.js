import Logo from './svg/logo'
import * as api from '../lib/api';

export default class Nav extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  onNewGameClick = async () => {
    let id;
    try {
      const {response:{id}} = await api.createNewGame();
      document.location = `/${ id }`;
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="nav">
        {
          !this.props.noLogo && (
            <div className="logo">
              <Logo />
            </div>
          )
        }
        <div className="links">
          <h2>
            <span onClick={ this.onNewGameClick }>
              new game
            </span>
          </h2>
          <h2>
            <a href="/rules">rules</a>
          </h2>
          {
            !this.props.noHome && (
              <h2>
                <a href="/">home</a>
              </h2>
            )
          }
        </div>
      </div>
    )
  }

}
