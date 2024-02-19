const c_jmDictSearch = "jmDictSearch.js";

/**
 * Replaces small characters and vowel extender in words with their large versions and the previous character, respectively.
 * @param {String} word - The word that needs to be 'cased'? (idk)
 * @returns {String} The word passed in, but with small kana replaced with big versions
 */
const caseWord = function (word) {
    let returnWord = "";
    for (let i = 0; i < word.length; i++) {
        switch (word.at(i)) {
            case 'ゃ':
                returnWord += 'や';
                break;
            case 'ゅ':
                returnWord += 'ゆ';
                break;
            case 'ょ':
                returnWord += 'よ';
                break;
            case 'ー':
                if (i < word.length - 1) {
                    returnWord += 'ー';
                }
                break;
            default:
                returnWord += word.at(i);
                break;
        }
    }
    return returnWord;
}

/**
 * Search the dictionary for a word using the word's ID.
 * @param {number} value - The ID, according to data-jmdict-common, of the word to be searched for 
 * @returns {Array} An array of objects that, for each word, contain the object for the word, and the index of the kana reading that matched(as there may be multiple kana readings). If there are no words, the array is empty.
 */
function getWordByID (value) {
    let wordArray = [];
    for (let i = 0; i < data_jmdict.words.length; i++) { //Iterate through JMdict
        if (data_jmdict.words[i].id == value) {
            wordArray.push({
                "word": data_jmdict.words[i],
                "kanaIndex": 0
            });
        }
    }   
    return wordArray;
}

/**
 * Search the dictionary for words using a kana reading.
 * @param {String} value - The reading, in kana, of the word to be searched for. This should be in either hiragana or katakana, whichever is appropriate. 
 * @returns {Array} An array of objects that, for each word, contain the object for the word, and the index of the kana reading that matched(as there may be multiple kana readings). If there are no words, the array is empty.
 */
function getWordByKana (value) {
    let wordArray = [];
    for (let i = 0; i < data_jmdict.words.length; i++) { //Iterate through JMdict
        for (let j = 0; j < data_jmdict.words[i].kana.length; j++) { //Iterate through the kana readings of a word
            if (wordArray.includes(data_jmdict.words[i])) { //If the word has already been found, don't bother
                continue;
            }
            if (data_jmdict.words[i].kana[j].common === false) { //If the kana reading found is not common, don't bother
                continue;
            }
            if (value == data_jmdict.words[i].kana[j].text) {
                wordArray.push({
                    "word": data_jmdict.words[i],
                    "kanaIndex": j
                });
            }
        }
    }
    return wordArray;
}

/**
 * Search the word for words that start with a character.
 * @param {String} initChar - The first character of the kana reading of the word to be searched for. Hiragana and katakana are distinguished.
 * @returns {Array} An array of objects that, for each word, contain the object for the word, and the index of the kana reading that matched(as there may be multiple kana readings). If there are no words, the array is empty.
 */
function getWordByInit (initChar) {
    let wordArray = [];
    let casedChar = caseWord(initChar);

    for (let i = 0; i < data_jmdict.words.length; i++) { //Iterate through JMdict
        for (let j = 0; j < data_jmdict.words[i].kana.length; j++) { //Iterate through the kana readings of a word
            if (wordArray.includes(data_jmdict.words[i])) { //If the word has already been found, don't bother
                continue;
            }
            if (data_jmdict.words[i].kana[j].common === false) { //If the kana reading found is not common, don't bother
                continue;
            }
            if (casedChar == data_jmdict.words[i].kana[j].text.at(0) || initChar == data_jmdict.words[i].kana[j].text.at(0)) { //If there's a match
                wordArray.push({
                        "word": data_jmdict.words[i],
                        "kanaIndex": j
                    }
                    );
            }
        }
    }
    return wordArray;
}

function getWordByField (field) {
    let wordArray = [];
    for (let i = 0; i < data_jmdict.words.length; i++) { //Iterate through JMdict
        for (let j = 0; j < data_jmdict.words[i].sense.length; j++) { //Iterate through the sense fields of each word
            if (data_jmdict.words[i].sense[j].field.length == 0) {
                continue;
            }
            if (data_jmdict.words[i].sense[j].field[0] == field) {
                wordArray.push({
                    "word": data_jmdict.words[i],
                    "kanaIndex": 0
                }
                );
            }
        }
    }
    return wordArray;
}

function getWordField (word) {
    for (let j = 0; j < word.sense.length; j++) { //Iterate through the sense fields of each word
        if (word.sense[j].field.length == 0) {
            continue;
        }
        return word.sense[j].field[0];
    }
}

function getWordRandom () {
    let wordArray = [];
    let ranInt = Math.floor(Math.random() * data_jmdict.words.length);
    wordArray.push({
        "word": data_jmdict.words[ranInt],
        "kanaIndex": 0
    }
    );
    return wordArray;
}

function getWordType (word) {
    const types = [
        [],
        [],
        [],
        /*business*/ ["bus", "internet", "law", "mining", "politics", "rail", "stockm", "telec", "tradem"],
        [],
        [],
        [],
        /*science*/ ["agric", "anat", "archeol", "astron", "biochem", "biol", "bot", "chem", "civeng", "comp", "cryst", "ecol", "elec", "electr", "embryo", "engr", "ent", "genet", "geol", "mech", "met", "min", "ornith", "paleo", "pathol", "pharm", "phil", "physics", "physiol", "psy", "psyanal", "psych", "zool"],
        [],
        [],
        [],
        [],
        /*art*/ ["archit", "art", "audvid", "Buddh", "chmyth", "Christn", "cloth", "figskt", "film", "food", "gramm", "grmyth", "jpmyth", "kabuki", "ling", "MA", "manga", "music", "noh", "photo", "print", "rommyth", "Shinto", "tv"],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        /*sports*/ ["aviat", "baseb", "boxing", "cards", "fish", "go", "golf", "hanaf", "horse", "mahj", "motor", "prowres", "shogi", "ski", "sports", "sumo", "vidg"],
        /*normal*/ ["dent", "econ", "finc", "gardn", "geogr", "geom", "logic", "math", "med", "mil", "stat", "surg", "vet"]
    ]
    for (let i = 0; i < types.length; i++) {
        if (types[i].includes(getWordField(word))) {
            return i;
        }
    }
    return -1;

    /* Type IDs:

       -1 - undefined
        3 - business
        7 - science
        12 - art
        23 - sports
        24 - normal
    */
}

function charFromType (typeId) {
    switch (typeId) {
        case 3:
            return "Ｂ";
        case 7:
            return "Ｓ";
        case 12:
            return "Ａ";
        case 23:
            return "Ｐ";
        case 24:
            return "Ｎ";
        default:
            return "Ｕ";
    }
}