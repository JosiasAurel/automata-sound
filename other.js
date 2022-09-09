
const rows = 4;
      cols = 4;
      
const myArray = new Array(rows).fill(0).map(v => new Array(cols).fill(0));


for (let i = 0; i < myArray.length; i++) {
    for (let j = 0; j < myArray[i].length; j++) {
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

      neighbours.forEach((neighbour) => {
        let [i_, j_] = neighbour;
        if (i_ >= 0 && i_ < myArray.length && j_ >= 0 && j_ < myArray[0].length) {
          console.log(neighbour);
          console.log(myArray[i_][j_]);
          if (myArray[i_][j_] === 1) liveNeighbours;
          // console.log(liveNeighbours);
        }
      });
    }
  }