const grid = document.querySelectorAll(".containerGame div")
console.log(grid)
let currentIndex = 76

function movePlayableCharacter() {
    grid[currentIndex].classList.add('playableCharacter')
}
document.addEventListener('keypress', movePlayableCharacter)