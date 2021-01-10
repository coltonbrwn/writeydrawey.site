import Logo from './logo'
import TurnTimer from './turn-timer'

export default ({ gameState }) => {
    const roundTimer = gameState.timers.find( item => item.round === gameState.round && item.playerId === '0')
    return (
        <div className="content-container ctr-adjust-pad">
            <div className="nav">
                <Logo />
            </div>
            <div className="flex-container">
                <h2>
                    Next round in <TurnTimer timer={ roundTimer } />
                </h2>
            </div>
        </div>
    )
}