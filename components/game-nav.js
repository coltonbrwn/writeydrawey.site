import Logo from './svg/logo'
import TurnTimer from './turn-timer';

export default class GameNav extends React.Component {

  constructor() {
    super();
  }

  render() {
    const currentRound = this.props.gameState.rounds.find( item => item.num === this.props.gameState.round );
    if (!currentRound) {
      return (
        <div />
      )
    }
    return (
      <div className="nav">
        <div className="logo">
          <a href="/">
            <Logo />
          </a>
        </div>
        <div className="text">
          <h4>
            <TurnTimer countTo={ currentRound.end } />
          </h4>
        </div>
      </div>
    )
  }

}
