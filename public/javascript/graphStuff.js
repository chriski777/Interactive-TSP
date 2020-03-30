$(document).ready(function() {

  var i,
      s;
  initNewRandGraph(15);
});

function drawNewGraph() {
  console.log("Drawing Mode");
}

function initNewRandGraph(nodeNum) {
  var 
      minX,
      minY,
      maxX,
      maxY,
      N = nodeNum,
      // Graph must be a complete graph. Must have n*(n-1)/2 edges 
      E = N*(N-1)/2,
      g = {
        nodes: [],
        edges: []
      };
  minX = -50;
  minY = -50;
  maxX = 50;
  maxY = 50;
  // Generate a random graph:
  for (i = 0; i < N; i++)
    g.nodes.push({
      id: 'n' + i,
      label: 'Node ' + i,
      x: getRandInterval(minX, maxX),
      y: getRandInterval(minX, maxX),
      size: getRandInterval(0.5,1),
      color: '#666'
    });
  console.log(g.nodes);
  // Make sure it is a complete symmetric graph
  // Include 0's for node to itself
  var numEdges = 0;
  for (i = 0; i < N; i++) {
    for (j = 0; j < N; j++) {
      if (i != j && j > i) {
        g.edges.push({
          id: 'e' + numEdges++,
          source: 'n' + i,
          target: 'n' + j,
          size: getRandInterval(0.5,1),
          color: '#ccc'
        });
      };
    }
  }
  //Clear and kill the past sigma instance
  if (!(typeof s === "undefined")) {
    s.kill()
  }
  // Instantiate sigma: 
  s = new sigma({
    graph: g,
    container: 'graph-container'
  });
};

function getRandInterval(min, max) {
  return Math.random() * (max - min) + min;
};