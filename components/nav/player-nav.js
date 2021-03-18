import GameOverviewNav from './game-overview-nav'
import Logo from '../svg/logo'

export default function Nav({ gameState, viewer }) {
    return (
        <div className="nav--player">
            <a href="/">
                <Logo />
            </a>
            { gameState && viewer && (
                <GameOverviewNav gameState={ gameState } viewer={ viewer } />
            )}
        </div>
    )
}