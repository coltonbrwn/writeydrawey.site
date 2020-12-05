import Logo from './logo'
import Button from './button'

export default (props) => (
    <div className="content-container ctr-adjust-pad">
        <div className="nav">
            <Logo />
        </div>
        <div className="flex-container">
            <h2>This game is currently being played</h2>
            <a href="/">
              <Button type="2">
                Go Home
              </Button>
            </a>
        </div>
    </div>
)