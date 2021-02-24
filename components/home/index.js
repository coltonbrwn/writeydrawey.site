import UserInfo from '../user-info'
import HomepageBackground from './homepage-background'
import SocialBackground from './social-background'

export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {}
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
      <div className="full-height">
        <div className="nav">
          <div className="links">
            <h2>
              <a href="/credits">credits</a>
            </h2>
            <h2>
              <a href="/gallery">gallery</a>
            </h2>
            <h2>
              <a href="/new">new game</a>
            </h2>
          </div>
          <UserInfo />
        </div>
        <div className="home flex-container mural" id="scrollArea">
          {
            this.props.statusCode == 404 ? (  
              <p>We couldn't find a game here</p>
            ) : (
              <HomepageBackground completionRatio={ this.state.scrollRatio } />
            )
          }
        </div>
        <div className="home federer-dialogue">
          <div className="content-container">
            <img src="/homepg-images/federer.png" />
          </div>
        </div>
        <div className="home three-step">
          <div className="content-container">
            <div className="three-step__step">
              <img src="/homepg-images/step-1.png" />
              <div>
                <h2>step 1.</h2>
                <p>
                  Each player comes up with a word or phrase and writes it down. “Lollipop”, “Roger Federer”, or “Aladin”. Anything goes.
                </p>
              </div>
            </div>
            <div className="three-step__step">
              <img src="/homepg-images/step-2.png" />
              <div>
                <h2>step 2.</h2>
                <p>
                  The phrases are shuffled among all players, then everyone attempts to draw the phrase they’ve received.
                </p>
              </div>
            </div>
            <div className="three-step__step">
              <img src="/homepg-images/step-3.png" />
              <div>
                <h2>step 3.</h2>
                <p>
                  The drawings are rotated around the group with each player describing the image with a new phrase. The cycle repeats until the game is up and everyone’s submissions are revealed
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="home social flex-container full-height">
          <div className="content-container">
            <h3>Great for video chats with friends, family, and coworkers</h3>
            <div className="social-image">
              <img src="/homepg-images/social.png" />
            </div>
          </div>
          <SocialBackground completionRatio={ 1 } />
        </div>
        <div className="home flex-container cta">
          <img src="/homepg-images/start-game-button.png" />
        </div>
      </div>
    )
  }
}
