
import Link from 'next/link'

import Logo from './svg/logo';
import * as api from '../lib/api';

export default class Home extends React.Component {

  onCreateClick = async () => {
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
      <div className="full-height">
        <div className="nav">
          <div>
            <Link href="/">
              <a>New Game</a>
            </Link>
          </div>
          <div>
            <Link href="/rules">
              <a>Rules</a>
            </Link>
          </div>
        </div>
        <div className="home">
          <div className="logo">
            <Logo />
          </div>
        </div>
        {
          this.props.statusCode == 404 && (
            <p>We couldn't find a game here</p>
          )
        }
      </div>
    )
  }
}
