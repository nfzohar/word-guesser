var try_number = 0;
var selected_word = 'TESTS';

// Main function.
function checkTheWord() {

    if (noBlankFields()) {
        if (noNumbersInFields()) {
            checkGuessWord();
        } else {
            showError('numbers');
        }
    } else {
        showError('empty_slots');
    }
}

// Check if the word matches the selected word.
function checkGuessWord() {
    if (try_number < 6) {
        let innerContent = '<div>' +
            //'<input class="word_guess_word_past" type="text" disabled="true">' +
            //'<input class="word_guess_word_past" type="text" disabled="true">' +
            //'<input class="word_guess_word_past" type="text" disabled="true">' +
            //'<input class="word_guess_word_past" type="text" disabled="true">' +
            //'<input class="word_guess_word_past" type="text" disabled="true">' +
            getLettersFromTry(1) +
            getLettersFromTry(2) +
            getLettersFromTry(3) +
            getLettersFromTry(4) +
            getLettersFromTry(5) +
            '</div>';

        document.getElementById('word_results').innerHTML += innerContent;
        try_number++;
    } else {
        alert('SORRY,\nYOU LOST THE GAME.\nTHE WORD WAS ' + selected_word);
    }
}

// test method - WIO
function getLettersFromTry(nmbr) {
    let output;
    let l;

    switch (nmbr) {
        case 1:
            {
                l = document.getElementById('field_1').value;
                document.getElementById('field_1').value = '';
                break;
            }

        case 2:
            {
                l = document.getElementById('field_2').value;
                document.getElementById('field_2').value = '';
                break;
            }

        case 3:
            {
                l = document.getElementById('field_3').value;
                document.getElementById('field_3').value = '';
                break;
            }

        case 4:
            {
                l = document.getElementById('field_4').value;
                document.getElementById('field_4').value = '';
                break;
            }

        case 5:
            {
                l = document.getElementById('field_5').value;
                document.getElementById('field_5').value = '';
                break;
            }

        default:
            break;
    }

    output = '<input class="word_guess_word_past" type="text" disabled="true" value="' + l + '">';
    document.getElementById('field_1').focus();
    return output;
}

// Display the rules.
function displayRules() {
    if (document.getElementById('rules_section').style.display === 'none') {
        document.getElementById('rules_section').style.display = 'block';
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

// Numbers in fields check.
function noNumbersInFields() {
    let resultBool;

    for (let i = 0; i <= 9; i++) {
        if (document.getElementById('field_1').value != i &&
            document.getElementById('field_2').value != i &&
            document.getElementById('field_3').value != i &&
            document.getElementById('field_4').value != i &&
            document.getElementById('field_5').value != i) {
            resultBool = true;
        } else { resultBool = false; }
    }

    return resultBool;
}

// Display different errors.
function showError(errorType) {
    let error_message;

    if (errorType === 'empty_slots') {
        error_message = 'FILL IN ALL SLOTS!';
    }
    if (errorType === 'numbers') {
        error_message = "DON'T USE NUMBERS!";
    }
    if (errorType === 'word_not_in_list') {
        error_message = "WORD IS NOT ON THE LIST!";
    }

    document.getElementById('main_text_output').innerHTML = '<b style="color: red;">' + error_message + '</b>';
    setTimeout(function() {
        document.getElementById('main_text_output').innerText = 'GUESS THE WORD IN 6 TRIES OR LESS';
    }, 1000);
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