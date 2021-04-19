import Link from 'next/link'
import { annotate } from 'rough-notation';

export default class RoughLink extends React.Component {

    constructor() {
        super()
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.annotation = annotate(this.ref.current, { type: this.props.style || 'circle' });
    }

    mouseEnter = () => {
        this.annotation.show()
    }

    mouseLeave = () => {
        this.annotation.hide()
    }

    render() {
        return (
            <span
                style={{ position: 'relative' }}
                onMouseEnter={ this.mouseEnter }
                onMouseLeave={ this.mouseLeave }
            >
                <span ref={ this.ref }>
                    <Link href={ this.props.href }>
                        <a>{ this.props.children }</a>
                    </Link>
                </span>
            </span>
        )
    }
}