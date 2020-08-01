// eslint-disable-next-line import/newline-after-import
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
});
const lines = [];
rl.on('line', (line) => {
  lines.push(line);
});

const pointArr = [];
const routes = [];
const walls = [];

function finalRouteCount(start, end, finalRoutes) {
  let count = 0;
  let cur = end;
  let pre = '';
  finalRoutes.forEach((x, index) => {
    if (x.indexOf(cur) >= 0) {
      // eslint-disable-next-line prefer-destructuring
      pre = finalRoutes[index][0];
    }
  });
  if (pre !== end) {
    count += 1;
  }
  while (pre !== start) {
    count += 1;
    for (let i = 0; i < finalRoutes.length; i += 1) {
      if (finalRoutes[i].indexOf(pre) >= 0) {
        cur = pre;
        // eslint-disable-next-line prefer-destructuring
        pre = finalRoutes[i][0];
      }
    }
  }
  console.log(count);
}

function bfs(start, end) {
  // The graph
  const adjacencyList = new Map();
  // Add node
  function addNode(point) {
    adjacencyList.set(String(point), []);
  }
  // Add edge, undirected
  function addEdge(origin, destination) {
    adjacencyList.get(String(origin)).push(String(destination));
    adjacencyList.get(String(destination)).push(String(origin));
  }
  // Create the Graph
  pointArr.forEach(addNode);
  // eslint-disable-next-line arrow-parens
  routes.forEach((route) => addEdge(...route));

  const visited = new Set();
  const queue = [start];

  // 刪除是 wall 的路徑
  walls.forEach((x) => {
    adjacencyList.delete(x);
  });
  walls.push(start);
  const keys = [...adjacencyList.keys()];
  walls.forEach((x) => {
    keys.forEach((key) => {
      const idx = adjacencyList.get(key).indexOf(x);
      if (idx >= 0) {
        adjacencyList.get(key).splice(idx, 1);
      }
    });
  });

  const finalRoute = [];
  while (queue.length > 0) {
    const point = queue.shift(); // mutates the queue
    const destinations = adjacencyList.get(point);
    for (let i = 0; i < destinations.length; i += 1) {
      if (!visited.has(destinations[i])) {
        visited.add(destinations[i]);
        queue.push(destinations[i]);
        finalRoute.push([point, destinations[i]]);
      }
      if (destinations[i] === end) {
        // console.log('BFS found end!');
        return finalRouteCount(start, end, finalRoute);
      }
    }
  }
  // console.log('最短路徑紀錄: ', finalRoute);
  // console.log('刪除 visited 路徑後: ', adjacencyList);
  return -1;
}

function toMap(inputLines) {
  const endpointStr = inputLines[0].split(' ');
  let [pre, cur] = [null, null];

  // 所有點的陣列
  for (let x = 0; x < Number(endpointStr[1]); x += 1) {
    for (let y = 0; y < Number(endpointStr[0]); y += 1) {
      pointArr.push([y, x]);
    }
  }
  // 所有 route
  for (let w = 0; w < Number(endpointStr[1]); w += 1) {
    for (let h = 0; h < Number(endpointStr[0]) && Number(endpointStr[0]) > 1; h += 1) {
      // 橫 route
      if (w + 1 < Number(endpointStr[1])) {
        pre = [h, w];
        cur = [h, w + 1];
        routes.push([pre, cur]);
      }
      if (h + 1 < Number(endpointStr[0])) {
        // 直 route
        pre = [h, w];
        cur = [h + 1, w];
        routes.push([pre, cur]);
      }
    }
  }
}

function getWallsPoint(inputLines, endpointStr) {
  inputLines.shift();
  for (let i = 0; i < endpointStr[0]; i += 1) {
    inputLines[i].split('').forEach((dot, index) => {
      if (dot !== '.') {
        walls.push(`${i},${index}`);
      }
    });
  }
}
rl.on('close', () => {
  toMap(lines);
  const endpointStr = lines[0].split(' ');
  getWallsPoint(lines, endpointStr);
  bfs(String([0, 0]), String([Number(endpointStr[0] - 1), Number(endpointStr[1] - 1)]));
});
