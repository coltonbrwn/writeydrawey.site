import classNames from 'classnames'

import NavInner from './nav-inner'
import Line from '../svg/line'
import Logo from '../ui/logo'

export default function Nav({ hidden, selection }) {
    return (
        <div className={ classNames("nav nav--main", { "hidden": hidden } )}>
            <div className="nav__logo">
                <Logo />
            </div>
            <NavInner selection={ selection } />
            <div className="nav__line">
                <Line />
            </div>
        </div>
    )
}