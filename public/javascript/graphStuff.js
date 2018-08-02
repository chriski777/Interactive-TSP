$(document).ready(function() {
  var i,
      s,
      N = 10,
      E = 100,
      g = {
        nodes: [],
        edges: []
      };
  // Generate a random graph:
  for (i = 0; i < N; i++)
    g.nodes.push({
      id: 'n' + i,
      label: 'Node ' + i,
      x: Math.random(),
      y: Math.random(),
      size: Math.random(),
      color: '#666'
    });
  for (i = 0; i < E; i++)
    g.edges.push({
      id: 'e' + i,
      source: 'n' + (Math.random() * N | 0),
      target: 'n' + (Math.random() * N | 0),
      size: Math.random(),
      color: '#ccc'
    });

  // Instantiate sigma:
  s = new sigma({
    graph: g,
    container: 'graph-container'
  });

  //Select Canvas 
  mouse = document.querySelector('#graph-container canvas:last-child');
  cam = s.camera;
  // Initialize the dragNodes plugin:
  var renderer = s.renderers[0]
  var dragListener = sigma.plugins.dragNodes(s, renderer);

  dragListener.bind('startdrag', function(event) {
    console.log(event);
  });
  dragListener.bind('drag', function(event) {
    console.log(event);
  });
  dragListener.bind('drop', function(event) {
    console.log(event);
  });
  dragListener.bind('dragend', function(event) {
    console.log(event);
  });
  // Add node on Click 
  $(mouse).on("click", function(event) { 
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
      clearTimeout(timeOut);
      var timeOut = setTimeout(newNodeCoords, 0, event);
    } else {
      newNodeCoords(event);
    }
  });

  function newNodeCoords(event) {
    var currStyle = window.getComputedStyle(renderer.container);
    var getCssProperty = function(prop) {
      return parseInt(currStyle.getPropertyValue(prop).replace('px', '')) || 0;
    };
    // calculate coordinates of mouse click after considering offset
    x = event.clientX - renderer.container.getBoundingClientRect().left + getCssProperty('padding-left');
    y = event.clientY - renderer.container.getBoundingClientRect().top + getCssProperty('padding-top');
    cos = Math.cos(cam.angle);
    sin = Math.sin(cam.angle);
    ref = [];
    nodes = s.graph.nodes()

    // It removes the initial substring ('read_') if it's a WegGL renderer.
    if (renderer instanceof sigma.renderers.webgl) {
      _prefix = renderer.options.prefix.substr(5);
    } else {
      _prefix = renderer.options.prefix;
    }
    // Get and derotate ref coords
    for (var i = 0; i < 2; i++) {
      var n = nodes[i];
      var aux = {
        x: n.x * cos + n.y * sin,
        y: n.y * cos - n.x * sin,
        renX: n[_prefix + 'x'],
        renY: n[_prefix + 'y'],
      };
      ref.push(aux);
    }
    // Applying linear interpolation.
    // if the nodes are on top of each other, we use the camera ratio to interpolate
    if (ref[0].x === ref[1].x && ref[0].y === ref[1].y) {
      var xRatio = (ref[0].renX === 0) ? 1 : ref[0].renX;
      var yRatio = (ref[0].renY === 0) ? 1 : ref[0].renY;
      x = (ref[0].x / xRatio) * (x - ref[0].renX) + ref[0].x;
      y = (ref[0].y / yRatio) * (y - ref[0].renY) + ref[0].y;
    } else {
      var xRatio = (ref[1].renX - ref[0].renX) / (ref[1].x - ref[0].x);
      var yRatio = (ref[1].renY - ref[0].renY) / (ref[1].y - ref[0].y);
      // if the coordinates are the same, we use the other ratio to interpolate
      if (ref[1].x === ref[0].x) {
        xRatio = yRatio;
      }
      if (ref[1].y === ref[0].y) {
        yRatio = xRatio;
      }
      x = (x - ref[0].renX) / xRatio + ref[0].x;
      y = (y - ref[0].renY) / yRatio + ref[0].y;
    }
    // Rotating the coordinates.
    xCoord = x * cos - y * sin;
    yCoord = y * cos + x * sin;
    s.graph.addNode({
      id: 'n' + (name =  ++N),
      label : 'Node ' + name,
      x: xCoord,
      y: yCoord,
      size: Math.random(),
      color: '#666'
    });
    s.refresh();
  };
});