import Button from "./button"

export default class PlayerInput extends React.Component {

  constructor() {
    super()
    this.state = {
      playerName: '',
      phrase: ''
    }
  }

  onNameInputChanage = e => {
    this.setState({
      playerName: e.target.value
    })
  }

  onPhraseInputChange = e => {
    this.setState({
      phrase: e.target.value
    })
  }

  onClick = async () => {
    try {
      this.props.onSubmit({ 
        playerName: this.state.playerName,
        phrase: this.state.phrase
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {

    let CTAComponent;
    switch (this.props.parentComponentType) {
        case 'join-game':
            CTAComponent = p => (
                <Button { ...p }>
                    Join Game
                </Button>
            )
            break;
        case 'new':
            CTAComponent = p => (
                <Button { ...p }>
                    New Game
                </Button>
            )
        default:
            break;
    }
    return (
        <div className="join flex-container">
            <div className="input-container">
            <div className="input-container-flex">
                <h3 className="mono">your name:</h3>
                <span className="input-wrapper">
                <input onChange={ this.onNameInputChanage } />
                </span>
            </div>
            <div className="input-container-flex">
                <h3 className="mono">a phrase:</h3>
                <span className="input-wrapper">
                <input onChange={ this.onPhraseInputChange } />
                <span className="subtext">
                    (anything)
                </span>
                </span>
            </div>
            </div>
            <CTAComponent onClick={ this.onClick }/>
        </div>
    )
  }
}
