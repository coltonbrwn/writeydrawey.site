import GameOverviewNav from './game-overview-nav'
import Logo from '../svg/logo'

export default function Nav({ gameState, viewer }) {
    return (
        <div className="nav--player">
            <a href="/">
                <Logo />
            </a>
            <GameOverviewNav gameState={ gameState } viewer={ viewer } />
        </div>
    )
}