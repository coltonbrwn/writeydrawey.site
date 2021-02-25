import Logo from '../svg/logo'
import Rain from '../svg/rain'
import NavInner from '../nav/nav-inner'

import interpolatePosition from './interpolatePosition'

export default class HomepageBackground extends React.Component {

    interpolatePosition = interpolatePosition.bind(this)

    render() {
        const isFixedPosition = this.props.completionRatio < 0.66666;
        return (
            <div
                className="homepage-background"
                style={{ position: isFixedPosition ? 'fixed' : 'relative'}}
            >
                <div className="homepage-background__nav-inner">
                    <NavInner />
                </div>
                <div
                    style={ this.interpolatePosition(
                        { top: 40, left: 40, zoom: 0.95},
                        { top: 40, left: 40, zoom: 1.1}
                    )}
                    className="logo"
                >
                    <Logo />
                </div>
                <img
                    style={ this.interpolatePosition(
                        { left: 2, top: 14 },
                        { left: 2, top: 22 }
                    )}
                    className="hpb-sun"
                    src="/homepg-images/sad-sun.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 26, right: 27}
                    )}
                    className="hpb-doug"
                    src="/homepg-images/doug.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 0, left: 0},
                        { bottom: 5, left: -10}
                    )}
                    className="hpb-hills"
                    src="/homepg-images/hill-left.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 0, right: 0},
                        { bottom: 5, right: -10 }
                    )}
                    className="hpb-hills"
                    src="/homepg-images/hill-right.png"
                />
                <div
                    style={ this.interpolatePosition(
                        { top: 42, right: 12 },
                        { top: 42, right: 6 },
                    )}
                    className="rain"
                >
                    <Rain />
                </div>
                <img
                    style={ this.interpolatePosition(
                        { left: 30, top: 10, rotation: 4},
                        { left: 40, top: 2, rotation: -2},
                    )}
                    className="hpb-plane"
                    src="/homepg-images/snake-plane.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { right: 8, top: 24 },
                        { right: 2, top: 24 }
                    )}
                    className="hpb-dog-cloud"
                    src="/homepg-images/dog-cloud.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { left: 14, bottom: 15 },
                        { left: 3, bottom: 15 }
                    ) }
                    className="hpb-bear"
                    src="/homepg-images/bear.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { left: 24, bottom: 6 },
                        { left: 14, bottom: 6 }
                    )}
                    className="hpb-dog"
                    src="/homepg-images/dog.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 2, right: 2,  rotation: 0},
                        { bottom: 2, right: -8, rotation: 2 }
                    )}
                    className="hpb-snake"
                    src="/homepg-images/long-snake.png"
                />
            </div>
        )
    }
}