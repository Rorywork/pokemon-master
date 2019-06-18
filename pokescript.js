/* global $ */

var selectedPokemon  // Initialise variable to hold random Pokemon ID

var  name
            
var frontImage
        
var backImage
        
var typeOfPokemon 
        
var abilityOne
        
var weight

var looper;

var degrees = 0;

var numAnswers = 5;      // How many possible answers to display

var candidateAnswerPokemonNames = [];       // Initialise array for Pokemon names

var ansHighlightPos      // Answer list highlight position 

var userScore;

var gameStatus = ""; // Holds the status of the game i.e what page/section it is on


// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
    
 });




function firstClue(){
    
        let pokeapiUrl = `https://pokeapi.co/api/v2/pokemon/${(Math.floor(Math.random() * 151) + 1).toString()}`; // Generates a random pokemon id from the API
        $("#scoreScreen").empty();
        $("#mainBody").empty();
        
        writeText(" Below is an image from the back of the Pokemon that you have to guess... Click A if you need another clue.")
    
        console.log(pokeapiUrl);
    
         $.getJSON(pokeapiUrl).done(function(data){
            console.log(data);
    
        selectedPokemon = data.id;
            console.log (selectedPokemon);
    
        name = data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1);
            console.log(name);
            
        frontImage = data.sprites.front_default;
        console.log(frontImage)
        
        backImage = data.sprites.back_default;
        
        typeOfPokemon = data.types[0].type.name;
            console.log(typeOfPokemon);
        
        abilityOne = data.abilities[0].ability.name;
            console.log(abilityOne);
        
        weight = data.weight;
            console.log(weight);
            
        backImagePokemon();    
     }).fail(function(){
         console.log("Request to Pokeapi failed.")
     }).always(function(){
        console.log("Request to Pokeapi was successful.");
        gameStatus ="firstclueloaded"
     });    
        
}



function frontImagePokemon(){
    
    let frontSprite = $("<div>").html("<img src=" + frontImage + "></img>");
    frontSprite.appendTo("#front-image-div");
    console.log(frontImage)
    
    
}

function backImagePokemon(){
    
    let backSprite = $("<div>").html("<img src=" + backImage + "></img>");
    
    $("#loading-image").empty();
    
    backSprite.appendTo("#loading-image");
    console.log(backImage)
    
    
}

function secondClue(){
    
    let pokemonType = $("<p>").html(`This is a ${typeOfPokemon} Pokemon. Click A if you need another clue.`)
        $("#mainBody").empty();
               pokemonType.appendTo("#mainBody");
               
    gameStatus ="secondclueloaded"
    
    
}

function thirdClue(){
    
    let pokemonAbility = $("<p>").html(`This Pokemon has the ability ${abilityOne}. Click A if you need another clue.`)
               pokemonAbility.appendTo("#mainBody");

    gameStatus ="thirdclueloaded"
    
}

function fourthClue(){
    
    let pokemonWeight = $("<p>").html(`This Pokemon weighs ${weight} Pokegrams. That is all the clues. Now you need to choose the Pokemon by pressing button B`)
               pokemonWeight.appendTo("#mainBody");

    gameStatus ="fourthclueloaded"

}



function getPokedex() {
    
    // get the list of Pokemon
    var pokeapiURL = "https://pokeapi.co/api/v2/generation/1";
    
    $.getJSON(pokeapiURL).done(function(data) {
        console.log(data);
        // if required data element is an array then loop through each of the entries
        
        
        
        $.each(data.pokemon_species, function(index,pokemon) {
            console.log(pokemon.name);
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // String manipulation to Capitalise
            var url = pokemon.url;
            // get the Index of the specific Pokemon via substring on the url loking for pos "s/" and final "/"
            var pIndex = url.substring(
                url.lastIndexOf("s/") + 2, 
                url.lastIndexOf("/")
            );
        var pokedex = $("<p>").html(`Pokemon is ${name}`)
              pokedex.appendTo("#pokedex-div");
        });
    });
}    



function getRandomCandidateAnswers() {
    
    var pokemonAnswerIDs = [];            // Initialise array to generate random pokemon IDs
    
    // Loop numAnswers - 1 times to populate array. (minus 1 to accomodate an element for the correct answer)
    for (i = 0; i < numAnswers - 1; i++) {
        
        var candidateAnswerID = Math.floor(Math.random() * 151) + 1;
        pokemonAnswerIDs.indexOf(candidateAnswerID) === -1 && candidateAnswerID != selectedPokemon ? pokemonAnswerIDs.push(candidateAnswerID) :  i-- ;
    }
    
    // Finally add the correct Pokemon ID to the array
    pokemonAnswerIDs.push(selectedPokemon);
    
    console.log(pokemonAnswerIDs);    
    
    // Code to build array of possible answers from the API pokemon names seleced from the random IDs above
    
    var pokeapiURL = "https://pokeapi.co/api/v2/generation/1";      // API call to return full Pokedex

    
    // JSON execute to return API data to variable data
    $.getJSON(pokeapiURL).done(function(data) {
        //console.log(data);
       
        // Loop through species element to retrieve Pokemon name and unique url       
        $.each(data.pokemon_species, function(index,pokemon) {
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // String manipulation to Capitalise Pokemon name
            var url = pokemon.url;
            // get the Index of the specific Pokemon via substring on the url looking for pos "s/" and final "/"
            var pIndex = url.substring(
                url.lastIndexOf("s/") + 2, 
                url.lastIndexOf("/")
            );
            
            // If the PokemonAnswerIDs array contains the current pIndex from the API call, then push the name onto the array
            
            pokemonAnswerIDs.indexOf(parseInt(pIndex)) >= 0 ? candidateAnswerPokemonNames.push(name) : console.log() ;
        });
        
    console.log(candidateAnswerPokemonNames);
    
    ansHighlightPos = 1;
    
     $("#mainBody").empty();
    
    var listHtml = "<ul class='navmenu'>";
    
    $.each(candidateAnswerPokemonNames, function(index,pokemonName) {
        listHtml += "<li id='listPos" + (index + 1).toString() + "'><a href='#'>" + pokemonName + "</a></li>";
    });
    
    listHtml += '</ul>';
    $('#mainBody').append(listHtml);
    
    $('.navmenu').on('click','li', function(){
        $('.navmenu li.active').removeClass('active');
        $(this).addClass('active');
    })
    
    $("#listPos1").css("background-color", "#555");


    }).fail(function(){
         console.log("Request to Pokeapi failed.")
     }).always(function(){
        console.log("Request to Pokeapi was successful.");
        gameStatus ="answerlist"
     });   
    
}


function getElectrode(){
    
     let pokeapiUrl = "https://pokeapi.co/api/v2/pokemon/electrode"
    
        console.log(pokeapiUrl);
    
         $.getJSON(pokeapiUrl).done(function(data){
            console.log(data);
    
        frontImage = data.sprites.front_default;
        console.log(frontImage)
        
        $("#loading-image").empty();
        
        $('#loading-image').prepend("<img id='img1' src=" + frontImage + "></img>")
        
      
     }).fail(function(){
         console.log("Request to Pokeapi failed.")
     }).always(function(){
        console.log("Request to Pokeapi was successful.");
        gameStatus ="loadingcompleted"
     });  
    
}

function writeText(message){
    
    let screenMessage = $("<p>").html(message)
    
    $("#mainBody").empty();
    
    screenMessage.appendTo("#mainBody")
}

function loadingScreen(){
    
    console.log("Testing")
    
    writeText("Loading....");
    getElectrode();
    userScore = 0;
    gameStatus = "loadingcompleted"
    
}

function rotateAnimation(el,speed){
    
	var elem = document.getElementById(el);
	if(navigator.userAgent.match("Chrome")){
		elem.style.WebkitTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Firefox")){
		elem.style.MozTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("MSIE")){
		elem.style.msTransform = "rotate("+degrees+"deg)";
	} else if(navigator.userAgent.match("Opera")){
		elem.style.OTransform = "rotate("+degrees+"deg)";
	} else {
		elem.style.transform = "rotate("+degrees+"deg)";
	}
	looper = setTimeout('rotateAnimation(\''+el+'\','+speed+')',speed);
	degrees++;
	if(degrees > 359){
		degrees = 1;
	}
	
}


function showGameInstructions() {
    
    $("#scoreScreen").empty();
    
    rotateAnimation('img1',10);
    writeText('Here are the instructions on how to play the game. The back of a pokemon will appear on screen, press the B button to get clues about the pokemon, when you are ready to guess press the A button')
    gameStatus = "instructionsloaded"
}

function listDown(){
    $("#listPos" + ansHighlightPos.toString()).css("background-color", "#f1f1f1");    
    ansHighlightPos ++;
    if(ansHighlightPos == numAnswers + 1) ansHighlightPos = 1;
    $("#listPos" + ansHighlightPos.toString()).css("background-color", "#555");    
}

function listUp(){
    $("#listPos" + ansHighlightPos.toString()).css("background-color", "#f1f1f1");    
    ansHighlightPos --;
    if(ansHighlightPos == 0) ansHighlightPos = numAnswers;
    $("#listPos" + ansHighlightPos.toString()).css("background-color", "#555");    
}


function checkAnswer() {
  
    var isCorrect = ((name == candidateAnswerPokemonNames[ansHighlightPos - 1]) ? 'correct' : 'incorrect');
    $("#mainBody").empty();
    writeText("You selected " + candidateAnswerPokemonNames[ansHighlightPos - 1] + ". That is " + isCorrect);
    
    $("#scoreScreen").empty();
    
    
    if(name == candidateAnswerPokemonNames[ansHighlightPos - 1]) {
        userScore ++ ;
        var screenScore = $("<p>").html(`${userScore} points. Click A for next pokemon`)
        screenScore.appendTo("#scoreScreen");
        gameStatus = "instructionsloaded";
    } else {
        var screenScore = $("<p>").html(`Game over you scored ${userScore} points. Click A to play again.`)
        screenScore.appendTo("#scoreScreen");
        userScore = 0
        gameStatus = "instructionsloaded";
    }
    
    candidateAnswerPokemonNames = [];       // Reset the array of possible answers
        
}

function buttonAHandler(){
    
    console.log(gameStatus);
   if (gameStatus == ""){
        
        loadingScreen();
        
    }
    
    else if (gameStatus == "loadingcompleted"){
        
        showGameInstructions();
        
    }

    else if (gameStatus == "instructionsloaded"){
        
        firstClue();
        
    }
    else if (gameStatus == "firstclueloaded"){
        
        secondClue();
        
    }
    else if (gameStatus == "secondclueloaded"){
        
        thirdClue();
        
    }
    else if (gameStatus == "thirdclueloaded"){
        
        fourthClue();
        
    }
    else if (gameStatus == "answerlist"){
        
        checkAnswer();
        
    }
    
    
}

function buttonBHandler(){
    
    if (gameStatus == "firstclueloaded" || gameStatus =="secondclueloaded" || gameStatus =="thirdclueloaded" || gameStatus =="fourthclueloaded"){
        
        getRandomCandidateAnswers();
        
    } 
    
}

