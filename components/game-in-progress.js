import Button from './ui/button'
import Nav from './nav/index.js'

export default (props) => (
    <div className="full-height">
        <Nav />
        <div className="flex-container full-height">
          <p>This game is already in progress</p>
            <a href="/">
                <Button>
                    Home
                </Button>
            </a>
        </div>
    </div>
)