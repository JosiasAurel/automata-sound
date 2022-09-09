// trying to read my dirty code?
// have you ever had headaches?

const canvas = document.getElementById("beauty");

const ctx = canvas.getContext("2d");

/*  
Cellular Automata

I want to make a grid that will match the screen size

I want every square on the screen to by a 3x3 square
*/

const horizontalSquareCount = Math.floor(canvas.clientWidth / 2);
const verticalSquareCount = Math.floor(canvas.clientHeight / 2);

// console.log(verticalSquareCount, horizontalSquareCount);
let cellsArray = new Array(verticalSquareCount).fill(0).map(v => new Array(horizontalSquareCount).fill(0));

const gridDim = 2; // 3x3 square
const offset = 2;

function fillGrid() {
  for (let x = 0; x < horizontalSquareCount; x++) {
    cellsArray.push([]);
    for (let y = 0; y < verticalSquareCount; y++) {
      let rand = Math.random();
      cellsArray[x].push(rand < 0.5 ? 0 : 1);
    }
  }
}

function prefillGrid() {
  cellsArray = new Array(verticalSquareCount).fill(0).map(v => new Array(horizontalSquareCount).fill(0));
}

const clearGrid = () =>
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

/* function gameOfLife() {
    requestAnimationFrame(gameOfLife);
    drawCells();
} */

function cellFate() {
  let nextGen = Array.from(cellsArray);

  for (let i = 0; i < cellsArray.length; i++) {
    for (let j = 0; j < cellsArray[i].length; j++) {
      let liveNeighbours = 0;
      const neighbours = [
        [i - 1, j - 1],
        [i - 1, j],
        [i - 1, j + 1],
        [i, j - 1],
        [i, j + 1],
        [i + 1, j + 1],
        [i + 1, j],
        [i + 1, j - 1],
      ];
      // console.log(neighbours[0]);

      neighbours.forEach((neighbour) => {
        let [i_, j_] = neighbour;
        if (i_ >= 0 && i_ < cellsArray.length && j_ >= 0 && j_ < cellsArray[0].length) {
          // console.log(neighbour);
          // console.log(cellsArray[i_]);
          if (cellsArray[i_][j_] === 1) liveNeighbours++;
          // console.log(liveNeighbours);
        }
      });

      // overpopulation or underpopulation
      if (cellsArray[i][j] === 1) {
        if ((liveNeighbours > 3) || (liveNeighbours < 2)) nextGen[i][j] = 0;
      } else {
        if (liveNeighbours === 3) nextGen[i][j] = 1;
      }
    }
  }
  return nextGen;
}
// fillGrid();
// gameOfLife();

navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then((stream) => {
    const audioCtx = new AudioContext();
    source = audioCtx.createMediaStreamSource(stream);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    source.connect(analyser);

    function drawCells() {
      requestAnimationFrame(drawCells);
      cellsArray = cellFate();
      // processAudio();
      analyser.getByteTimeDomainData(dataArray);

      // fill grid
      for (let i = 0; i < dataArray.length; i++) {
        const value = dataArray[i];
        const whichNext = Math.random() > 0.5 ? 1 : -1;
        const nextValue = dataArray[i + whichNext];
        cellsArray[value][nextValue] = 1;
        // console.log(value);
      }

      let ix = 2;
      let iy = 2;
      for (let i = 0; i < cellsArray.length; i++) {
        for (let j = 0; j < cellsArray[i].length; j++) {
          if (cellsArray[i][j] === 1) {
            /* const red = Math.floor(Math.random()*255);
            const blue = Math.floor(Math.random()*255);
            const green = Math.floor(Math.random()*255);
            ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`; */
            ctx.fillRect(ix, iy, 2, 2);
          } else {
            ctx.clearRect(ix, iy, 2, 2);
          }
          ix += 3;
        }
        ix = 2; // reset the cursor
        iy += 3;
      }
      iy = 2;

      document.getElementById("clear").addEventListener("click", clearGrid);
    }
    // prefillGrid();
    // console.log(cellsArray);
    drawCells();
  })
  .catch((e) => console.error(e));
// send help pls
