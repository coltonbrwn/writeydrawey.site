import Link from 'next/link'

import Nav from '../nav/index'
import HomepageBackground from './homepage-background'
import RoughLink from '../ui/rough-link'
import Button from '../ui/button'
import Logo from '../ui/logo'
import Squiggle from '../svg/squiggle-field'
import Twitter from '../svg/twitter-icon'
import Email from '../svg/email-icon'
import copy from './copy'

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
        scrollY: window.scrollY,
        scrollRatio: (window.scrollY - clientTop) / clientHeight
      })
    }, 28)
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
                { copy.federer_dialogue }
              </p>
              <img src="/homepg-images/federer.png" />
            </div>
          </div>
          <div className="federer-dialogue__squiggle-border">
            <Squiggle />
          </div>
        </div>
        <div className="three-step">
          <div className="content-container">
            <div className="three-step__step">
              <img src="/homepg-images/step-1.png" />
              <div className="three-step__step__text">
                <div className="rough-notation__homepage-step">
                  <h2>Step 1</h2>
                </div>
                <p>
                  { copy.step_1 }
                </p>
              </div>
            </div>
            <div className="three-step__step">
              <img src="/homepg-images/step-2.png" />
              <div className="three-step__step__text">
                <div className="rough-notation__homepage-step">
                  <h2>Step 2</h2>
                </div>
                <p>
                  { copy.step_2 }
                </p>
              </div>
            </div>
            <div className="three-step__step">
              <img src="/homepg-images/step-3.png" />
              <div className="three-step__step__text">
                <div className="rough-notation__homepage-step">
                  <h2>Step 3</h2>
                </div>
                <p>
                  { copy.step_3 }
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="social">
          <div className="social__squiggle-border">
            <Squiggle />
          </div>
          <div className="content-container flex-container">
            <div className="social__left">
              <img src="/homepg-images/margin-l.png" />
            </div>
            <div className="social__center">
              <h3>
                { copy.social_blurb }
              </h3>
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
        <div className="version">
          <div className="content-container">
            <div className="version__header">
              <h3>
                { copy.changes_header }
              </h3>
            </div>
            <div className="flex-container">
              {
                copy.changes_topics.map( (topic, i) => (
                  <div className="version__topic" key={i}>
                    <h2>{ topic.title }</h2>
                    <p>
                      { topic.body }
                    </p>
                    <div className="mono">
                      <RoughLink href={ topic.href } style="underline">
                        { topic.cta }
                      </RoughLink>
                    </div>
                  </div>   
                ))
              }
            </div>
          </div>
        </div>
        <div className="cta">
          <div className="content-container">
            <div className="flex-container">
              <div className="cta__logo">
                <Logo />
              </div>
              <div className="cta__socials">
                  <h3><Twitter /> @writeydrawey</h3>
              </div>
              <div className="cta_button">
                <Link href="/new">
                  <a>
                    <Button>
                      Play Now
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
