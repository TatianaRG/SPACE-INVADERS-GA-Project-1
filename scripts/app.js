/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
console.log('hello');



// created the cell divs using JS by  grabbing 
// the class .grid
const grid = document.querySelector('.grid');
const score = document.querySelector('#score-display')
const startBtn = document.querySelector('#start')
const restartBtn = document.querySelector('#restart')
const lives = document.querySelector('#lives')

// used appendChild to append the newly created divs to the grid
for (let i = 0; i < 225; i++) {
  const cell = document.createElement('div')
  grid.appendChild(cell);
}

// VARIABLES

const allCells = Array.from(document.querySelectorAll('.grid div'))
const width = 15;
let shipIndex = 217;
let direction = 1;
let aliensId;
let laserId;
let goingRight = true;
let aliensRemoved = []
let points = 0
let playerLives = 3 
let bombIndex = 0


// ALIENS
// create the aliens array
const aliens = [ 0,1,2,3,4,5,6,7,8,9,
  16,17,18,19,20,21,22,23,
  30,31,32,33,34,35,36,37,38,39,
]
// added a .class for every single aliens cell
function create() {
    for (let i = 0; i < aliens.length; i++) {
    if (!aliensRemoved.includes(i)) {
    allCells[aliens[i]].classList.add('activeAlien');
    }
  }
}
create();

function remove() {
  for (let i = 0; i < aliens.length; i++) {
    allCells[aliens[i]].classList.remove('activeAlien');
  }
}

function moveAliens() {
  remove();
//  setting the left and right edges
  const leftEdge = aliens[0] % width === 0
  const rightEdge = aliens[aliens.length - 1] % width === width - 1
  // console.log(moveAliens);

  if (rightEdge && goingRight) {
    for (let i = 0; i < aliens.length; i++) {
      aliens[i] = aliens[i] + width + 1
      direction = -1
      goingRight = false
    }
    }
  if (leftEdge && !goingRight) {
    for (let i = 0; i < aliens.length; i++){
      aliens[i] = aliens[i] + width - 1
      direction = 1
      goingRight = true
    } 
  }   
   // this changes the direction of everysingle alien +1 index
    for (let i = 0; i < aliens.length; i++) {
    aliens[i] = aliens[i] + direction
  }
    create()


// to stop the aliens as soon they reached the last row of the grid
    if (aliens.some(alien => alien >= 210)) {
      score.innerHTML = 'GAME OVER'
      clearInterval(aliensId)
    } 
    // if (allCells[shipIndex].classList.contains('activeAlien', 'ship')) {
    //   score.innerHTML = `GAME OVER \n SCORE: ${points}`
    //   clearInterval(aliensId)
    // }
    if (aliensRemoved.length === aliens.length) {
      score.innerHTML = 'YOU WIN!'
      clearInterval(aliensId)
      
    }
      
}  
aliensId = setInterval(moveAliens,  500)


// SHIP MOVEMENT
// created the ship and gaved above an innitial index to it
function addShip() {
  allCells[shipIndex].classList.add('ship')
}
addShip();

function removeShip() {
  allCells[shipIndex].classList.remove('ship');
}
// removeShip();

function moveShip(event) {
  removeShip(shipIndex)
  // will store the remainder value in a const
  const horizontalPosition = shipIndex % width;

  switch (event.keyCode) {
    case 39: // arrow right
      if (horizontalPosition < width - 1) shipIndex++
      break
    case 37: // arrow left
      if (horizontalPosition > 0) shipIndex--
      break

  }
    
  addShip(shipIndex)
  
}

document.addEventListener('keyup', moveShip);



// FIRING FUNCTIONS
// ship shooting

function shipShooting(){
  let laserIndex = shipIndex;
  alienAttack()
  function moveLaser() {
    allCells[laserIndex].classList.remove('gunLaser')
    laserIndex = laserIndex - width  
    if (laserIndex < 0) {
      clearInterval(laserId)
    }

    allCells[laserIndex].classList.add('gunLaser')

    if (allCells[laserIndex].classList.contains('activeAlien')) {   
    allCells[laserIndex].classList.remove('gunLaser')
    allCells[laserIndex].classList.remove('activeAlien')
    allCells[laserIndex].classList.add('explosion')
  
    setTimeout(()=> allCells[laserIndex].classList.remove('explosion'),    50)
    clearInterval(laserId)

    const removedAlien = aliens.indexOf(laserIndex)
    aliensRemoved.push(removedAlien) 
    points = points + 10
    score.innerHTML = points
    // console.log(aliensRemoved) 
    
  }

  }
  let laserId = setInterval(moveLaser,  200)
}
document.addEventListener('keydown', function keyDownListener(e) {
  if (e.keyCode === 32) {
    shipShooting();
  }
});

function clickStartBtn() {
  console.log('clicked')
  startBtn.blur()
  moveAliens()
}
function clickRestartBtn() {
  window.location.reload()
}
// startBtn.addEventListener('click', clickStartBtn)
restartBtn.addEventListener('click', clickRestartBtn)



// ALIENS BOMBS
function alienAttack() {
  let randomAlienIndex = aliens[Math.floor(Math.random() * aliens.length)]
  let bombIndex = randomAlienIndex
  let bombId = setInterval(dropBomb, 100)
  // console.log(bombIndex)
    

  function dropBomb() {
    if (allCells[bombIndex].classList.contains('bomb'))
    allCells[bombIndex].classList.remove('bomb')
    bombIndex += width
    if (bombIndex > 224) {
      clearInterval(bombId)
      return
    }
    allCells[bombIndex].classList.add('bomb')

    if (allCells[bombIndex].classList.contains('ship')) {
      allCells[bombIndex].classList.remove('bomb')
      clearInterval(bombId)
      playerLives--
      lives.innerHTML = playerLives
    }
      // if (allCells[bombIndex].classList.contains('gunLaser') && allCells[bombIndex].classList.contains('bomb')) {
      //   allCells[bombIndex].classList.remove('bomb')
      //   allCells[bombIndex].classList.remove('gunLaser')
      //   // allCells[bombIndex].classList.add('boom') 
      //   console.log('bomb hit')
      // }
      // // setTimeout(()=> allCells[bombIndex].classList.remove('boom'), 400)
      // clearInterval(bombId)

    if (playerLives  === 0) {
      clearInterval(bombId)
      score.innerHTML = 'GAME OVER'
      clearInterval(laserId) 
      clearInterval(aliensId)  

    }

}

}
