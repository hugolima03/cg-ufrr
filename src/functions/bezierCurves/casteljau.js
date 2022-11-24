export function calculatePoints(points, t) {
  var p1X = points[0].x, //x coord of first point
    p1Y = points[0].y, //y coord of first point
    p2X = points[1].x, //x coord of second point
    p2Y = points[1].y; //y coord of second point

  var pInterX = p1X + (p2X - p1X) * t,
    pInterY = p1Y + (p2Y - p1Y) * t;

  return { x: pInterX, y: pInterY };
}

export function deCasteljauAlgorithm(points, t) {
  // Casos de parada da recursão
  if (t === 1) {
    return points[points.length - 1];
  }

  if (t === 0) {
    return points[0];
  }

  if (points.length == 1) {
    return points[0];
  }

  var calculatedPoints = [];

  for (var i = 1, len = points.length; i < len; i++) {
    calculatedPoints.push(calculatePoints([points[i - 1], points[i]], t));
  }

  return deCasteljauAlgorithm(calculatedPoints, t);
}
