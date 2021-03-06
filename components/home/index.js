import Nav from '../nav/index'
import HomepageBackground from './homepage-background'
import Button from '../ui/button'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {
      scrollRatio: 0
    }
  }

  componentDidMount() {
    const { clientHeight, clientTop } = document.getElementById('scrollArea');
    this.interval = window.setInterval(() => {
      this.setState({
        scrollRatio: (window.scrollY - clientTop) / clientHeight
      })
    }, 30)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval)
  }

  render() {
    return (
      <div className="full-height home">
        <Nav hidden={ this.state.scrollRatio < 1 } />
        <div className="home flex-container mural" id="scrollArea">
          <HomepageBackground completionRatio={ this.state.scrollRatio } />
        </div>
        <div className="federer-dialogue">
          <div className="content-container">
            <div className="federer-dialogue__container">
              <p className="federer-dialogue__text">
                Writey Drawey is a free web game you play with your friends over video chat. To start, each player must add their name and write a secret phrase. When the host is ready, they’ll start the game.
              </p>
              <img src="/homepg-images/federer.png" />
            </div>
          </div>
        </div>
        <div className="three-step">
          <div className="content-container">
            <div className="three-step__step">
              <img src="/homepg-images/step-1.png" />
              <div className="three-step__step__text">
                <h2>step 1.</h2>
                <p>
                  Each player comes up with a word or phrase and writes it down. “Lollipop”, “Roger Federer”, or “Aladin”. Anything goes.
                </p>
              </div>
            </div>
            <div className="three-step__step">
              <img src="/homepg-images/step-2.png" />
              <div className="three-step__step__text">
                <h2>step 2.</h2>
                <p>
                  The phrases are shuffled among all players, then everyone attempts to draw the phrase they’ve received.
                </p>
              </div>
            </div>
            <div className="three-step__step">
              <img src="/homepg-images/step-3.png" />
              <div className="three-step__step__text">
                <h2>step 3.</h2>
                <p>
                  The drawings are rotated around the group with each player describing the image with a new phrase. The cycle repeats until the game is up and everyone’s submissions are revealed
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="social">
          <div className="content-container flex-container">
            <div className="social__left">
              <img src="/homepg-images/margin-l.png" />
            </div>
            <div className="social__center">
              <h3>Great for video chats with friends, family, and coworkers</h3>
              <div className="social-image">
                <img src="/homepg-images/social.png" />
              </div>
              <div className="social__bottom">
                <img src="/homepg-images/margin-b.png" />
              </div>
            </div>
            <div className="social__right">
              <img src="/homepg-images/margin-r.png" />
            </div>
          </div>
        </div>
        <div className="flex-container cta">
          <Button>
            Play Now
          </Button>
          <h3>
            <br/>
            Follow us @writeydrawey
          </h3>
        </div>
        <div className="footer">

        </div>
      </div>
    )
  }
}
