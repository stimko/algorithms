/* Algorithm for finding iframes with same domain as this nested one*/
var toArray = Array.prototype.slice,
    startingVertex = window,
    framesWithSameDomain = [];

function visit(frontier, fn) {
  var level = 0,
      levels = {};
  while (frontier.length) {
    var next = [],
        adjacent = [],
        loc = '';
    for (var i = 0; i < frontier.length; i++) {
      var node = frontier[i].contentWindow || frontier[i];
      fn(node);
      levels[node.location] = level;
      adjacent = toArray.call(node.document.getElementsByTagName("iframe")).concat(node.parent);
      adjacent.forEach(function(adj){
        loc = adj.location || adj.contentWindow.location;
        if (typeof levels[loc.href] === 'undefined') {
          next.push(adj);
        }
      });
    }
    frontier = next;
    level += 1;
  }
}

function bfs(node, fn) {
  visit([node], fn);
}

bfs(startingVertex, function(v){
  if(v.location.hostname === startingVertex.location.hostname){
    framesWithSameDomain.push(v);  
  }
});