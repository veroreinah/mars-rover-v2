// Rover Object Goes Here
// ======================

var roverKata = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};

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
    rover.travelLog.push(currentRoverPosition);
  }
}

function printTravelLog(travelLog) {
  for (var i = 0; i < travelLog.length; i++) {
    console.log("Position " + i + " => x: " + travelLog[i].x + ", y: " + travelLog[i].y);
  }
}

function checkObstacle(col, row) {
  var obstacle = false;

  if (marsGrid[row][col] === "O") {
    obstacle = true;
    console.log("Obstacle found in row: " + row + ", col: " + col);
  }

  return obstacle;
}

function moveRover(commands) {
  for (var i = 0; i < commands.length; i++) {
    switch (commands[i]) {
      case "r":
        turnRight(roverKata);
        break;
      case "l":
        turnLeft(roverKata);
        break;
      case "f":
        moveForward(roverKata);
        break;
      case "b":
        moveBackward(roverKata);
        break;
    }
  }

  printTravelLog(roverKata.travelLog);
}

moveRover("rffrfflfrfflffrfflfrffrrffffffffffffflffffffffffffbbbbbbbbbbbbbbbbbbbbbrbbbbbbbbbbbbbbbffff");