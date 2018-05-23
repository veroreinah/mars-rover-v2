// Rover Object Goes Here
// ======================

var roverKata = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};

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

  switch (rover.direction) {
    case "N":
      if (rover.y > 0) {
        rover.y--;
      }
      break;
    case "S":
      if (rover.y < 9) {
        rover.y++;
      }
      break;
    case "E":
      if (rover.x < 9) {
        rover.x++;
      } 
      break;
    case "W":
      if (rover.x > 0) {
        rover.x--;
      }
      break;
  }

  rover.travelLog.push(currentRoverPosition);
}

function printTravelLog(travelLog) {
  for (var i = 0; i < travelLog.length; i++) {
    console.log("Position " + i + " => x: " + travelLog[i].x + ", y: " + travelLog[i].y);
  }
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
    }
  }

  printTravelLog(roverKata.travelLog);
}

moveRover("rffrfflfrfflffrfflfrffrrffffffffffffflffffff");