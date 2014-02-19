var polygon = [{
  x: 0,
  y: 0
}, 
{
  x: 0,
  y: 50
},
{
  x: 50,
  y: 50
}, 
{
  x: 50,
  y: 0
}
];

var point = {
  x:50,
  y: 41
};

function isPointInPolygon(polygon, point) { 
  var i, j, polyI, polyJ, iX, jX, iY, jY, x = point.x, y= point.y, c = 0, length = polygon.length; 
  for (i = 0, j = length-1; i < length; j = i++) {
    polyI = polygon[i], polyJ = polygon[j], iX = polyI.x, iY = polyI.y, jX = polyJ.x, jY = polyJ.y;
    if ((((iY <= y) && (y <= jY)) || ((jY <= y) && (y <= iY))) && (x <= (jX - iX) * (y - iY) / (jY - iY) + iX)) { 
      c = !c; 
    } 
  } 
  return c; 
}  

if (isPointInPolygon(polygon, point)) {
  console.log("Is in polygon!");
} else {
  console.log("Is not in polygon!");
}