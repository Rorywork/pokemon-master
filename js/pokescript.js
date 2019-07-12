/*
Global variables used across multiple functions in the code
*/
let apiReturn;
let gameState = "off";
let looper;
let degrees = 0;
let numAnswers = 5; // How many possible answers to display
let candidateAnswerPokemonNames = []; // Initialise array for Pokemon names
let ansHighlightPos // Answer list highlight position 
let userScore;

/*
Pokemon object to store returned details from API calls.
Includes a function to capitalise the returned Pokemon name
*/
class Pokemon {
    constructor(id, name, frontImage, backImage, type, ability, weight, height) {
        this.id = id;
        this.name = name;
        this.frontImage = frontImage;
        this.backImage = backImage;
        this.type = type;
        this.ability = ability;
        this.weight = weight;
        this.height = height;
    }
    getName() {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1); // String manipulation to Capitalise Pokemon name
    }
}

/*
Event listeners for the two Red onscreen buttons
Invoke action handlers based upon which has been clicked
*/
document.getElementById('A-Button').addEventListener('click', function () {
    //console.log(gameState);
    buttonAHandler();
}, false);

document.getElementById('B-Button').addEventListener('click', function () {
    //console.log(gameState);
    buttonBHandler();
}, false);

document.getElementById('point-6').addEventListener('click', function () {
    //console.log(gameState);
    listDown();
}, false);

document.getElementById('point-2').addEventListener('click', function () {
    //console.log(gameState);
    listUp();
}, false);

document.getElementById('point-8').addEventListener('click', function () {
    //console.log(gameState);
    listDown();
}, false);

document.getElementById('point-4').addEventListener('click', function () {
    //console.log(gameState);
    listUp();
}, false);


/* 
Event listeners for keyboard arrow keys and Enter as alternatives to onscreen arrow keys to select the correct answer
Also can use the A and B keyboard keys as alternatives to onscreen buttons
gameState checking required throughout. 
 */
document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowUp' && gameState == "selecting-answer") {
        listUp()
    }
    if (event.code == 'ArrowDown' && gameState == "selecting-answer") {
        listDown();
    }
    if (event.code == 'ArrowLeft' && gameState == "selecting-answer") {
        listUp();
    }
    if (event.code == 'ArrowRight' && gameState == "selecting-answer") {
        listDown();
    }
    if (event.code == 'Enter' && gameState == "selecting-answer") {
        checkAnswer();
    }
    if (event.code == 'KeyA' && gameState != "selecting-answer") {
        buttonAHandler();
    }
    if (event.code == 'KeyA' && gameState == "selecting-answer") {
        checkAnswer();
    }
    if (event.code == 'KeyB') {
        buttonBHandler();
    }
});

/*
Function to manage the on/off switch of the simulated Gameboy device.
Uses background colour to simulate the screen backlight going on and off
Displays Pokemon logo and removes it as necessary. 
*/
function buttonOnOffHandler() {

    if (document.getElementById("checkboxSwitch").checked) {
        getApi('101'); // Id for electrode is 101 
        document.getElementById("gameboyScreen").className = "screen";
        document.getElementById("mainBody").innerHTML = "Press A to play Pokemon Master";
        let elem = document.createElement("img");
        elem.setAttribute('id', 'pokeImage');
        document.getElementById("mainBody").appendChild(elem);
        elem.src = "assets/images/pokemon-logo.png";
        elem.classList.add("pokelogo");

    } else { // Simulate switching off the Gameboy
        // Reset variables
        gameState = "off";
        userScore = 0;
        candidateAnswerPokemonNames = [];
        // Clear contents from screen
        document.getElementById("scoreScreen").innerHTML = "";
        document.getElementById("mainBody").innerHTML = "";
        let elem = document.getElementById("pokeImage");
        if (elem != null) {
            document.getElementById("image").removeChild(elem);
        }
        document.getElementById("gameboyScreen").className = "offScreen";
    }
}

/*
Function to generate a number of possible answers when the user is ready to guess the Pokemon.
Uses global variable numAnswers to determine how many possible answers ( default 5 )
First step is to generate 4 random numbers between 1 and 151 (no. of Pokemon characters) into an array pokemonAnswerIDs
Then add the correct answer to the array
Second step is to loop through the full Pokedex returned from the API call and load the Pokemon names to array candidateAnswerPokemonNames
Final step is to cycle through the array  and dynamically populate the popup menu with the possible answers.
*/
function getRandomCandidateAnswers() {

    let pokemonAnswerIDs = []; // Initialise array to generate random pokemon IDs

    // Loop numAnswers - 1 times to populate array. (minus 1 to accomodate an element for the correct answer)
    for (i = 0; i < numAnswers - 1; i++) {

        const candidateAnswerID = Math.floor(Math.random() * 151) + 1;
        pokemonAnswerIDs.indexOf(candidateAnswerID) === -1 && candidateAnswerID != apiReturn.id ? pokemonAnswerIDs.push(candidateAnswerID) : i--;
    }

    // Finally add the correct Pokemon ID to the array
    pokemonAnswerIDs.push(apiReturn.id);

    //console.log(`The indexes of the possible answers are ${pokemonAnswerIDs}`);

    // Code to build array of possible answers from the API pokemon names seleced from the random IDs above
    const pokeapiURL = "https://pokeapi.co/api/v2/generation/1"; // API call to return full Pokedex
    // Fetch execute to return API data as JSON to variable data
    fetch(pokeapiURL)
        .then(results => {
            return results.json();
        })
        .then(data => {
            //console.log(data);
            //console.log(data.pokemon_species[1]);

            // Loop through species element to retrieve Pokemon name and unique url       
            data.pokemon_species.forEach(function (pokemon, index) {
                //console.log(pokemon.name);
                let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // String manipulation to Capitalise Pokemon name
                let url = pokemon.url;
                // get the Index of the specific Pokemon via substring on the url looking for pos "s/" and final "/"
                let pIndex = url.substring(
                    url.lastIndexOf("s/") + 2,
                    url.lastIndexOf("/")
                );
                // If the PokemonAnswerIDs array contains the current pIndex from the API call, then push the name onto the array
                pokemonAnswerIDs.indexOf(parseInt(pIndex)) >= 0 ? candidateAnswerPokemonNames.push(name) : console.log();
            });

            //console.log(`The names of the possible answers are ${candidateAnswerPokemonNames}`);

            ansHighlightPos = 1; // Initialise the position of the highlighted answer

            document.getElementById("mainBody").innerHTML = ""; // Clear the current contents of the main body

            // Cycle through candidate answers and dynamically populate the ul with li name entries
            let listHtml = "<ul class='navmenu'>";
            candidateAnswerPokemonNames.forEach(function (pokemonName, index) {
                listHtml += "<li id='listPos" + (index + 1).toString() + "'><a href='#'>" + pokemonName + "</a></li>";
            });
            listHtml += '</ul>';
            document.getElementById('mainBody').innerHTML = listHtml; //Add the ul block to the DOM

            // Set the initial li element to be highlighted
            document.getElementById("listPos1").setAttribute("style", "background-color:#555;");

            console.log("Fetch successful")
        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
}

/*
Functions to manage the screen highlight bar when selecting the Pokemon answer
Works with both on screen arrow keys on the gameboy and keyboard arrow keys
*/
function listDown() {
    document.getElementById("listPos" + ansHighlightPos.toString()).setAttribute("style", "background-color:#b2f700");
    ansHighlightPos++;
    if (ansHighlightPos == numAnswers + 1) ansHighlightPos = 1;
    document.getElementById("listPos" + ansHighlightPos.toString()).setAttribute("style", "background-color:#555");
}

function listUp() {
    document.getElementById("listPos" + ansHighlightPos.toString()).setAttribute("style", "background-color:#b2f700");
    ansHighlightPos--;
    if (ansHighlightPos == 0) ansHighlightPos = numAnswers;
    document.getElementById("listPos" + ansHighlightPos.toString()).setAttribute("style", "background-color:#555");
}

/*
Function to identify which answer has been selected either by onscreen A key or keyboard and
determine if answer if correct. Screen responses as per outcome.
*/
function checkAnswer() {
    let isCorrect = ((apiReturn.name == candidateAnswerPokemonNames[ansHighlightPos - 1]) ? 'correct' : 'incorrect');
    document.getElementById("mainBody").innerHTML = `You selected ${candidateAnswerPokemonNames[ansHighlightPos - 1]}. That is ${isCorrect}.`;

    if (apiReturn.name == candidateAnswerPokemonNames[ansHighlightPos - 1]) {
        document.getElementById("mainBody").innerHTML += ` Click A to reveal ${apiReturn.name} from the front.`;
        userScore++;
        document.getElementById("scoreScreen").innerHTML = `${userScore} points.`;
        gameState = "next-pokemon";
    } else {
        document.getElementById("scoreScreen").innerHTML = `You scored ${userScore} points. Click A to play again.`;
        document.getElementById("mainBody").innerHTML += ` The correct answer is ${apiReturn.name}`;
        document.querySelector("img").src = apiReturn.frontImage;
        userScore = 0
        gameState = "loading-screen";
    }
    candidateAnswerPokemonNames = []; // Reset the array of possible answers
}

/*
Function to make API call to PokeAPI and return details for a specific Pokemon ID
Default is id 101 ( Electrode ) if no parameter is passed.
JSON results are loaded to the Pokemon object for ongoing reference in the game
*/
function getApi(selectApi) {

    const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
    selectApi === "101" ? apiUrl = `${baseUrl}${selectApi}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;

    fetch(apiUrl)
        .then(results => {
            return results.json();
        })
        .then(data => {

            //console.log(data);

            apiReturn = new Pokemon(
                data.id,
                data.species.name.charAt(0).toUpperCase() + data.species.name.slice(1),
                data.sprites.front_default,
                data.sprites.back_default,
                data.types[0].type.name,
                data.abilities[0].ability.name,
                data.weight,
                data.height)

            console.log("Fetch successful")

        })
        .catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });
}

/*
Function to handle button A events which are invoked for most of the game.
gameState variable is checked on switch statement to determine appropriate actions
*/
function buttonAHandler() {

    if (document.getElementById("checkboxSwitch").checked) {

        console.log(`The game state is ${gameState}`);
        switch (gameState) {
            case "off":
                document.getElementById("mainBody").innerHTML = "Loading Pokemon Master. Press A to view instructions.";
                let elem = document.createElement("img");
                elem.setAttribute('id', 'pokeImage');
                document.getElementById("image").appendChild(elem);
                document.getElementById("pokeImage").classList.add("reg-pokemon");
                elem.src = apiReturn.frontImage;
                gameState = "loading-screen";
                userScore = 0;
                break;

            case "loading-screen":
                document.getElementById("scoreScreen").innerHTML = "";

                document.getElementById("pokeImage").classList.add("rotate");
                document.getElementById("mainBody").innerHTML = "Here are the instructions on how to play the game. The back of a pokemon will appear on screen, press the A button to get clues about the pokemon, when you are ready to guess press the B button<br><br> Now press A button to start the game.";
                getApi();
                gameState = "instructions-screen";
                break;

            case "next-pokemon":
                document.getElementById("pokeImage").classList.remove("rotate");
                document.getElementById("pokeImage").classList.remove("reg-pokemon");
                document.getElementById("pokeImage").classList.add("big-pokemon");
                document.querySelector("img").src = apiReturn.frontImage;
                document.getElementById("mainBody").innerHTML = "Click A for the next Pokemon";
                getApi();
                gameState = "instructions-screen";
                break;

            case "instructions-screen":
                document.getElementById("mainBody").innerHTML = `Below is the image of a pokemon from the back. Can you guess which one it is?`;
                document.getElementById("pokeImage").src = apiReturn.backImage;
                document.getElementById("pokeImage").classList.remove("big-pokemon");
                document.getElementById("pokeImage").classList.add("reg-pokemon");
                document.getElementById("pokeImage").classList.add("rotate");
                gameState = "first-clue-screen"
                break;

            case "first-clue-screen":
                document.getElementById("mainBody").innerHTML = `The Pokemon is a ${apiReturn.type} Pokemon.`;
                gameState = "second-clue-screen"
                break;

            case "second-clue-screen":
                document.getElementById("mainBody").innerHTML = `The Pokemon has the ability ${apiReturn.ability}`;
                gameState = "third-clue-screen"
                break;

            case "third-clue-screen":
                document.getElementById("mainBody").innerHTML = `The Pokemon weighs ${apiReturn.weight} Pokegrams`;
                gameState = "must-answer-screen"
                break;

            case "must-answer-screen":
                document.getElementById("mainBody").innerHTML = `There are no more clues. You must now guess the answer.`;
                break;

            case "selecting-answer":
                checkAnswer();
                break;
        }

    }
}

/*
Function to handle button B events which is invoked when ready to guess the Pokemon.
gameState variable is checked to ensure no code execution outside of the user being ready to guess the pokemon
*/
function buttonBHandler() {

    console.log(`The game state is ${gameState}`);
    if (gameState == "first-clue-screen" || gameState == "second-clue-screen" || gameState == "third-clue-screen" || gameState == "must-answer-screen") {
        getRandomCandidateAnswers();
        gameState = "selecting-answer"
    }

}

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
