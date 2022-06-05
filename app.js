//select every div square in the grid
const grid = document.querySelectorAll(".containerGame div");
const gridWidth = 9;

//show the grid array
console.log(grid)

//set the starting square by selecting a square in the array
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
                console.log("moved right")
            }
            break;
        case 83:
            if(currentIndex + gridWidth < gridWidth * gridWidth){
                currentIndex += gridWidth;
                console.log("moved down")
            }
            break;
    }
    grid[currentIndex].classList.add('playableCharacter')
}
document.addEventListener('keydown', movePlayableCharacter)
