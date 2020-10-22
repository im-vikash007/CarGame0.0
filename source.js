//note- bydefault we have window object in javascript(global object)s
const score=document.querySelector('.score');
const startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
//console.log(score);
startScreen.addEventListener('click',start);
let player={speed:5,score:0};
let keys={ArrowUp:false,ArrowDown:false,ArrowLeft:false,ArrowRight:false};
//key related activities
document.addEventListener('keydown',keyDown);//it deals with presed key
document.addEventListener('keyup',keyUp);//it deals after press of key
function keyDown(e){  
    e.preventDefault();//it states to not use default funtionality of javascript
  // console.log(e.key);
    keys[e.key]=true;
  // console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
   // console.log(e);

}
function isCollide(a,b){  //a-player_car,b-enemy_car
  aRect=a.getBoundingClientRect();
  bRect=b.getBoundingClientRect();
  return !((aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right)||(aRect.bottom<bRect.top));
}
function moveLines(){
  let lines=document.querySelectorAll('.lines');
  lines.forEach(function(item){
        if(item.y>=700){
          item.y=-50;
        }
        item.y+=player.speed; 
        item.style.top=item.y+"px";
  });
}
function endGame(){
  player.start=false;
   startScreen.classList.remove('hide');
   startScreen.innerHTML=`Game Over <br> Your Final Score is ${player.score+2} <br> Press here To Restart the Game`;


}
function moveEnemy(car){
  let enemy=document.querySelectorAll('.enemy');
  enemy.forEach(function(item){
        if(isCollide(car,item)){
          console.log("boom hit");
          endGame();
        }
        if(item.y>=750){ 
          item.y=-300;
          item.style.left=Math.floor(Math.random()*350)+"px";
        }
        item.y+=player.speed; 
        item.style.top=item.y+"px";
  });
}
function gamePlay(){
     // console.log('hey im clicked');
      let car=document.querySelector('.car');
      let road=gameArea.getBoundingClientRect();//to all detailed postion
     // console.log(road);
      if(player.start){
         moveLines();
         moveEnemy(car);
        if(keys.ArrowUp && player.y>(road.top+70)){player.y-=player.speed};
        if(keys.ArrowDown && player.y<(road.bottom-85)){player.y+=player.speed}
        if(keys.ArrowLeft && player.x>0){player.x-=player.speed};
        if(keys.ArrowRight && player.x<(road.width-65)){player.x+=player.speed};
        car.style.top=player.y+ "px";
        car.style.left=player.x+ "px";
        window.requestAnimationFrame(gamePlay);
        console.log(player.score++);
        player.score++;
        score.innerHTML="Score: "+player.score;
      }
}
function start(){
    //gameArea.classList.remove('hide'); //removing the specified class from selected div
    startScreen.classList.add('hide'); //adding class specified class to the selected div
    gameArea.innerHTML="";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);//for animation purpose
    
    for(let x=0;x<5;x++){
    let roadline = document.createElement('div'); //line element created
    roadline.setAttribute('class','lines'); //class assining to line
    roadline.y=x*(150);
    roadline.style.top=roadline.y+"px";
    gameArea.appendChild(roadline);
    }
    
    let car = document.createElement('div');//creating element of type div
    car.setAttribute('class','car'); //adding atribute to the element
    //car.innerText="hey I am ur car";  //adding text inside element
    gameArea.appendChild(car); //adding child element to the gameArea
    //to know the positon of car
   // console.log("Top position "+ car.offsetTop);
   // console.log("Left postion "+car.offsetLeft);

    player.x=car.offsetLeft;//postion of car from left side
    player.y=car.offsetTop;//positon of car from top
    
    for(let x=0;x<4;x++){
      let carName="ecar"+(x+1).toString()+".png";
      let enemyCar = document.createElement('div'); //line element created
      enemyCar.setAttribute('class','enemy'); //class assining to line
      enemyCar.y=(x+1)*(-250);
      enemyCar.style.backgroundImage=`url(${carName})`;
      enemyCar.style.top=enemyCar.y+"px";
      enemyCar.style.backgroundColor="Transparent";
      enemyCar.style.left=Math.floor(Math.random()*350)+"px";
      gameArea.appendChild(enemyCar);
    }

}