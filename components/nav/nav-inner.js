import Button from '../ui/button'

export default function NavInner() {
    return [
        <div className="nav__links" key="1">
            <a href="/credits">credits</a>
            <a href="/gallery">gallery</a>
            <a href="/">feedback</a>
        </div>,
        <a href="/new" key="2">
            <Button type={ 2 }>
                Play Now
            </Button>
        </a>
    ]
}