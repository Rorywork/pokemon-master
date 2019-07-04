//----------------------------------------
// Global variables used across multiple functions in the code
let apiReturn;
let gameState = "off";
let looper;
let degrees = 0;
let numAnswers = 5; // How many possible answers to display
let candidateAnswerPokemonNames = []; // Initialise array for Pokemon names
let ansHighlightPos // Answer list highlight position 
let userScore;
//----------------------------------------

// Define Pokemon object to store key details from API calls.
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

// Event listeners for the two Red buttons
document.getElementById('A-Button').addEventListener('click', function () {
    console.log(gameState);
    buttonAHandler();
}, false);

document.getElementById('B-Button').addEventListener('click', function () {
    console.log(gameState);
    buttonBHandler();
}, false);

// Event listeners for keyboard arrow keys and Enter as alternatives to onscreen arrow keys to select the correct answer - checking that it can only be invoked on the correct gameState
document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowUp' && gameState == "selecting-answer") {
        listUp()
    }
});
document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowDown' && gameState == "selecting-answer") {
        listDown();
    }
});
document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowLeft' && gameState == "selecting-answer") {
        listUp();
    }
});
document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowRight' && gameState == "selecting-answer") {
        listDown();
    }
});
document.addEventListener('keydown', function (event) {
    if (event.code == 'Enter' && gameState == "selecting-answer") {
        checkAnswer();
    }
});


function buttonOnOffHandler() {

    if (document.getElementById("checkboxSwitch").checked) {
        getApi('101');  // Id for electrode is 101 
        document.getElementById("gameboyScreen").className = "screen";

    } else { // Simulate switching off the Gameboy
        // Reset variables
        gameState = "off";
        userScore = 0;
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

function getRandomCandidateAnswers() {

    let pokemonAnswerIDs = []; // Initialise array to generate random pokemon IDs

    // Loop numAnswers - 1 times to populate array. (minus 1 to accomodate an element for the correct answer)
    for (i = 0; i < numAnswers - 1; i++) {

        const candidateAnswerID = Math.floor(Math.random() * 151) + 1;
        pokemonAnswerIDs.indexOf(candidateAnswerID) === -1 && candidateAnswerID != apiReturn.id ? pokemonAnswerIDs.push(candidateAnswerID) : i--;
    }

    // Finally add the correct Pokemon ID to the array
    pokemonAnswerIDs.push(apiReturn.id);

    console.log(`The indexes of the possible answers are ${pokemonAnswerIDs}`);

    // Code to build array of possible answers from the API pokemon names seleced from the random IDs above
    const pokeapiURL = "https://pokeapi.co/api/v2/generation/1"; // API call to return full Pokedex
    // Fetch execute to return API data as JSON to variable data
    fetch(pokeapiURL)
        .then(results => {
            return results.json();
        })
        .then(data => {
            console.log(data);
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

            console.log(`The names of the possible answers are ${candidateAnswerPokemonNames}`);

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

function rotateAnimation(el, speed) {

    clearTimeout(looper);
    let elem = document.getElementById(el);
    elem.style.transform = "rotate(" + degrees + "deg)";
    looper = setTimeout('rotateAnimation(\'' + el + '\',' + speed + ')', speed);
    degrees++;
    if (degrees > 359) {
        degrees = 1;
    }
}

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
        document.getElementById("mainBody").innerHTML += ` The right answer is ${apiReturn.name}`;
        document.querySelector("img").src = apiReturn.frontImage;
        userScore = 0
        gameState = "loading-screen";
    }
    candidateAnswerPokemonNames = []; // Reset the array of possible answers
}

function getApi(selectApi) {

    const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
    selectApi === "101" ? apiUrl = `${baseUrl}${selectApi}` : apiUrl = `${baseUrl}${(Math.floor(Math.random() * 151) + 1).toString()}`;

    fetch(apiUrl)
        .then(results => {
            return results.json();
        })
        .then(data => {

            console.log(data);

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

function buttonAHandler() {

    if (document.getElementById("checkboxSwitch").checked) {

    console.log(`The game state is ${gameState}`);
    switch (gameState) {
        case "off":
            document.getElementById("mainBody").innerHTML = "Loading Pokemon Master";
            let elem = document.createElement("img");
            elem.setAttribute('id', 'pokeImage');
            document.getElementById("image").appendChild(elem);
            elem.src = apiReturn.frontImage;
            gameState = "loading-screen";
            userScore = 0;
            break;

        case "loading-screen":
            document.getElementById("scoreScreen").innerHTML = "";
            rotateAnimation("pokeImage", 10);
            document.getElementById("mainBody").innerHTML = "Here are the instructions on how to play the game. The back of a pokemon will appear on screen, press the A button to get clues about the pokemon, when you are ready to guess press the B button<br><br> Now press A button to start the game.";
            getApi();
            gameState = "instructions-screen";
            break;
            
            case "next-pokemon":
                document.querySelector("img").src = apiReturn.frontImage;
                rotateAnimation("pokeImage", 10);
                document.getElementById("mainBody").innerHTML = "Click A for the next Pokemon";
                getApi();
                gameState = "instructions-screen";
                break;
                
            case "instructions-screen":
                document.getElementById("mainBody").innerHTML = `Below is the image of a pokemon from the back. Can you guess which one it is?`;
                document.getElementById("pokeImage").src = apiReturn.backImage;
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

function buttonBHandler() {

    if (gameState == "first-clue-screen" || gameState == "second-clue-screen" || gameState == "third-clue-screen" || gameState == "must-answer-screen") {
        getRandomCandidateAnswers();
        gameState = "selecting-answer"
    }

}