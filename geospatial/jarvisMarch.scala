val (turnLeft, turnRight, turnNone) = (1, -1, 0)

def turn(p:(Int,Int), q:(Int,Int), r:(Int,Int)):Int = {
  val angle = (q._1 - p._1)*(r._2 - p._2) - (r._1 - p._1)*(q._2 - p._2)
  if (angle > 0) return turnLeft
  else if (angle < 0) return turnRight
  return turnNone
}

def getDistance(p:(Int,Int), q:(Int,Int)):Int = {
  val dx = q._1 - p._1
  val dy = q._2 - p._2
  return dx * dx + dy * dy
}

def convexHull(points:List[(Int, Int)]):List[(Int, Int)] = {
  var minPoint = points.min
  var hull = List(minPoint)
  def nextHullPoint(hull:List[(Int, Int)]):List[(Int, Int)] = {
    var p, q = hull.last
    for (r <- points) {
      var t = turn(p, q, r)
      if (t == turnRight || t == turnNone && getDistance(p, r) > getDistance(p, q)) q = r
    }
    if (q != hull(0)) nextHullPoint(hull :+ q)
    else return hull
  }
 nextHullPoint(hull)
}

convexHull(List((4, 2), (4,5), (10, 12), (1,2), (18, 19)))
