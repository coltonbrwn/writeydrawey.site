import Logo from './svg/logo'
import Rain from './svg/rain'

export default class HomepageBackground extends React.Component {

    interpolatePosition(initial, _final) {
        const final = _final || initial
        const {top: initTop, right: initRight, bottom: initBottom, left: initLeft, zoom: initZoom=1, rotation: initRot=0} = initial
        const {top: finalTop, right: finalRight, bottom: finalBottom, left: finalLeft, zoom: finalZoom=1, rotation: finalRot=0} = final
        const r = this.props.completionRatio
        return {
            top: initTop + (finalTop - initTop) * r + '%',
            right: initRight + (finalRight - initRight) * r + '%',
            bottom: initBottom + (finalBottom - initBottom) * r + '%',
            left: initLeft + (finalLeft - initLeft) * r + '%',
            transform: `scale(${ initZoom + (finalZoom - initZoom) * r }) rotate(${ initRot + (finalRot - initRot) * r }deg)`
        }
    }

    render() {
        return (
            <div className="homepage-background">
                <div
                    style={ this.interpolatePosition(
                        { top: 40, left: 40, zoom: 0.95},
                        { top: 40, left: 40, zoom: 1}
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
                        { bottom: -15, left: 0}
                    )}
                    className="hpb-hills"
                    src="/homepg-images/hills.png"
                />
                <div
                    style={ this.interpolatePosition(
                        { top: 42, right: 12 }
                    )}
                    className="rain"
                >
                    <Rain />
                </div>
                <img
                    style={ this.interpolatePosition(
                        { left: 20, top: 10},
                        { left: 50, top: 2},
                    )}
                    className="hpb-plane"
                    src="/homepg-images/snake-plane.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { right: 8, top: 24 },
                        { right: 7.5, top: 24 }
                    )}
                    className="hpb-dog-cloud"
                    src="/homepg-images/dog-cloud.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { left: 14, bottom: 15 }
                    ) }
                    className="hpb-bear"
                    src="/homepg-images/bear.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { left: 24, bottom: 6 }
                    )}
                    className="hpb-dog"
                    src="/homepg-images/dog.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 2, right: 2,  rotation: 0},
                        { bottom: 2, right: 2, rotation: 2 }
                    )}
                    className="hpb-snake"
                    src="/homepg-images/long-snake.png"
                />
            </div>
        )
    }
}