import classNames from 'classnames'
import Button from './button'
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
    isVertical=false,
    hasError=false,
    placeholder
}) {

    const Line = [
        <Line2 />,
        <Line3 />,
        <Line1 />
    ][ lineType ]

    return (
        <div className={
            classNames("input-container-flex", {
                'input-container-flex--vertical': isVertical,
                'input-container--error': hasError
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
                    placeholder={ placeholder }
                />
                <div className="input-drawnline">
                    <Line2 />
                </div>
            </span>
        </div>
    )
}