var path;
var paths = [];
var isAnimating = false;
var SEGMENT_GROUP_PIXEL_WIDTH = 30;

function onMouseDown(event) {
  // Create a new path and set its stroke color to black:
  path = new Path({
    segments: [event.point],
    strokeColor: 'black'
  });
  path.strokeWidth = 4;
  path.strokeCap = 'round';
  path.strokeJoin = 'round';
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
  path.add(event.point);
  path.smooth({
    type: 'catmull-rom',
    factor: 0.4
  });
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
  path.smooth({
    type: 'catmull-rom',
    factor: 0.4
  });
  paths.push(path);
}

function onFrame(e) {
  if (!isAnimating) {
    return;
  } else {
    isAnimating = false;
  }
}

function retractLine(thePath) {
  function getLinearSegmentIndex(segments) {
    var lastSegIndex = segments.length - 1;
    var lastSeg = segments[lastSegIndex];
    for (var i = lastSegIndex; i > 0; i--) {
      var segment = segments[i];
      var distance = lastSeg.point.getDistance(segment.point);
      if (distance > SEGMENT_GROUP_PIXEL_WIDTH) {
        return i;
      }
    }
    return 0;
  }
  var lineLen = thePath.length;
  var linearIndex = getLinearSegmentIndex(thePath.segments);
  thePath.removeSegments();
}

function undo() {
  var thePath = paths.pop();
  if (thePath) {
    retractLine(thePath);
  }
}

window.globals = {
  undo: undo,
  getPath: function() {
    return path
  }
}
