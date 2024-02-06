const boxs = document.querySelectorAll('.box');
const statusTxt = document.getElementById('status');
console.log(statusTxt);
const btnRestart = document.getElementById('restart');
console.log(btnRestart);
let x ="<img src='images/x.png'>";
let o ="<img src='images/o.png'>";

//winning posibilites
const win=[
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  [0, 5, 10, 15],
  [3, 6, 9, 12]
];

options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
let currentplayer = x;
let running = false;
let player = "X";
init();

// initialize game
function init(){
  boxs.forEach(box => box.addEventListener('click',boxClick));
  btnRestart.addEventListener('click',restartGame);
  statusTxt.textContent = `${player} Your Turn`;
  running = true;
}

// which box is clicked
function boxClick(){
   const index = this.dataset.index;
   if(options[index]!="" || !running){
    return;
   }
   updateBox(this,index);
   checkWinner();
}

// updating one box to another
function updateBox(box,index){
  options[index] =player;
  box.innerHTML = currentplayer;
}

// changing player
function changePlayer(){
  player = (player == 'X') ? "O" : "X";  // conditional statement left side true right false
  currentplayer = (currentplayer== x) ? o : x;
  statusTxt.textContent = `${player} Your Turn`;
}

function checkWinner(){
  let isWon = false;
  for(let i =0;i<win.length;i++){
    let condition=win[i];//[0,1,2]
    const boxes = condition.map(index => options[index]);
        if (boxes.includes("") || boxes.some(box => box !== player)) {
            continue;
        }
        isWon = true;
        condition.forEach(index => {
            boxs[index].classList.add('won');
        });
  }

  if(isWon){
    statusTxt.textContent = `${player} Won..!`;
    running= false;
  }else if(!options.includes("")) { //check the options are not empty
    statusTxt.textContent = `Game Draw...!`;
    running = false;
  } else{
    changePlayer();
  }
}

function restartGame(){
  options = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
   currentplayer = x;
   running = true;
   player = "X";
   statusTxt.textContent = `${player} Your Turn`;

   boxs.forEach(box => {
    box.innerHTML="";
    box.classList.remove('won');
   });
}


