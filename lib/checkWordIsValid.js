const c_checkWordIsValid = "checkWordIsValid.js";

/**
 * Check whether or not a word ends in ん (or ン).
 * @param {string} word The word to be checked.
 * @returns {boolean} Whether or not the word ends in the character ん.
 */
const endsWithNN = function (word) {
    if (word.at(-1) === "ん") {
        return true;
    }
    if (word.at(-1) === "ン") {
        return true;
    }
    return false;
}

/**
 * Check whether or not a word overlaps with another word.
 * @param {string} toOverlap Word that needs to be overlapped (i.e. the previous word).
 * @param {string} word Word to check (i.e. the current word).
 * @returns {boolean} Whether or not the new word overlaps the previous word.
 */
const overlapsWord = function (toOverlap, word) {
    let initChar = word.at(0);

    if (initChar == caseWord(toOverlap).at(-1) && word.length > 1) {
        return true;
    }

    for (let i = (toOverlap.length - 1); i >= 0; i--) {

        if (initChar !== toOverlap.at(i)) {
            continue;
        }

        let overlap = toOverlap.substring(i);
        if (overlap.length >= word.length) {
            return false;
        }
        if (word.indexOf(overlap) != 0) {
            continue;
        }
        return true;
    }
    return false;
}

/**
 * Removes words that have been played from an array of word units.
 * @param {object[]} wordUnitArray The array of word units, from which already played words are to be removed.
 * @returns {object[]} The input array, with words that have been played removed.
 */
function trimPlayedFromWordUnitArray (wordUnitArray) {
    for (let i = wordUnitArray.length - 1; i >= 0; i--) { //Iterate over each eligible word
        for (let j = 0; j < wordsPlayed.length; j++) { //Iterate over each word that has been played
            if (wordUnitArray[i].word.id === wordsPlayed[j].word.id) {
                wordUnitArray.splice(i, 1);
                break;
            }
        }
    }
    return wordUnitArray;
}