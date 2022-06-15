var lives = 3;
var pointsWon = 0;

//select every div square in the grid
const grid = document.querySelectorAll(".containerGame div");
const gridWidth = 9;
let timer1 = null;
let timer2 = null;
let timer3 = null;

//select every div with the selected class
const mowersLeft = document.querySelectorAll(".mower-left");
const mowersRight = document.querySelectorAll(".mower-right");
const branchesRight = document.querySelectorAll(".branch-right");
const branchesLeft = document.querySelectorAll(".branch-left");

//show the grid array
console.log(grid);

//set the starting position of the Playable Character by selecting a square in the array
let currentIndex = 76;

//move the Character with WASD and create borders
function movePlayableCharacter(e) {
    
    grid[currentIndex].classList.remove('playableCharacter')

    switch(e.keyCode) {
        case 65:
            if(currentIndex % gridWidth !== 0){
                currentIndex -= 1;
                console.log("moved left");
            }
            break;
        case 87:
            if(currentIndex - gridWidth >= 0){
                currentIndex -= gridWidth;
                console.log("moved up");
            }
            break;
        case 68:
            if(currentIndex % gridWidth < gridWidth - 1){
                currentIndex += 1;
                console.log("moved right");
            }
            break;
        case 83:
            if(currentIndex + gridWidth < gridWidth * gridWidth){
                currentIndex += gridWidth;
                console.log("moved down");
            }
            break;
    }
    grid[currentIndex].classList.add('playableCharacter');
}
document.addEventListener('keydown', movePlayableCharacter);

//set speed of repeating obstacles
timer1 = setInterval(auto1, 1000);
timer2 = setInterval(auto2, 500);
timer3 = setInterval(auto3, 650);
timer4 = setInterval(checkCharacter, 10);

//auto movement
function auto1(){
    mowersLeft.forEach(w => moveMowerLeft(w));
    branchesRight.forEach(y => moveBranchesRight(y));
}
auto1();

function auto2(){
    mowersRight.forEach(x => moveMowerRight(x));
}
auto2();

function auto3(){
    branchesLeft.forEach(z => moveBranchesLeft(z));
}
auto3();

function checkCharacter(){
    youLose();
    youWin();
    floatRight();
    floatLeft();
}

//moving first obstacle
function moveMowerLeft(w) {
    switch(true){
        case w.classList.contains('m1'):
            w.classList.remove('m1');
            w.classList.add('m2');
            break;
        case w.classList.contains('m2'):
            w.classList.remove('m2');
            w.classList.add('m3');
            break;
        case w.classList.contains('m3'):
            w.classList.remove('m3');
            w.classList.add('m1');
            break;    
    }
}

//moving second obstacle
function moveBranchesRight(y) {
    switch(true) {
        case y.classList.contains('b1'):
            y.classList.remove('b1');
            y.classList.add('b5');
            break;
        case y.classList.contains('b2'):
            y.classList.remove('b2');
            y.classList.add('b1');
            break;
        case y.classList.contains('b3'):
            y.classList.remove('b3');
            y.classList.add('b2');
            break;
        case y.classList.contains('b4'):
            y.classList.remove('b4');
            y.classList.add('b3');
            break;
        case y.classList.contains('b5'):
            y.classList.remove('b5');
            y.classList.add('b4');
            break;
    }
}

//moving third obstacle
function moveBranchesLeft(z) {
    switch(true) {
        case z.classList.contains('l1'):
            z.classList.remove('l1');
            z.classList.add('l2');
            break;
        case z.classList.contains('l2'):
            z.classList.remove('l2');
            z.classList.add('l3');
            break;
        case z.classList.contains('l3'):
            z.classList.remove('l3');
            z.classList.add('l4');
            break;
        case z.classList.contains('l4'):
            z.classList.remove('l4');
            z.classList.add('l5');
            break;
        case z.classList.contains('l5'):
            z.classList.remove('l5');
            z.classList.add('l1');
            break;
    }
}

//moving last obstacle
function moveMowerRight(x) {
    switch(true){
        case x.classList.contains('m1'):
            x.classList.remove('m1');
            x.classList.add('m3');
            break;
        case x.classList.contains('m2'):
            x.classList.remove('m2');
            x.classList.add('m1');
            break;
        case x.classList.contains('m3'):
            x.classList.remove('m3');
            x.classList.add('m2');
            break;    
    }
}

//character floats on moving log
function floatRight() {
    if(grid[currentIndex].classList.contains('playableCharacter') && grid[currentIndex].classList.contains('b2')) {
        if(currentIndex % gridWidth < gridWidth - 1){
            currentIndex += 1;
            grid[currentIndex].classList.add('playableCharacter');
            grid[currentIndex-1].classList.remove('playableCharacter');
        }    
    }
}

function floatLeft(){
    if(grid[currentIndex].classList.contains('playableCharacter') && grid[currentIndex].classList.contains('l3')){
        if(currentIndex % gridWidth !== 0){
            currentIndex -= 1;
            grid[currentIndex].classList.add('playableCharacter');
            grid[currentIndex+1].classList.remove('playableCharacter');
        }
    }
}

//moves that are bad for your life
function youLose() {
    if (grid[currentIndex].classList.contains('m1')) {
        console.log('You were mowed over :(');
        lives--;
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        document.removeEventListener('keydown',movePlayableCharacter);
        grid[currentIndex].classList.remove('playableCharacter');
    }
    else if(grid[currentIndex].classList.contains('m1') && grid[currentIndex].classList.contains('playableCharacter')){
        console.log('You were mowed over :(');
        lives--;
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        document.removeEventListener('keydown',movePlayableCharacter);
        grid[currentIndex].classList.remove('playableCharacter');
    }
    else if(grid[currentIndex].classList.contains('b1') || grid[currentIndex].classList.contains('b4') || grid[currentIndex].classList.contains('b4')) {
        console.log('You cannot swim here! O_o');
        lives--;
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        clearInterval(timer4);
        document.removeEventListener('keydown',movePlayableCharacter);
        grid[currentIndex].classList.remove('playableCharacter');
    }
}

//Keeping Track of Lives
function updateLife(displayLife){
    let lives = document.querySelector('.lives-left');
    lives.innerHTML = displayLife;
}

//winning the game
function youWin() {
    if(grid[currentIndex].classList.contains('goalPoint')) {
        console.log('gg! You win :D');
        clearInterval(timer1);
        clearInterval(timer2);
        clearInterval(timer3);
        document.removeEventListener('keydown',movePlayableCharacter);
        pointsWon++;
    }
}

//Consequences of Winning and Losing
//if you win, game restarts (or goes to next level) with remaining lives left (loop play())
//if you lose game restarts with 3 lives