import Logo from '../svg/logo'
import Rain from '../svg/rain'
import interpolatePosition from './interpolatePosition'

export default class SocialBackground extends React.Component {

    interpolatePosition = interpolatePosition.bind(this)

    render() {
        return (
            <div className="social-background">
                <img
                    style={ this.interpolatePosition(
                        { left: 10, top: 2 }
                    )}
                    className="hps-pineapple"
                    src="/homepg-images/pineapple.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { left: 4, top: 26 }
                    )}
                    className="hps-dinosaur"
                    src="/homepg-images/dinosaur.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { left: 10, top: 50 }
                    )}
                    className="hps-sadbiscuit"
                    src="/homepg-images/sadbiscuit.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { left: 5, bottom: 5 }
                    )}
                    className="hps-bedguy"
                    src="/homepg-images/bedguy.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 4, left: 33 }
                    )}
                    className="hps-frog"
                    src="/homepg-images/frog.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 4, right: 30}
                    )}
                    className="hps-rose"
                    src="/homepg-images/rose.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 6, right: 6}
                    )}
                    className="hps-crabtoe"
                    src="/homepg-images/crabtoe.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { bottom: 30, right: 3}
                    )}
                    className="hps-mouth"
                    src="/homepg-images/mouth.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { top: 30, right: 12}
                    )}
                    className="hps-scarf"
                    src="/homepg-images/scarf.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { top: 20, right: 1}
                    )}
                    className="hps-fastfood"
                    src="/homepg-images/fastfood.png"
                />
                <img
                    style={ this.interpolatePosition(
                        { top: 2, right: 8}
                    )}
                    className="hps-clover"
                    src="/homepg-images/clover.png"
                />
                    
            </div>
        )
    }
}