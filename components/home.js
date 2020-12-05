import Logo from './svg/logo';
import Nav from './nav';

export default class Home extends React.Component {

  render() {
    return (
      <div className="content-container">
        <Nav noLogo noHome={ this.props.statusCode !== 404 }/>
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
