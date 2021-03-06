localStorage.setItem("storage",'1');
var audio=document.getElementById('aud');
var btn=document.getElementById('song');
var count=0;
//function to play the music
function play()
{
  if(count==0)
  {
    count=1;
    audio.play();
    btn.innerHTML='🔊';
  }
  else
  {
    count=0;
    audio.pause();
    btn.innerHTML='🔈';
  }
}

function back(){
  document.getElementById("back").href="../Menu/index.html"; 
  return false;
}

const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202               //position of the shooter
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll('.grid div'))

const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]
                                         
//function to draw the aliens

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}                            

draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter')

//function for moving the shooter

function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

//function for moving the invaders

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false
    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  
  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    // resultsDisplay.innerHTML = 'GAME OVER';
    clearInterval(invadersId)
    finish('lost');
  }
  
  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      // resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
      finish('lost');
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    // resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
    finish('won');
  }
}

function finish(status){
  if(status === 'lost'){
    alert('Game Over. Click OK to see results')
    localStorage.setItem("storage1",results);  
    localStorage.setItem("storage2",status);  
    location.replace("../Game Over/menu.html");
  }
  else{
    alert('Game Over. Click OK to see results')
    localStorage.setItem("storage1",results);    
    localStorage.setItem("storage2",status);    
    location.replace("../Game Over/menu.html");
  }
}

invadersId = setInterval(moveInvaders, 600)

//function for shooting the laser

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = 'Score: '+results
      console.log(aliensRemoved)

    }

  }
  switch(e.key) {
    case 'ArrowUp':
      laserId = setInterval(moveLaser, 100)
  }
}

document.addEventListener('keydown', shoot)
