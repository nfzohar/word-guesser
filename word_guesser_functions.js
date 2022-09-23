var word_list = [];
var try_number = 0;
var selected_word = chooseRandomWord();

// Main function.
function checkTheWord() {
    if (noBlankFields()) {
        if (noNumbersInFields()) {
            let fullWord = '' + fullGuessWord();
            if (word_list.includes(fullWord.toLowerCase())) {
                checkGuessWord();
            } else {
                showError('word_not_on_list');
            }
        } else {
            showError('numbers');
        }
    } else {
        showError('empty_slots');
    }
}

// Switch to the next input field on letter key press.
function nextInput(targetId) {
    let letterField = document.getElementById("word_guess_input");
    let lettersArrayLowerCase = ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'y', 'x', 'c', 'v', 'b', 'n', 'm']
    let lettersArrayCapitalCase = ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Y', 'X', 'C', 'V', 'B', 'N', 'M']

    letterField.addEventListener("keyup", function(event) {
        if (lettersArrayLowerCase.includes(event.key) || lettersArrayCapitalCase.includes(event.key)) {
            document.getElementById(targetId).focus();
        }
    });
}

// Shortcut the try (>) button to Enter key. 
function runTryOnEnter() {
    let letterField = document.getElementById("word_guess_input");

    letterField.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("word_guess_try").click();
        }
    });
}

// Check if the word matches the selected word.
function checkGuessWord() {
    if (try_number < 6) {

        if (fullGuessWord() === selected_word.toUpperCase()) {
            document.getElementById('guess_game_over').style.display = 'block';
            document.getElementById('guess_game_over_label').innerText = 'CONGRATULATIONS, YOU WIN';
            document.getElementById('guess_game_the_word_was').innerText = 'THE WORD WAS: ' + selected_word;
        } else {
            if (try_number < 6) {
                let innerContent = '<div>' +
                    checkLetter('field_1', 0) +
                    checkLetter('field_2', 1) +
                    checkLetter('field_3', 2) +
                    checkLetter('field_4', 3) +
                    checkLetter('field_5', 4) +
                    '</div>';

                clearTheLetterSlots();
                document.getElementById('word_results').innerHTML += innerContent;
                try_number++;
            } else { showError('no_cheating'); }
        }
    } else {
        document.getElementById('guess_game_over').style.display = 'block';
        document.getElementById('guess_game_over_label').innerText = 'SORRY, YOU LOSE';
        document.getElementById('guess_game_the_word_was').innerHTML = '<span >THE WORD WAS: <b class="text-red-500">' + selected_word + '</b></span>';
    }
}

// Check if the letter is in the word.
function checkLetter(fieldId, letterPlace) {
    let letter = document.getElementById(fieldId).value.toUpperCase();
    let wordToArray = [];
    let element = '<input class="inline my-4 mx-2 w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 xl:w-32 xl:h-32 text-7xl uppercase text-center rounded-xl border-4 font-semibold ';

    for (let i = 0; i < selected_word.length; i++) {
        wordToArray[i] = selected_word.charAt(i).toUpperCase();
    }

    if (wordToArray[letterPlace] === letter) {
        element += 'border-green-300 bg-green-600 text-white"';
    } else if (wordToArray.includes(letter)) {
        element += 'border-yellow-300 bg-yellow-500 text-white"';
    } else {
        element += 'border-gray-300 bg-gray-500 text-white"';
    }
    element += ' type="text" disabled="true" value="' + letter + '">';

    return element;
}

// Select the word to guess.
function chooseRandomWord() {
    word_list = load_word_list();
    let word_list_length = word_list.length - 1;
    let word = word_list[getRandomIntInclusive(0, word_list_length)];

    return word.toUpperCase();
}

// Get a random number between given min and max values.
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Display the rules.
function displayRules() {
    if (document.getElementById('rules_section').style.display == 'none') {
        document.getElementById('rules_section').style.display = 'block';
    } else {
        document.getElementById('rules_section').style.display = 'none';
    }
}

// Blank fields check.
function noBlankFields() {
    let resultBool = false;

    if (document.getElementById('field_1').value != '' &&
        document.getElementById('field_2').value != '' &&
        document.getElementById('field_3').value != '' &&
        document.getElementById('field_4').value != '' &&
        document.getElementById('field_5').value != '') {
        resultBool = true;
    }

    if (document.getElementById("field_1").value === ' ' ||
        document.getElementById("field_2").value === ' ' ||
        document.getElementById("field_3").value === ' ' ||
        document.getElementById("field_4").value === ' ' ||
        document.getElementById("field_5").value === ' ') {
        resultBool = false;
    }

    return resultBool;
}

// Numbers in fields check.
function noNumbersInFields() {
    let resultBool = true;
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < 10; i++) {
        if (numbers.includes(document.getElementById('field_1').value) ||
            numbers.includes(document.getElementById('field_2').value) ||
            numbers.includes(document.getElementById('field_3').value) ||
            numbers.includes(document.getElementById('field_4').value) ||
            numbers.includes(document.getElementById('field_5').value)) {
            resultBool = false;
        }
    }

    return resultBool;
}

// Display different errors.
function showError(errorType) {
    let error_message;

    if (errorType === 'empty_slots') {
        error_message = "FILL IN ALL SLOTS, DON'T USE SPACES! ";
    } else if (errorType === 'numbers') {
        error_message = "DON'T USE NUMBERS!";
    } else if (errorType === 'word_not_on_list') {
        error_message = "WORD IS NOT ON THE LIST!";
    } else if (errorType === 'no_cheating') {
        error_message = "THIS GAME IS DONE, TRY AGAIN!";
    }

    document.getElementById('main_text_output').innerHTML = '<b style="color: red;">' + error_message + '</b>';
    setTimeout(function() {
        document.getElementById('main_text_output').innerText = 'GUESS THE WORD IN 7 TRIES OR LESS';
    }, 1000);
}

// Start a new game.
function startNewGame() {
    try_number = 1;
    selected_word = chooseRandomWord();
    location.reload();
}

// Clear the letter slots.
function clearTheLetterSlots() {
    document.getElementById("field_1").value = '';
    document.getElementById("field_2").value = '';
    document.getElementById("field_3").value = '';
    document.getElementById("field_4").value = '';
    document.getElementById("field_5").value = '';

    document.getElementById("field_1").focus();
}

// Put the word together.
function fullGuessWord() {
    let fullWord = document.getElementById("field_1").value +
        document.getElementById("field_2").value +
        document.getElementById("field_3").value +
        document.getElementById("field_4").value +
        document.getElementById("field_5").value;

    return fullWord.toUpperCase();
}