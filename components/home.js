import Logo from './svg/logo'
import UserInfo from './user-info'

export default class Home extends React.Component {

  render() {
    return (
      <div className="content-container">
        <div className="nav">
          <div className="links">
            <h2>
              <a href="/new">new game</a>
            </h2>
          </div>
          <UserInfo />
        </div>
        <div className="home flex-container">
          {
            this.props.statusCode == 404 ? (
              <p>We couldn't find a game here</p>
            ) : (
              <div className="logo">
                <Logo />
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
