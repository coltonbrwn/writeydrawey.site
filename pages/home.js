import { throttle } from 'throttle-debounce';
import { CSSTransition } from 'react-transition-group';

import Page from '../components/Page';
import Layout from '../components/Layout';
import HomeHero from '../components/home-hero';
import Contact from '../components/contact';
import About from '../components/about';
import Stack from '../components/Stack';
import Fin from '../components/fin';
import ProjectDetail from '../components/project-detail';
import { mockStackImages, tribuneImages, schermerhornImages, PropsForType } from '../lib/constants';

import "../styles/styles.scss";

const MAX_VIDEO_OPACITY = 0.4;
const DISTANCE_THRESHOLD = 200;

let activeChild;

export default class Home extends Page {

  static slug = 'home'

  constructor() {
    super();
    this.state = {
      videoOpacity: MAX_VIDEO_OPACITY,
      noLogo: true,
      isProjectDetail: false
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      const videos = document.getElementsByTagName('video');
      for (let el of videos) {
        el.play();
      }
    }, 650);

    window.setInterval(this.updateScroll.bind(this), 100 );
  }

  updateScroll = () => {
    activeChild = null;
    try {
      const scrollContainer = document.getElementById('scrollContainer');
      const scrollPosition = scrollContainer.scrollTop;
      [].forEach.call(scrollContainer.children, child => {
        if (Math.abs(scrollPosition - child.offsetTop) < DISTANCE_THRESHOLD ) {
          activeChild = child;
        }
      });

      let propsForType = activeChild
        ? PropsForType[activeChild.dataset.frametype]
        : PropsForType['null']

      let activeFrameId = activeChild
        ? activeChild.dataset.frameid
        : null

      if (this.state.isProjectDetail) {
        propsForType = PropsForType.projectDetail
      }

      this.setState({
        ...propsForType,
        activeFrameId
      });

    } catch (e) {
      console.log(e);
    }
  }

  onDetailClick = () => {
    this.setState({
      isProjectDetail: true
    })
  }

  onCloseClick = () => {
    this.setState({
      isProjectDetail: false
    })
  }

  render() {
    return (
      <Layout
        { ...this.props }
        logo={ this.state.logo }
        controls={ this.state.controls }
        inspect={ this.state.inspect }
        text={ this.state.text }
        close={ this.state.close }
        onDetailClick={ this.onDetailClick }
        onCloseClick= { this.onCloseClick }
      >
        <video
          hidden
          className="bg-video"
          style={{ opacity: this.state.videoOpacity }}
          src="https://volley-dev.s3.amazonaws.com/TerracelivingVignette_WonW.mp4"
          autoPlay loop muted
        />
        <div className="scroll-hider">
          <div
            className="content-main"
            id="scrollContainer"
          >
            <CSSTransition
              in={ this.state.isProjectDetail }
              unmountOnExit
              classNames="transition"
              timeout={ 500 }
            >
              { state => (
                <ProjectDetail />
              )}
            </CSSTransition>
            <HomeHero
              isActiveFrame={ this.state.activeFrameId == "0" }
              frameType="homeHero"
              frameId={ 0 }
            />
            <Stack
              id="portfolio"
              frameId={ 1 }
              frameType="portfolioItem"
              images={ mockStackImages }
              isActiveFrame={ this.state.activeFrameId == "1" }
              isExpanded={ this.state.isProjectDetail }
            />
            <Stack
              frameId={ 2 }
              frameType="portfolioItem"
              images={ schermerhornImages }
              isActiveFrame={ this.state.activeFrameId == "2" }
              isExpanded={ this.state.isProjectDetail }
            />
            <Stack
              frameId={ 3 }
              frameType="portfolioItem"
              images={ tribuneImages }
              isActiveFrame={ this.state.activeFrameId == "3" }
              isExpanded={ this.state.isProjectDetail }
            />
            <About />
            <Contact />
            <Fin />
          </div>
        </div>
      </Layout>
    )
  }
}
