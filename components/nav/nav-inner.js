import Link from 'next/link'
import Button from '../ui/button'

export default function NavInner() {
    return [
        <div className="nav__links" key="1">
            <Link href="/credits">
                <a>credits</a>
            </Link>
            <Link href="/gallery">
                <a>gallery</a>
            </Link>
            <Link href="/">
                <a>feedback</a>
            </Link>
        </div>,
        <Link href="/new">
            <a key="2">
                <Button type={ 2 }>
                    Play Now
                </Button>
            </a>
        </Link>
    ]
}