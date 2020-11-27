  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var speechGrammars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z', 'clue', 'reset', 'food', 'animals', 'cities', 'countries'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'
  var categoryIndex;
  var expression;         //what the user speaks to the computer

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("clue");
  var showClue = document.getElementById("clueText");

  //category buttons
  var foodC = document.getElementById("food");
  var animalC = document.getElementById("animals");
  var citiesC = document.getElementById("cities");
  var countriesC = document.getElementById("countries");

  //displays
  var categoryDisplay = document.getElementById('categoryInterface');
  var gameDisplay = document.getElementById('gameInterface');

  //for speech output
  var synth = window.speechSynthesis;

  //for speech input
  
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
  var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
  var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

  var grammar = '#JSGF V1.0; grammar words; public <word> = ' + speechGrammars.join(' | ') + ' ;'

  var recognition = new SpeechRecognition();
  var speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);
  recognition.grammars = speechRecognitionList;
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  

  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = alphabet[i];
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Food";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Animals";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Cities";
    } else if (chosenCategory === categories[3]) {
      catagoryName.innerHTML = "The Chosen Category Is Countries";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }

  //speak something back to the user
  speak = function(phrase){
    var spokenOutput = new SpeechSynthesisUtterance(phrase);
    spokenOutput.pitch = 1;
    spokenOutput.rate = 1;
    synth.speak(spokenOutput);
  }

  //find alternative phrases that actually should be letters- tested for the most common ones
  findAltPhrase = function(){
      if(expression == "hey"){
        expression = 'a';
      } else if(expression == "bee"){
        expression = 'b';
      }else if(expression == "see" || expression == 'she'){
        expression = 'c';
      }/*else if(expression == 'b'){
        expression = 'd'
      }*/else if(expression == 'eve' || expression == 'eat' || expression == 'he'){
        expression = 'e';
      }/*else if(expression == 'b'){
        expression = 'f'
      }else if(expression == 'b'){
        expression = 'g'
      }*/else if(expression == 'each'){
        expression = 'h';
      }else if(expression == 'eye'){
        expression = 'i';
      }else if(expression == 'jay'){
        expression = 'j';
      }else if(expression == 'kay'){
        expression = 'k';
      }else if(expression == 'oh'){
        expression = 'l'
      }/*else if(expression == 'b'){
        expression = 'm'
      }else if(expression == 'b'){
        expression = 'n'
      }else if(expression == 'b'){
        expression = 'o'
      }*/else if(expression == 'she' || expression =='key'){
        expression = 'p';
      }else if(expression == 'queue'){
        expression = 'q';
      }else if(expression == 'ar'){
        expression = 'r';
      }else if(expression == 'us'){
        expression = 's';
      }else if(expression == 'chi' || expression == 'cheese'){
        expression = 't';
      }else if(expression == 'you'){
        expression = 'u';
      }/*else if(expression == 'b'){
        expression = 'v'
      }else if(expression == 'b'){
        expression = 'w'
      }else if(expression == 'b'){
        expression = 'x'
      }*/else if(expression == 'why'){
        expression = 'y';
      }else if(expression == 'zeze'){
        expression = 'z';
      }
  }
  
  revealWord = function(){
    for (var i = 0; i < word.length; i++) {
      geusses[i].innerHTML = word[i];
    }
  }

  // Show lives
   comments = function () {
    var didWin = false;
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
      revealWord();
      speak("Game Over, No lives left. The word was "+ word)
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
        didWin = true;
      }
    }
    if(didWin){
      speak("You Won!");
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
  }

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      //mark letter that has been selected for future refrence
      this.style.backgroundColor = 'black';
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        animate();
        speak("Incorrect. You have "+ lives+" lives left.");
        comments();
      } else {
        speak("Correct.");
        comments();
      }
    }
  }
  
 
  // Play
  play = function () {
    categories = [
        ["hamburger", "french fries", "spaghetti", "pizza", "salad", "mac n cheese", "dumplings"],
        ["horse", "narwhal", "zebra", "giraffe", "elephant", "polar bear", "wolf", "cheetah", "lizard"],
        ["manchester", "milan", "madrid", "amsterdam", "prague","seattle"],
        ["united states", "italy", "egypt", "iceland", "brazil", "mexico", "france"]
    ];

    chosenCategory = categories[categoryIndex];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }
  
  // Hint
  clue.onclick = function() {

      hints = [
        ["Fast Food", "Common American Side", "Italian Food", "Lots of Bread and Cheese", "Healthy", "Cheesey", "Asian Food"],
        ["Wears a Saddle", "Unicorn of the Sea", "Stripes", "Long Neck", "Long Trunk", "Lives in the Snow", "Lives in a Pack", "Very Fast", "Has Scales"],
        ["Northern city in the UK", "Known for Fashion", "Spanish capital", "Netherlands capital", "Czech Republic capital", "Northwestern City in the US"],
        ["Cannot keep COVID under control", "Wine and Pasta", "Pyramids", "Land of Waterfalls in the North", "Amazon Rainforest", "Margeritas", "Mona Lisa"]
    ];

    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: " +  hints [categoryIndex][hintIndex];
    //speak the hint to the user
    speak(showClue.innerHTML);
  };

   // Reset
  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    gameDisplay.style.display = 'none';
    categoryDisplay.style.display = 'block';
  }

  //speech input methods
  document.body.onkeyup = function(e){
    e.preventDefault();
    if(e.keyCode == 32){
        recognition.start();
    }
  }

  recognition.onspeechend = function() {
    recognition.stop();
  }

recognition.onnomatch = function() {
  alert("Speech was not heard correctly, try again. ")
}

recognition.onresult = function(event) {
  expression = event.results[0][0].transcript.toLowerCase();
  findAltPhrase()
  if(expression != null && speechGrammars.includes(expression)){
    document.getElementById(expression).click();
  }
  else{
    alert("speech not valid, try again. Heard: "+ expression)
  }
}
  
//start playing game
gameDisplay.style.display = 'none';


foodC.onclick = function(){
  categoryIndex = 0;
  categoryDisplay.style.display = 'none';
  gameDisplay.style.display = 'block';
  speak("You have chosen the category food.");
  play();
};

animalC.onclick = function(){
  categoryIndex = 1;
  categoryDisplay.style.display = 'none';
  gameDisplay.style.display = 'block';
  speak("You have chosen the category Animals.");
  play();
};

countriesC.onclick = function(){
  categoryIndex = 3;
  categoryDisplay.style.display = 'none';
  gameDisplay.style.display = 'block';
  speak("You have chosen the category countries.");
  play();
};

citiesC.onclick = function(){
  categoryIndex = 2;
  categoryDisplay.style.display = 'none';
  gameDisplay.style.display = 'block';
  speak("You have chosen the category cities.")
  play();
};
