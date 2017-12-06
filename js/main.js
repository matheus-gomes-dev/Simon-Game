//Code and Design by Matheus Lima
//27-10-2016


var myApp = angular.module('simonApp', []);

myApp.controller('simonGame', ['$scope', '$timeout', function($scope, $timeout) {
  var userInput=0; //flag for user input
  var onOffState=0;
  var strictMode=0;
  var strictMode=0;
  var sequence=[];
  var counter=0;
  var index=0;
  $scope.displayCounter='--';
  var auxCounter=0;
  
  
  ///////////////////////////////
  //randomly increases sequence//
  ///////////////////////////////
  function increaseSequence(){
    var buttonsID=['g','r','b','y'];
    var randID=Math.floor(Math.random()*buttonsID.length);
    console.log(randID);
    switch(randID){
      case 0:
        sequence[sequence.length]='g'; 
        break;
      case 1:
        sequence[sequence.length]='r'; 
        break;
      case 2:
        sequence[sequence.length]='b'; 
        break;
      case 3:
        sequence[sequence.length]='y'; 
        break;
    }
    console.log(sequence);
    console.log(sequence.length);
    console.log(sequence[sequence.length]);
  }
  
  
  /////////////////////////////
  //function to play sequence//
  /////////////////////////////
  function playSequence(){
    var i;
    var interval=1000;
    var delay;
    //disble user input while playing sequence
    userInput=0;
    
    for (i=0;i<sequence.length;i++){
      
      if (sequence[i]=='g'){
        $timeout(function(){
          document.getElementById("greenButton").style.background='#4dff4d';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
        },interval);
        interval+=500;
        $timeout(function(){
          document.getElementById("greenButton").style.background='#006600';
        },interval);
      }
      
      else if (sequence[i]=='r'){
        $timeout(function(){
          document.getElementById("redButton").style.background='#ff3333';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
        },interval);
        interval+=500;
        $timeout(function(){
          document.getElementById("redButton").style.background='#cc0000';
        },interval);
      }
      
      else if (sequence[i]=='b'){
        $timeout(function(){
          document.getElementById("blueButton").style.background='#5c5cd6';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
        },interval);
        interval+=500;
        $timeout(function(){
          document.getElementById("blueButton").style.background='#24248f';
        },interval);
      }
            
      else if (sequence[i]=='y'){
        $timeout(function(){
          document.getElementById("yellowButton").style.background='#ffff33';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
        },interval);
        interval+=500;
        $timeout(function(){
          document.getElementById("yellowButton").style.background='#e6e600';
        },interval);
      }
      
      //speed of execution gets faster as user advances
      if (sequence.length < 4){
        delay=900;
        interval+=delay;
      }
      else if (sequence.length >= 4 && sequence.length < 10){
        delay=600;
        interval+=delay;
      }
      else{
        delay=200;
        interval+=delay;
      }

    }
    //enables user inputs
    $timeout(function(){
      userInput=1;
    },interval-delay);
  }
  
  
  /////////////////////////////////////////////////////
  //function to handle wrong sequence input animation//
  /////////////////////////////////////////////////////
  function wrongInput(colorButton){
    userInput=0;
    switch(colorButton){
        
      case 'green':
        $timeout(function(){
          document.getElementById("greenButton").style.background='#4dff4d';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
        },500);
        $timeout(function(){
          document.getElementById("greenButton").style.background='#006600';
        },650);
        $timeout(function(){
          document.getElementById("greenButton").style.background='#4dff4d';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
        },800);
        $timeout(function(){
          document.getElementById("greenButton").style.background='#006600';
          userInput=1;
        },950);
        break;
        
      case 'red':
        $timeout(function(){
          document.getElementById("redButton").style.background='#ff3333';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
        },500);
        $timeout(function(){
          document.getElementById("redButton").style.background='#cc0000';
        },650);
        $timeout(function(){
          document.getElementById("redButton").style.background='#ff3333';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
        },800);
        $timeout(function(){
          document.getElementById("redButton").style.background='#cc0000';
          userInput=1;
        },950);
        break;
        
      case 'blue':
        $timeout(function(){
          document.getElementById("blueButton").style.background='#5c5cd6';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
        },500);
        $timeout(function(){
          document.getElementById("blueButton").style.background='#24248f';
        },650);
        $timeout(function(){
          document.getElementById("blueButton").style.background='#5c5cd6';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
        },800);
        $timeout(function(){
          document.getElementById("blueButton").style.background='#24248f';
          userInput=1;
        },950);
        break;
        
      case 'yellow':
        $timeout(function(){
          document.getElementById("yellowButton").style.background='#ffff33';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
        },500);
        $timeout(function(){
          document.getElementById("yellowButton").style.background='#e6e600';
        },650);
        $timeout(function(){
          document.getElementById("yellowButton").style.background='#ffff33';
          new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
        },800);
        $timeout(function(){
          document.getElementById("yellowButton").style.background='#e6e600';
          userInput=1;
        },950);
        break;
     } 
  }
  
  
  
  //////////////////////////////
  //function to start the game//
  //////////////////////////////
  function startGame(){
    if (onOffState){
      //display blink
      $scope.displayCounter='--';
      var interval=0;
      $timeout(function(){
        document.getElementById("displayContent").style.color='red';
      },interval);
      interval+=500;
      $timeout(function(){
        document.getElementById("displayContent").style.color='#b30000';
      },interval);
      interval+=500;
      $timeout(function(){
        document.getElementById("displayContent").style.color='red';
      },interval);
      interval+=500;
      
      //init sequence
      $timeout(function(){
        updateCounter();
        sequence=[];
        increaseSequence();
        index=0;
        playSequence();
      },interval);
    }
  }
  $scope.clickStart = function(){
    startGame();
  }
  
  
  
  //////////////////////////////
  //function to update counter//
  //////////////////////////////
  function updateCounter(){
    if ($scope.displayCounter == '--'){
      auxCounter=1;
      $scope.displayCounter='0'+auxCounter.toString();
    }
    else if($scope.displayCounter != '--' && auxCounter < 9){
      auxCounter+=1;
      $scope.displayCounter='0' + auxCounter.toString();
    }
    else if($scope.displayCounter != '--' && auxCounter >= 9 && auxCounter <= 19){
      auxCounter+=1;
      $scope.displayCounter=auxCounter;
    }
    //victory when counter reaches 20
  }
  
  
  ///////////////////////////////////
  //function to toggle power switch//
  ///////////////////////////////////
  $scope.togglePower = function(){
    if (onOffState==0){
      onOffState=1;
    }
    else{
      onOffState=0;
      $scope.displayCounter='--';
      document.getElementById("displayContent").style.color='#b30000';
      strictMode=0;
      document.getElementById("strictLed").style.background='#4d0000';
    }
  }
  
  
  
  /////////////////////////////////
  //function to switch strictMode//
  /////////////////////////////////
  $scope.strictSwitch = function(){
    if (onOffState){
      if (strictMode==0){
        strictMode=1;
        document.getElementById("strictLed").style.background='red';
      }
      else{
        strictMode=0;
        document.getElementById("strictLed").style.background='#4d0000';
      }
    }
  }
  
  
  
  //////////////////////////////
  //function to handle victory//
  //////////////////////////////
  function victory(){
    $timeout(function(){
      $scope.displayCounter='**'
    },500);
    $timeout(function(){
      $scope.displayCounter='--'
    },1000);
    $timeout(function(){
      $scope.displayCounter='**'
    },1500);
    $timeout(function(){
      $scope.displayCounter='--';
      startGame();
    },2000);
  }
  
  //-------------------------CLICK EVENTS------------------------------
  
  
  
  ///////////////
  //green click//
  ///////////////
  $scope.greenClickDown = function(){
    if (userInput && onOffState){
      new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3').play();
      document.getElementById("greenButton").style.background='#4dff4d';
    }
  }
  $scope.greenClickUp = function() {
    if (userInput && onOffState){
      document.getElementById("greenButton").style.background='#006600';
      console.log(sequence);
      console.log(sequence[index]);
      if (userInput){
        if (sequence[index] == 'g'){
          if (index==sequence.length-1 && auxCounter!=20){
            updateCounter();
            increaseSequence();
            //reinit index
            index=0;
            console.log(sequence);
            playSequence();
          }
          else if (index==sequence.length-1 && auxCounter==20)
            victory();
          else
            index+=1;
        }
        else{
          wrongInput('green');
          $timeout(function(){
            if(strictMode)
              startGame();
            else{
              playSequence();
              index=0;
            }
          },1000);  
        }
      }
    }
  }
  
  
  /////////////
  //red click//
  /////////////
  $scope.redClickDown = function(){
    if (userInput && onOffState){
      new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3').play();
      document.getElementById("redButton").style.background='#ff3333';
    }
  }
  $scope.redClickUp = function(){
    if (userInput && onOffState){
      document.getElementById("redButton").style.background='#cc0000';
      console.log(sequence);
      console.log(sequence[index]);
      if (userInput){
        if (sequence[index] == 'r'){
          if (index==sequence.length-1 && auxCounter!=20){
            updateCounter();
            increaseSequence();
            //reinit index
            index=0;
            console.log(sequence);
            playSequence();
          }
          else if (index==sequence.length-1 && auxCounter==20)
            victory();
          else
            index+=1;
        }
        else{
          wrongInput('red');
          $timeout(function(){
            if(strictMode)
              startGame();
            else{
              playSequence();
              index=0;
            }
          },1000);
        }
      }
    }
  }
  
  
  //////////////
  //blue click//
  //////////////
  $scope.blueClickDown = function(){
    if (userInput && onOffState){
      new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3').play();
      document.getElementById("blueButton").style.background='#5c5cd6';
    }
  }
  $scope.blueClickUp = function(){
    if (userInput && onOffState){
      document.getElementById("blueButton").style.background='#24248f';
      console.log(sequence);
      console.log(sequence[index]);
      if (userInput){
        if (sequence[index] == 'b'){
          if (index==sequence.length-1 && auxCounter!=20){
            updateCounter();
            increaseSequence();
            //reinit index
            index=0;
            console.log(sequence);
            playSequence();
          }
          else if (index==sequence.length-1 && auxCounter==20)
            victory();
          else
            index+=1;
        }
        else{
          wrongInput('blue');
          $timeout(function(){
            if(strictMode)
              startGame();
            else{
              playSequence();
              index=0;
            }
          },1000);
        }
      }
    }
  }
  
  
  ////////////////
  //yellow click//
  ////////////////
  $scope.yellowClickDown = function(){
    if (userInput && onOffState){
      new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3').play();
      document.getElementById("yellowButton").style.background='#ffff33';
    }
  }
  $scope.yellowClickUp = function(){
    if (userInput && onOffState){
      document.getElementById("yellowButton").style.background='#e6e600';
      console.log(sequence);
      console.log(sequence[index]);
      if (userInput){
        if (sequence[index] == 'y'){
          if (index==sequence.length-1 && auxCounter!=20){
            updateCounter();
            increaseSequence();
            //reinit index
            index=0;
            console.log(sequence);
            playSequence();
          }
          else if (index==sequence.length-1 && auxCounter==20)
            victory();
          else
            index+=1;
        }
        else{
          wrongInput('yellow');
          $timeout(function(){
            if(strictMode)
              startGame();
            else{
              playSequence();
              index=0;
            }
          },1000);
        }
      }
    }
  }
  
}]);