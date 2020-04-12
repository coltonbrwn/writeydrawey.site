import createCardStacks from '../lib/create-card-stacks';

export default class Home extends React.Component {

  render() {

    const cardStacks = createCardStacks(this.props.gameState)

    return (
      <div>
        <h1>Game Over!</h1>
        <h3>Game results below</h3>

        <a href="/">
          <button className="large">
            Back Home
          </button>
        </a>

        {
          cardStacks.map( c => (
            <div key={ c.player.playerId }>
              <h1 style={{ paddingTop: '4em', fontWeight: 'bold' }}>{ c.player.playerName }</h1>
              {
                c.cards.map( input => (
                  <div>
                    {
                      input.phrase ? (
                        <h3 style={{ padding: '4em 2em' }}>{input.phrase}</h3>
                      ) : (
                        <img src={input.drawing} style={{
                          border: "2px solid var(--black-ln)",
                          width: '50%'
                        }}/>
                      )
                    }
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    )
  }
}
