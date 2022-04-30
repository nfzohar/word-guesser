var try_number = 0;
var selected_word = 'TESTS';

// Main function.
function checkTheWord() {

    if (noBlankFields()) {
        checkGuessWord();
    } else {
        document.getElementById('main_text_output').innerHTML = '<b style="color: red;">FILL IN ALL SLOTS!</b>';

        setTimeout(function() {
            document.getElementById('main_text_output').innerText = 'GUESS THE WORD IN 6 TRIES OR LESS';
        }, 1000);
    }
}

// Check if the word matches the selected word.
function checkGuessWord() {

    if (try_number < 6) {
        let innerContent = '<div>' +
            '<input class="wordle_guess_word_past" type="text" disabled="true">' +
            '<input class="wordle_guess_word_past" type="text" disabled="true">' +
            '<input class="wordle_guess_word_past" type="text" disabled="true">' +
            '<input class="wordle_guess_word_past" type="text" disabled="true">' +
            '<input class="wordle_guess_word_past" type="text" disabled="true">' +
            '</div>';

        document.getElementById('word_results').innerHTML += innerContent;
        try_number++;
    } else {
        alert('SORRY,\nYOU LOST THE GAME.\nTHE WORD WAS ' + selected_word);
    }

}

// Display the rules.
function displayRules() {
    let currentState = document.getElementById('rules_section').style.display;

    if (currentState === 'none') {
        document.getElementById('rules_section').style.display = 'static';
    } else {
        document.getElementById('rules_section').style.display = 'none';
    }
}

// Blank fields check.
function noBlankFields() {
    if (document.getElementById("field_1").value != '' &&
        document.getElementById("field_2").value != '' &&
        document.getElementById("field_3").value != '' &&
        document.getElementById("field_4").value != '' &&
        document.getElementById("field_5").value != '') {
        return true;
    } else { return false; }
}