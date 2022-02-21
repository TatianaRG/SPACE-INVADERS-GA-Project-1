/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
console.log('hello');
// created the cell divs using JS by  grabbing 
// the class .grid
const grid = document.querySelector('.grid');
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
let goingRight = true;
// let laserIndex = shipIndex
// let laserPosition = shipIndex - width
// let bulletAvailable = true 



// ALIENS
// create the aliens array
const aliens = [ 0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]
// added a .class for every single aliens cell
function create() {
  for (let i = 0; i < aliens.length; i++) {
    allCells[aliens[i]].classList.add('activeAlien');
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
  console.log(moveAliens);

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
    // to st   op the aliens as soon they reached the last row of the grid
    if (aliens.some(alien => alien >= 210)) {
      console.log('GAME OVER')
      clearInterval(aliensId)
    }
  }

// this function changes the direction of everysingle alien +1 index
  for (let i = 0; i < aliens.length; i++) {
    aliens[i] = aliens[i] + direction
  }
  create()
}
// aliensId = setInterval(moveAliens, 200)


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
    case 32: //space bar
    // setInterval(() => {
    shipShooting(shipIndex)
    // }, 500);
      
      break
    default:
      console.log('INVALID KEY')
  }
    
  addShip(shipIndex)
  
}

document.addEventListener('keyup', moveShip);



// FIRING FUNCTIONS

// function shipShooting(e) {
//   // give bullet index same location as the player index
//   let bulletIndex = shipIndex
//   if (e.keyCode === 32) {
//     // give the bullet interval a setInterval variable to clear later
//     const bulletInterval = setInterval(() => {
//       if (bulletIndex - width >= 0) {
//         allCells[bulletIndex].classList.remove('bullet')
//         bulletIndex -= width
//         allCells[bulletIndex].classList.remove('bullet')
//       } else {
//         // removes bullets once they get below 0 ( off the top of page)
//         allCells[bulletIndex].classList.remove('bullet')
//       }
//       clearInterval(bulletInterval)
//       // find the index of bullet index within the aliens array
//       const index = aliens.indexOf(bulletIndex)
//       // remove the found index from the array
//       aliens.splice(index, 1)
//       // if bullet index contains alien, add explode class
//       if (allCells[bulletIndex].classList.contains('activeAlien')) {
//         allCells[bulletIndex].classList.add('explode')
//       }
//       setTimeout(() =>{
//         allCells[bulletIndex].classList.remove('explode')
//       }, 100)
//     }
    
//     )
//   } 
// 

// function addLaser() {
//   allCells[laserPosition].classList.add('gunLaser')
// }
// function removeLaser() {
//   allCells[laserPosition].classList.remove('gunLaser')
// }

// function moveLaser() {
//   removeLaser()
//   laserPosition = laserPosition - width
//   addLaser()
// }

// function shipShooting() {
//   if (!bulletAvailable) {
//     bulletAvailable = false
//     laserPosition = shipIndex - width
//     const moveUpwards = true
//     let laserId = setInterval(() => {
//       console.log(laserId)
//       console.log(moveUpwards)
//       removeLaser()
//       if (moveUpwards) {
//         moveLaser()
//       } else {
//         removeLaser()
//       }
//     } )
//   }
// }

// function addLaser() {
//   allCells[laserIndex].classList.add('gunLaser')
// }
// addLaser();  
// function removeLaser() {
//   allCells[laserIndex].classList.remove('gunLaser')
// }



function shipShooting(startPosition) {
  
  let laserId

  // console.log('hey', laserIndex)
  // function moveLaser() 
    allCells[startPosition].classList.remove('gunLaser')
    startPosition = startPosition - width
    allCells[startPosition].classList.add('gunLaser')

    // if (allCells[laserIndex].classList.contains('activeAlien')) {
    //   allCells[laserIndex].classList.remove('gunlaser')
    //   allCells[laserIndex].classList.remove('invader')
    //   allCells[laserIndex].classList.add('explode')
    // }   
   
  //   switch(e.key === 32) {
  //   case 32 :
  //   laserId = setInterval(moveLaser, 100)
  // }
} 