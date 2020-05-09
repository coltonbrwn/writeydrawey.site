import Logo from './svg/logo'

export default class Nav extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <div className="nav">
        {
          !this.props.noLogo && (
            <div className="logo">
              <a href="/">
                <Logo />
              </a>
            </div>
          )
        }
        {
          this.props.textOverride
            ? (
              <div className="text">
                <h2>{ this.props.textOverride }</h2>
              </div>
            ) : (
              <div className="links">
                <h2>
                  <a href="/new">new game</a>
                </h2>
                <h2>
                  <a href="/rules">rules</a>
                </h2>
                {
                  !this.props.noHome && (
                    <h2>
                      <a href="/">home</a>
                    </h2>
                  )
                }
              </div>
            )
        }
      </div>
    )
  }

}
