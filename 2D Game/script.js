var boy = document.getElementById("boy");
var idleImageNumber = 1;
var idleAnimationNumber = 0;
var runImageNumber = 1;
var runAnimationNumber = 0;
var jumpImageNumber = 1;
var jumpAnimationNumber = 0;
var deadImageNumber = 1;
var deadAnimationNumber = 0;
var boxAnimationId = 0;
var moveBackgroundAnimationId = 0;
var backgroundImagePositionX = 0;
var score = 0;
boyMarginTop = 420;

function idleAnimation() {
   idleImageNumber += 1;

   if(idleImageNumber == 16) {
      idleImageNumber = 1;
   }

   boy.src = "resources/Idle ("+ idleImageNumber +").png";
}

function idleAnimationStart() {
   idleAnimationNumber = setInterval(idleAnimation,200);
}

function runAnimation() {
   runImageNumber += 1;

   if(runImageNumber == 16) {
      runImageNumber = 1;
   }

   boy.src = "resources/Run ("+ runImageNumber +").png";
}

function runAnimationStart() {
   runAnimationNumber = setInterval(runAnimation,100);
}

function jumpAnimation() {
   jumpImageNumber += 1;

   if(jumpImageNumber <= 6) {
      boyMarginTop -= 40;
      boy.style.marginTop = boyMarginTop + "px";
   }

   if(jumpImageNumber >= 7) {
      boyMarginTop += 20;
      boy.style.marginTop = boyMarginTop + "px";
   }

   if(jumpImageNumber == 16) {
      jumpImageNumber = 1;
      clearInterval(jumpAnimationNumber);
      jumpAnimationNumber = 0;
      runImageNumber = 0;
      runAnimationStart();
   }

   boy.src = "resources/Jump ("+ jumpImageNumber +").png";
}

function jumpAnimationStart() {
   clearInterval(idleAnimationNumber);
   runImageNumber = 0;
   clearInterval(runAnimationNumber);
   jumpAnimationNumber = setInterval(jumpAnimation,100);
}

function keyCheck(event) {
   // alert(event.which);
   // enter = 13;
   // space = 32;

   var keyCode = event.which;

   if(keyCode == 13) {
      if(runAnimationNumber == 0) {
         runAnimationStart();
      }

      if(moveBackgroundAnimationId == 0) {
         moveBackgroundAnimationId = setInterval(moveBackground,100);
      }

      if(boxAnimationId == 0) {
         boxAnimationId = setInterval(boxAnimation,100);
      }
   }

   if(keyCode == 32) {
      if(jumpAnimationNumber == 0) {
         jumpAnimationStart();
      }

      if(moveBackgroundAnimationId == 0) {
         moveBackgroundAnimationId = setInterval(moveBackground,100);
      }

      if(boxAnimationId == 0) {
         boxAnimationId = setInterval(boxAnimation,100);
      }
   }
}

function moveBackground() {
   backgroundImagePositionX -= 20;
   document.getElementById("background").style.backgroundPositionX = backgroundImagePositionX + "px";

   score += 1;
   document.getElementById("score").innerHTML = score;
}

boxMarginLeft = 2000;

function createBoxes() {
   for(var i = 0; i <= 10; i++) {
      var box = document.createElement("div");
      box.className = "box";
      document.getElementById("background").appendChild(box);
      box.style.marginLeft = boxMarginLeft + "px";
      box.id = "box" + i;

      if(i < 5) {
         boxMarginLeft += 2000;
      }
      else {
         boxMarginLeft += 1000;
      }
   }
}

function boxAnimation() {
   for(var i = 0; i < 10; i++) {
      var box = document.getElementById("box" + i);
      var currentMarginLeft = getComputedStyle(box).marginLeft;
      var newMarginLeft = parseInt(currentMarginLeft) - 35;
      box.style.marginLeft = newMarginLeft + "px";

      if(newMarginLeft >= -110 & newMarginLeft <= 100) {
         if(boyMarginTop > 300) {
            clearInterval(boxAnimationId);

            clearInterval(runAnimationNumber);
            runAnimationNumber = -1;

            clearInterval(jumpAnimationNumber);
            jumpAnimationNumber = -1;

            clearInterval(moveBackgroundAnimationId);
            moveBackgroundAnimationId = -1;

            deadAnimationNumber = setInterval(boyDeadAnimation,100);
         }
      }
   }
}

function boyDeadAnimation() {
   deadImageNumber += 1;

   if(deadImageNumber == 16) {
      deadImageNumber = 15;

      document.getElementById("end").style.visibility = "visible";
      document.getElementById("endScore").innerHTML = score;
   }

   boy.src = "resources/Dead ("+ deadImageNumber +").png";
}

function reload() {
   location.reload();
}