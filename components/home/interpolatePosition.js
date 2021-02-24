export default function (initial, _final) {
    const final = _final || initial
    const {top: initTop, right: initRight, bottom: initBottom, left: initLeft, zoom: initZoom=1, rotation: initRot=0} = initial
    const {top: finalTop, right: finalRight, bottom: finalBottom, left: finalLeft, zoom: finalZoom=1, rotation: finalRot=0} = final
    const r = this.props.completionRatio;
    return {
        top: initTop + (finalTop - initTop) * r + '%',
        right: initRight + (finalRight - initRight) * r + '%',
        bottom: initBottom + (finalBottom - initBottom) * r + '%',
        left: initLeft + (finalLeft - initLeft) * r + '%',
        transform: `scale(${ initZoom + (finalZoom - initZoom) * r }) rotate(${ initRot + (finalRot - initRot) * r }deg)`
    }
}