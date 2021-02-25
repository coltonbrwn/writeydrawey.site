import Button from './ui/button'

export default (props) => (
    <div className="content-container ctr-adjust-pad">
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