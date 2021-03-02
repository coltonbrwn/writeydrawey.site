import classNames from 'classnames'

import NavInner from './nav-inner'
import Line from '../svg/line'
import Logo from '../svg/logo'

export default function Nav({ hidden }) {
    return (
        <div className={ classNames("nav", { "hidden": hidden } )}>
            <div className="nav__logo">
                <a href="/"><Logo /></a>
            </div>
            <NavInner />
            <div className="nav__line">
                <Line />
            </div>
        </div>
    )
}