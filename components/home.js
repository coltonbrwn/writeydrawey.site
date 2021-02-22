import UserInfo from './user-info'
import HomepageBackground from './homepage-background'

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
        <div className="home flex-container federer-dialogue">
          <div className="content-container">
            <img src="/homepg-images/federer.png" />
          </div>
        </div>
      </div>
    )
  }
}
