let grid;
let velocityGrid;
let w = 5;
let cols, rows;
let hueValue = 200;
let gravity = 0.1;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function withinCols(i) {
  return i >= 0 && i < cols;
}

function withinRows(j) {
  return j >= 0 && j < rows;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  velocityGrid = make2DArray(cols, rows);
}

function draw() {
  background(230,230,230);

  // Draw the sand
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(255,0,0);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  // Simulation update
  let nextGrid = make2DArray(cols, rows);
  let nextVelocityGrid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let velocity = velocityGrid[i][j];
      let moved = false;

      if (state > 0) {
        let newPos = int(j + velocity);
        for (let y = newPos; y > j; y--) {
          if (!withinRows(y)) continue;

          let below = grid[i][y];
          let dir = random(1) < 0.5 ? 1 : -1;
          let belowA = withinCols(i + dir) ? grid[i + dir][y] : -1;
          let belowB = withinCols(i - dir) ? grid[i - dir][y] : -1;

          if (below === 0) {
            nextGrid[i][y] = state;
            nextVelocityGrid[i][y] = velocity + gravity;
            moved = true;
            break;
          } else if (belowA === 0) {
            nextGrid[i + dir][y] = state;
            nextVelocityGrid[i + dir][y] = velocity + gravity;
            moved = true;
            break;
          } else if (belowB === 0) {
            nextGrid[i - dir][y] = state;
            nextVelocityGrid[i - dir][y] = velocity + gravity;
            moved = true;
            break;
          }
        }
      }

      if (state > 0 && !moved) {
        nextGrid[i][j] = state;
        nextVelocityGrid[i][j] = velocity + gravity;
      }
    }
  }

  grid = nextGrid;
  velocityGrid = nextVelocityGrid;
}



let isDragging = false; // 드래그 중인지 추적

function mouseDragged() {
    isDragging = true; // 드래그 시작
  
    let mouseCol = floor(mouseX / w);
    let mouseRow = floor(mouseY / w);
  
    for (let n = 0; n < 1000; n++) {
      let offsetX = floor(random(-5, 6));
      let offsetY = floor(random(-5, 6));
      let col = mouseCol + offsetX;
      let row = mouseRow + offsetY;
      if (withinCols(col) && withinRows(row)) {
        grid[col][row] = 1;
        velocityGrid[col][row] = 1;
      }
    }
  }
  function mouseReleased() {
  // 드래그 끝나고 1초 뒤에 isDragging 해제
  setTimeout(() => {
    isDragging = false;
    console.log("✅ drag 상태 해제됨");
  }, 1000); // 1000ms = 1초
}


  function mouseClicked() {
    if (isDragging) return; // 드래그 중이면 클릭 무시
  
    let col = floor(mouseX / w);
    let row = floor(mouseY / w);
    if (withinCols(col) && withinRows(row)) {
      if (grid[col][row] > 0) {
        window.open("https://yisssss.github.io/LinguisticLayers/", "_blank");
      }
    }
  }
  
