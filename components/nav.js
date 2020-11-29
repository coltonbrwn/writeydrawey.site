import Logo from './svg/logo'
import { FeedbackFish } from '@feedback-fish/react'

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
                <h3>{ this.props.textOverride }</h3>
              </div>
            ) : (
              <div className="links">
                <h2>
                  <a href="/new">new game</a>
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
