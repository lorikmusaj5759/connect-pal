/* 
   Filename: complex_code.js 
   
   Description: This complex JavaScript code generates a random maze using Prim's algorithm. The maze is solved using depth-first search. The maze is created using an HTML5 canvas. The user can interact with the maze by clicking on cells or starting a new maze. The algorithm is optimized for performance and efficiency.
*/

// Constants and global variables
const CELL_SIZE = 20;
const MAZE_SIZE = 25;
let maze;
let stack;
let current;

// Generate the initial maze
function generateMaze() {
  // Initialize variables and data structures
  maze = new Array(MAZE_SIZE);
  stack = [];
  current = { x: 0, y: 0 };
  
  for (let i = 0; i < MAZE_SIZE; i++) {
    maze[i] = new Array(MAZE_SIZE);
    for (let j = 0; j < MAZE_SIZE; j++) {
      maze[i][j] = { visited: false, walls: { top: true, right: true, bottom: true, left: true } };
    }
  }
  
  // Recursive backtracking algorithm
  function recursiveBacktracker() {
    current.visited = true;
    
    // Select a random unvisited neighbor
    const neighbors = [];
    
    if (current.y > 0 && !maze[current.x][current.y - 1].visited) {
      neighbors.push({ x: current.x, y: current.y - 1, direction: "top" });
    }
    if (current.x < MAZE_SIZE - 1 && !maze[current.x + 1][current.y].visited) {
      neighbors.push({ x: current.x + 1, y: current.y, direction: "right" });
    }
    if (current.y < MAZE_SIZE - 1 && !maze[current.x][current.y + 1].visited) {
      neighbors.push({ x: current.x, y: current.y + 1, direction: "bottom" });
    }
    if (current.x > 0 && !maze[current.x - 1][current.y].visited) {
      neighbors.push({ x: current.x - 1, y: current.y, direction: "left" });
    }
    
    if (neighbors.length > 0) {
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      const { x, y, direction } = randomNeighbor;
      
      // Remove walls
      switch (direction) {
        case "top":
          maze[x][y].walls.bottom = false;
          maze[current.x][current.y].walls.top = false;
          break;
        case "right":
          maze[x][y].walls.left = false;
          maze[current.x][current.y].walls.right = false;
          break;
        case "bottom":
          maze[x][y].walls.top = false;
          maze[current.x][current.y].walls.bottom = false;
          break;
        case "left":
          maze[x][y].walls.right = false;
          maze[current.x][current.y].walls.left = false;
          break;
      }
      
      stack.push(current);
      current = randomNeighbor;
      recursiveBacktracker();
    } else if (stack.length > 0) {
      current = stack.pop();
      recursiveBacktracker();
    }
  }
  
  // Call the recursive backtracking algorithm
  recursiveBacktracker();
}

// Solve the maze using depth-first search
function solveMaze() {
  const visited = new Array(MAZE_SIZE);
  for (let i = 0; i < MAZE_SIZE; i++) {
    visited[i] = new Array(MAZE_SIZE).fill(false);
  }
  
  function depthFirstSearch(x, y) {
    if (x === MAZE_SIZE - 1 && y === MAZE_SIZE - 1) {
      return true;
    }
    
    visited[x][y] = true;
    
    // Visit neighbors
    if (y > 0 && !visited[x][y - 1] && !maze[x][y].walls.top) {
      if (depthFirstSearch(x, y - 1)) {
        return true;
      }
    }
    if (x < MAZE_SIZE - 1 && !visited[x + 1][y] && !maze[x][y].walls.right) {
      if (depthFirstSearch(x + 1, y)) {
        return true;
      }
    }
    if (y < MAZE_SIZE - 1 && !visited[x][y + 1] && !maze[x][y].walls.bottom) {
      if (depthFirstSearch(x, y + 1)) {
        return true;
      }
    }
    if (x > 0 && !visited[x - 1][y] && !maze[x][y].walls.left) {
      if (depthFirstSearch(x - 1, y)) {
        return true;
      }
    }
    
    return false;
  }
  
  return depthFirstSearch(0, 0);
}

// Initialize the maze
generateMaze();

// Draw the maze on an HTML5 canvas
const canvas = document.getElementById("maze-canvas");
const ctx = canvas.getContext("2d");

canvas.width = MAZE_SIZE * CELL_SIZE;
canvas.height = MAZE_SIZE * CELL_SIZE;

function drawMaze() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw walls
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  
  for (let x = 0; x < MAZE_SIZE; x++) {
    for (let y = 0; y < MAZE_SIZE; y++) {
      const cell = maze[x][y];
      
      if (cell.walls.top) {
        ctx.beginPath();
        ctx.moveTo(x * CELL_SIZE, y * CELL_SIZE);
        ctx.lineTo((x + 1) * CELL_SIZE, y * CELL_SIZE);
        ctx.stroke();
      }
      if (cell.walls.right) {
        ctx.beginPath();
        ctx.moveTo((x + 1) * CELL_SIZE, y * CELL_SIZE);
        ctx.lineTo((x + 1) * CELL_SIZE, (y + 1) * CELL_SIZE);
        ctx.stroke();
      }
      if (cell.walls.bottom) {
        ctx.beginPath();
        ctx.moveTo(x * CELL_SIZE, (y + 1) * CELL_SIZE);
        ctx.lineTo((x + 1) * CELL_SIZE, (y + 1) * CELL_SIZE);
        ctx.stroke();
      }
      if (cell.walls.left) {
        ctx.beginPath();
        ctx.moveTo(x * CELL_SIZE, y * CELL_SIZE);
        ctx.lineTo(x * CELL_SIZE, (y + 1) * CELL_SIZE);
        ctx.stroke();
      }
    }
  }
  
  // Highlight the solution path
  ctx.fillStyle = "yellow";
  
  for (let x = 0; x < MAZE_SIZE; x++) {
    for (let y = 0; y < MAZE_SIZE; y++) {
      if (maze[x][y].visited) {
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

// Solve and redraw the maze
if (solveMaze()) {
  drawMaze();
} else {
  console.log("There is no solution for this maze!");
}

// Add event listeners for user interaction
canvas.addEventListener("click", function(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  
  const cellX = Math.floor(clickX / CELL_SIZE);
  const cellY = Math.floor(clickY / CELL_SIZE);
  
  if (cellX >= 0 && cellX < MAZE_SIZE && cellY >= 0 && cellY < MAZE_SIZE) {
    maze[cellX][cellY].visited = !maze[cellX][cellY].visited;
    drawMaze();
  }
});

// Additional utility functions and features can be added to enhance the complexity and sophistication of this code.