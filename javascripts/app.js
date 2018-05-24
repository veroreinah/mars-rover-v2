// Rover Object Goes Here
// ======================

var rovers = [
  {
    name: "Rover 0",
    direction: "N",
    x: 0,
    y: 0,
    travelLog: []
  },
  {
    name: "Rover 1",
    direction: "N",
    x: 3,
    y: 3,
    travelLog: []
  },
  {
    name: "Rover 2",
    direction: "N",
    x: 5,
    y: 9,
    travelLog: []
  },
  {
    name: "Rover 3",
    direction: "N",
    x: 0,
    y: 4,
    travelLog: []
  }
];

var marsGrid = [
  [null, null, null, "O", null, null, null, null, "O", null],
  [null, "O", null, "O", null, null, null, null, null, null],
  ["O", null, null, null, null, null, "O", null, null, null],
  [null, "O", null, null, null, null, null, null, "O", null],
  [null, null, null, null, "O", null, null, null, null, "O"],
  [null, null, "O", "O", null, null, null, null, null, null],
  [null, "O", null, null, null, null, null, null, null, "O"],
  [null, null, null, null, null, "O", null, null, "O", null],
  [null, "O", null, null, null, null, null, "O", null, null],
  ["O", "O", null, null, null, null, null, null, null, null]
]

// ======================

function turnLeft(rover){
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
}

function turnRight(rover){
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
}

function moveForward(rover){
  var currentRoverPosition = {
    x: rover.x,
    y: rover.y
  };
  var moved = false;

  switch (rover.direction) {
    case "N":
      if (rover.y > 0 && !checkObstacle(rover.x, rover.y - 1)) {
        rover.y--;
        moved = true;
      }
      break;
    case "S":
      if (rover.y < 9 && !checkObstacle(rover.x, rover.y + 1)) {
        rover.y++;
        moved = true;
      }
      break;
    case "E":
      if (rover.x < 9 && !checkObstacle(rover.x + 1, rover.y)) {
        rover.x++;
        moved = true;
      } 
      break;
    case "W":
      if (rover.x > 0 && !checkObstacle(rover.x - 1, rover.y)) {
        rover.x--;
        moved = true;
      }
      break;
  }

  if (moved) {
    marsGrid[currentRoverPosition.y][currentRoverPosition.x] = null;
    marsGrid[rover.y][rover.x] = "R";

    rover.travelLog.push(currentRoverPosition);
  }
}

function moveBackward(rover){
  var currentRoverPosition = {
    x: rover.x,
    y: rover.y
  };
  var moved = false;

  switch (rover.direction) {
    case "N":
      if (rover.y < 9 && !checkObstacle(rover.x, rover.y + 1)) {
        rover.y++;
        moved = true;
      }
      break;
    case "S":
      if (rover.y > 0 && !checkObstacle(rover.x, rover.y - 1)) {
        rover.y--;
        moved = true;
      }
      break;
    case "E":
      if (rover.x > 0 && !checkObstacle(rover.x - 1, rover.y)) {
        rover.x--;
        moved = true;
      } 
      break;
    case "W":
      if (rover.x < 9 && !checkObstacle(rover.x + 1, rover.y)) {
        rover.x++;
        moved = true;
      }
      break;
  }

  if (moved) {
    marsGrid[currentRoverPosition.y][currentRoverPosition.x] = null;
    marsGrid[rover.y][rover.x] = "R";

    rover.travelLog.push(currentRoverPosition);
  }
}

function printTravelLog() {
  for (var i = 0; i < rovers.length; i++) {
    console.log("### " + rovers[i].name + "'s travel log ###");

    var travelLog = rovers[i].travelLog;
    for (var j = 0; j < travelLog.length; j++) {
      console.log("Position " + j + " => x: " + travelLog[j].x + ", y: " + travelLog[j].y);
    }
  }
}

function checkObstacle(col, row) {
  var obstacle = false;

  if (marsGrid[row][col] === "O") {
    obstacle = true;
    console.log("Obstacle found in row: " + row + ", col: " + col);
  } else if (marsGrid[row][col] === "R") {
    obstacle = true;
    console.log("Another Rover found in row: " + row + ", col: " + col);
  }

  return obstacle;
}

function printGrid() {
  var gridString = "";

  for (var i = 0; i < marsGrid.length; i++) {
    for (var j = 0; j < marsGrid[i].length; j++) {
      if (marsGrid[i][j] === null) {
        gridString += "- ";
      } else {
        gridString += marsGrid[i][j] + " ";
      }
    }

    gridString += "\n\r";
  }

  console.log(gridString);
}

function moveRover(commands) {
  // first of all we set the position of the Rovers in the grid
  for (var j = 0; j < rovers.length; j++) {
    marsGrid[rovers[j].y][rovers[j].x] = "R";
  }
  // printGrid();

  for (var i = 0, k = 0; i < commands.length; i++, k++) {
    if (k === rovers.length) {
      k = 0;
    }

    switch (commands[i]) {
      case "r":
        turnRight(rovers[k]);
        break;
      case "l":
        turnLeft(rovers[k]);
        break;
      case "f":
        moveForward(rovers[k]);
        break;
      case "b":
        moveBackward(rovers[k]);
        break;
    }

    // printGrid();
  }

  printTravelLog();
}

moveRover("rffrfllfffflrrrffffrrfrrlfffffffffffflffffffffffffbbbbbbbbbbbbbbbbbbbbbrbbbbbbbbbbbbqwerfff");