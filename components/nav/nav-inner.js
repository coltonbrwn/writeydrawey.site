import Link from 'next/link'
import Button from '../ui/button'
import RoughLink from '../ui/rough-link'

export default function NavInner() {
    return [
        <div className="nav__links" key="1">
            <RoughLink href="/about" style="underline">
                about
            </RoughLink>
            <RoughLink href="/gallery" style="circle">
                gallery
            </RoughLink>
            <RoughLink href="/" style="underline">
                feedback
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