function square(x, y) {
  let path = []
  return { x, y, path };
}
function containerSquare(x, y) {
  let moveSquares = [];

  return { x, y, moveSquares };
}
//creating this helps me in searching
let allSquares = {};
function createAllSquares() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      allSquares[`${i} ${j}`] = square(i, j);
    }
  }
  // console.log(allSquares)
}

function knightMoves(start, end) {
  createAllSquares();
  let moves = {};
  let startingSquare = allSquares[`${start[0]} ${start[1]}`];
  let endingSquare = allSquares[`${end[0]} ${end[1]}`];

  function search() {
    let endFound = false;
    let path = [];
    let currentSquare = startingSquare;
    startingSquare.path = [[startingSquare.x, startingSquare.y]];
    let q = [];
    
    
    
    while(!endFound){
      
      if(checkBreadth([currentSquare])){
        path = currentSquare.path;
        path.push([endingSquare.x, endingSquare.y]);
      }else{
        generatePossibleMoveList([currentSquare.x, currentSquare.y]).forEach((obj) => {
          obj.path = currentSquare.path.concat([[obj.x, obj.y]]);
          q.push(obj);
         });
      }
      currentSquare = q.shift();
    }

    console.log("path")
    console.log(path);
    function checkBreadth(array) {
      let possibleMovesList;
      let square;
      for (let i = 0; i < array.length; i++){
        generatePossibleMoveList([array[i].x, array[i].y]);
        possibleMovesList = moves[`${array[i].x} ${array[i].y}`]
        if (possibleMovesList.includes(endingSquare)) {
          endFound = !endFound;
          square = array[i];
          break;
        }
      }
      return square;
        
    }
  }

  function generatePossibleMoveList(node) {
    if (moves[`${node[0]} ${node[1]}`] !== undefined) {
      return moves[`${node[0]} ${node[1]}`];
    }
    //startsquare that contains all possible squares from itself
    moves[`${node[0]} ${node[1]}`] = [];
    //add possible squares
    let i = node[0];
    let j = node[1];
    //switching these values helps me reuse
    //the same possible code below to get more squares;
    let x = 2;
    let y = 1;
    for (let z = 1; z <= 2; z++) {
      if (i + x < 8) {
        if (j + y < 8) {
          pushMove([i + x, j + y]);
          // console.log("x + 1");
        }
        if (j - y >= 0) {
          pushMove([i + x, j - y]);
          // console.log("x - 1 ");
        }
      }
      if (i - x >= 0) {
        if (j + y < 8) {
          pushMove([i - x, j + y]);
          // console.log("y + 1 ");
        }
        if (j - y >= 0) {
          pushMove([i - x, j - y]);
          // console.log("y - 1 ");
        }
      }

      [y, x] = [x, y];
    }
    function pushMove(coordinate) {
      moves[`${node[0]} ${node[1]}`].push(
        allSquares[`${coordinate[0]} ${coordinate[1]}`]
      );
    }
    // console.log("moves:");
    // console.log(moves[`${node[0]} ${node[1]}`]);
    return moves[`${node[0]} ${node[1]}`];
  }
  search();
}

knightMoves([0,0],[7,7]);
knightCaller(5);

function knightCaller(num) {
  for (let i = 1; i <= num; i++) {
    let a = rand(),
      b = rand(),
      c = rand(),
      d = rand();
    console.log([a, b, c, d]);
    knightMoves([a, b], [c, d]);
  }
  function rand() {
    return Math.ceil(Math.random() * 8) - 1;
  }
}
