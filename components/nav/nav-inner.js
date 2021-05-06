import Link from 'next/link'
import Button from '../ui/button'
import RoughLink from '../ui/rough-link'
import Hamburger from '../svg/hamburger'
import Cross from '../svg/cross'

const blogLink = "https://blog.coltonbrown.com/the-game-that-almost-died-during-covid-and-how-i-made-it-an-app-fa485eed546e"

let isMobileNavOpen = false;
const toggleMobileNav = () => {
    const main = document.getElementById('main')
    if (!isMobileNavOpen) {
        main.classList.add('mobile--open')
    } else {
        main.classList.remove('mobile--open')
    }
    isMobileNavOpen = !isMobileNavOpen
}

export default function NavInner() {
    return [
        <div
            className="nav__hamburger"
            onClick={ toggleMobileNav }
        >
            <Hamburger />
        </div>,
        <div className="nav__links" key="1">
            <RoughLink href={ blogLink } style="underline">
                about
            </RoughLink>
            <RoughLink href="/gallery" style="circle">
                gallery
            </RoughLink>
        </div>,
        <div className="nav__cta" key="2">
            <Link href="/new">
                <a>
                    <Button type={ 2 }>
                        New Game
                    </Button>
                </a>
            </Link>
        </div>
    ]
}

export function MobileNav() {
    return (
        <div className="nav__mobile">
            <div
                className="nav__close-button"
                onClick={ toggleMobileNav }
            >
                <Cross />
            </div>
            <div className="nav__mobile__links">
                <RoughLink
                    href={ blogLink }
                    style="underline"
                    onClick={ toggleMobileNav }
                >
                    about
                </RoughLink>
                <RoughLink
                    href="/gallery"
                    style="circle"
                    onClick={ toggleMobileNav }
                >
                    gallery
                </RoughLink>
            </div>
            <div>
                <Link href="/new">
                    <a>
                        <Button type={ 2 }>
                            New Game
                        </Button>
                    </a>
                </Link>
            </div>
        </div>
    )
}

