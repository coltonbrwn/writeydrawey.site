import Button from '../ui/button'

export default function NavInner() {
    return [
        <div className="nav__links">
            <a href="/credits">credits</a>
            <a href="/gallery">gallery</a>
            <a href="/">feedback</a>
        </div>,
        <Button type={4}>
            <a href="/new">
            New Game
            </a>
        </Button>
    ]
}