import Line2 from '../svg/line-2'
import Line3 from '../svg/line-3'

const noop = ()=>{}

export default function Input({
    lineType,
    label,
    onChange=noop,
    onKeyDown=noop,
    disabled,
    value
}) {

    const Line = [
        <Line2 />,
        <Line3 />
    ][ lineType || 0]

    return (
        <div className="input-container-flex">
            <h3 className="mono input-label">{ label }</h3>
            <span className="input-wrapper">
                <input
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