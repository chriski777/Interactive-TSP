$(document).ready(function() {
  var i,
      s;
  initNewRandGraph(15);
});

function toggleDrawMode(modeDict){
  var drawingElements = document.getElementsByClassName('drawing-mode');
  var nonDrawingElements = document.getElementsByClassName('non-drawing-mode');
  for (var i = 0; i < drawingElements.length; i++){
    drawingElements[i].style.display = modeDict['Drawing'];
  }
  for (var i = 0; i < nonDrawingElements.length; i++){
    nonDrawingElements[i].style.display = modeDict['nonDrawing'];
  }
}

function drawNewGraph() {
  console.log("Draw Mode");
  // Make empty graph for drawing mode
  var g = {
        nodes: [],
        edges: []
  };
  clearGraph(g, 'graph-container');
  var drawModeDict = {
    'Drawing': 'block',
    'nonDrawing': 'none'
  };
  toggleDrawMode(drawModeDict);
}

function cancelDrawGraph() {
  console.log("Exiting Draw Mode");
  initNewRandGraph(15);
  var nonDrawModeDict = {
    'Drawing': 'none',
    'nonDrawing': 'block'
  };
  toggleDrawMode(nonDrawModeDict);
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
  clearGraph(g, 'graph-container');
};

function clearGraph(graph, c){
  //Clear and kill the past sigma instance
  if (!(typeof s === "undefined")) {
    s.kill()
  }
  // Instantiate sigma: 
  s = new sigma({
    graph: graph,
    container: c
  });
}


function getRandInterval(min, max) {
  return Math.random() * (max - min) + min;
};