import classNames from 'classnames'
import Line1 from '../svg/line'
import Line2 from '../svg/line-2'
import Line3 from '../svg/line-3'

const noop = ()=>{}

export default function Input({
    disabled,
    lineType=0,
    label,
    onChange=noop,
    onKeyDown=noop,
    onFocus=noop,
    value,
    isVertical=false
}) {

    const Line = [
        <Line2 />,
        <Line3 />,
        <Line1 />
    ][ lineType ]

    return (
        <div className={
            classNames("input-container-flex", {
                'input-container-flex--vertical': isVertical
            })
        }>
            <h3 className="mono input-label">{ label }</h3>
            <span className="input-wrapper">
                <input
                    onFocus={ onFocus }
                    onChange={ onChange }
                    onKeyDown={ onKeyDown }
                    disabled={ disabled }
                    value={ value }
                />
                <div className="input-drawnline">
                    <Line2 />
                </div>
            </span>
        </div>
    )
}