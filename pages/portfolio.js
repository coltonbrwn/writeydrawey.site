import Page from '../components/Page'
import Layout from '../components/Layout'
import Stack from '../components/Stack'

import "../styles/styles.scss"

const stackImages = [
  {
    src: '/static/demo-images/02_Tribune_white.jpg',
    activeSrc: '/static/demo-images/02_Tribune.jpg',
    cta: 'Read about the Tribune Project',
    id: '1'
  },
  {
    src: '/static/demo-images/04_TheShed_white.jpg',
    activeSrc: '/static/demo-images/04_TheShed.jpg',
    cta: 'Read about the Shed Project',
    id: '2'
  },
  {
    src: '/static/demo-images/03_Couch_white.jpg',
    activeSrc: '/static/demo-images/03_Couch.jpg',
    cta: 'See our Rendering Work',
    id: '3'
  }
]

const projectDemo = [
  {
    title: 'Moynihan Train Hall',
    credit: 'Designed by SOM',
    location: 'Located in New York, NY',
    type: 'Type: Rendering'
  },
  {
    title: 'The Hub',
    credit: 'Designed by & Partners',
    location: 'Located in Brooklyn, NY',
    type: 'Type: Rendering'
  },
  {
    title: '318 West 47',
    credit: 'Designed by SOM',
    location: 'Located in New York, NY',
    type: 'Type: Rendering'
  },
  {
    title: 'Hamptons House',
    credit: 'Designed by Rene Gonzolez Architecture',
    location: 'Located in Southampton, NY',
    type: 'Type: Rendering'
  },
]

export default class Porfolio extends Page {

  static slug = 'home'

  constructor() {
    super()
    this.state = {
      isStackVisible: false
    }
  }

  makeVisible = () => {
    this.setState({
      isStackVisible: true
    })
  }

  makeInvisible = () => {
    this.setState({
      isStackVisible: false
    })
  }

  render() {
    return (
      <Layout { ...this.props }>
        <div className="content-main">
          <div className="flex-container flex-bottom flex-col">
            <Stack
              key="portfolio"
              className="portfolio-stack"
              style={{ display: 'static' }}
              imgWidth={ 400 }
              images={ stackImages }
              isVisible={ this.state.isStackVisible }
              position={['center', 'center']}
            />
            <div className="porfolio-projects">
              {
                [1,2,3,4,5].map( () => (
                  <div className="col-6">
                    {
                      projectDemo.map( project => (
                        <div
                          className="inline-block"
                          key={ project.title }
                          onMouseEnter={ this.makeVisible }
                          onMouseLeave={ this.makeInvisible }
                        >
                          <p className="inline-block cursor-pointer">
                            <a href="/project">
                              <strong>{ project.title }</strong><br/>
                              { project.credit }<br/>
                              { project.location }<br/>
                              { project.type }<br/>
                            </a>
                          </p>
                        </div>
                      ))
                    }
                  </div>
                ))
              }
              <div className="col-6 pad-sides" />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}