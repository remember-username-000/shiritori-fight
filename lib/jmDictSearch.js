const c_jmDictSearch = "jmDictSearch.js";

/**
 * Replaces small characters and vowel extender in words with their large versions and the previous character, respectively.
 * @param {string} word - The word that needs to be 'cased'? (idk)
 * @returns {string} The word passed in, but with small kana replaced with big versions.
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
 * @returns {object[]} An array of objects that, for each word, contain the object for the word, and the index of the kana reading that matched(as there may be multiple kana readings). If there are no words, the array is empty.
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
 * @param {string} value - The reading, in kana, of the word to be searched for. This should be in either hiragana or katakana, whichever is appropriate. 
 * @returns {object[]} An array of objects that, for each word, contain the object for the word, and the index of the kana reading that matched(as there may be multiple kana readings). If there are no words, the array is empty.
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
 * @deprecated since version 1.0.0-alpha-1.
 * @param {string} initChar - The first character of the kana reading of the word to be searched for. Hiragana and katakana are distinguished.
 * @returns {object[]} An array of objects that, for each word, contain the object for the word, and the index of the kana reading that matched(as there may be multiple kana readings). If there are no words, the array is empty.
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

/**
 * Searches the dictionary for words based on a <pre><code>field</code></pre> attribute.
 * @param {string} field The <pre><code>field</code></pre> attribute to search by.
 * @returns {object[]} An array of objects that, for each word, contain the object for the word, and the index of kana readings 0. If there are no words, the array is empty.
 */
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

/**
 * Returns a word's <pre><code>field</code></pre> attribute.
 * @param {object} word 
 * @returns {string} The word's <pre><code>field</code></pre> attribute.
 */
function getWordField (word) {
    for (let j = 0; j < word.sense.length; j++) { //Iterate through the sense fields of each word
        if (word.sense[j].field.length == 0) {
            continue;
        }
        return word.sense[j].field[0];
    }
}

/**
 * Returns a random word unit.
 * @returns {object[]} An array consisting of one word unit representing a random word from the dictionary.
 */
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

/**
 * Returns the type ID of a word.
 * @param {object} word The word to check.
 * @returns {number} The type ID of the word (<pre><code>0</code></pre>-<pre><code>23</code></pre>), or <pre><code>-1</code></pre> if the word has an undefined type.
 */
function getWordType (word) {
    if (Object.hasOwn(data_wordTypeList, word.id)) {
        if ((parseInt(data_wordTypeList[word.id]) >= 0) && (parseInt(data_wordTypeList[word.id]) <= 24)) {
            return data_wordTypeList[word.id];
        }
    }

    const types = [
        /* 0 */[],
        /* 1 */[],
        /* 2 */[],
        /* 3 business*/ ["bus", "internet", "law", "mining", "politics", "rail", "stockm", "telec", "tradem"],
        /* 4 */[],
        /* 5 */[],
        /* 6 plant*/["agric", "biochem", "bot", "cryst", "ecol", "gardn", "geogr", "geol", "met", "min"],
        /* 7 science*/ ["archeol", "astron", "biol", "chem", "civeng", "comp", "elec", "electr", "engr", "ent", "genet", "mech", "ornith", "paleo", "physics", "psy", "zool"],
        /* 8 */[],
        /* 9 */[],
        /*10 */[],
        /*11 */[],
        /*12 art*/ ["archit", "art", "audvid", "cloth", "figskt", "film", "food", "gramm", "kabuki", "ling", "MA", "manga", "music", "noh", "photo", "print", "tv"],
        /*13 */[],
        /*14 */[],
        /*15 */[],
        /*16 medical*/["anat", "dent", "embryo", "med", "pathol", "pharm", "physiol", "surg"],
        /*17 */[],
        /*18 */[],
        /*19 */[],
        /*20 */[],
        /*21 */[],
        /*22 religion*/["Buddh", "chmyth", "Christn", "grmyth", "jpmyth", "phil", "psyanal", "psych", "rommyth", "Shinto"],
        /*23 sports*/ ["aviat", "baseb", "boxing", "cards", "fish", "go", "golf", "hanaf", "horse", "mahj", "motor", "prowres", "shogi", "ski", "sports", "sumo", "vidg"],
        /*24 normal*/ ["econ", "finc", "geom", "logic", "math", "mil", "stat", "vet"]
    ]
    for (let i = 0; i < types.length; i++) {
        if (types[i].includes(getWordField(word))) {
            return i;
        }
    }
    return -1;
}

/**
 * Returns a fullwidth capital letter to represent a type ID.
 * @param {number} typeId The type ID to convert to a character.
 * @returns {string} A fullwidth capital letter representing the <pre><code>TypeId</code></pre> entered.
 */
function charFromType (typeId) {
    switch (typeId) {
        case 3:
            return "Ｂ";
        case 6:
            return "Ｌ";
        case 7:
            return "Ｓ";
        case 12:
            return "Ａ";
        case 16:
            return "Ｍ";
        case 22:
            return "Ｒ";
        case 23:
            return "Ｐ";
        case 24:
            return "Ｎ";
        default:
            return "Ｕ";
    }
}

/**
 * Returns the link to the appropriate image of a type's icon.
 * @param {*} typeId The type ID to get the image URL for.
 * @returns {string} The URL to an image that represents the <pre><code>typeId</code></pre> entered.
 */
function imgUrlFromType (typeId) {
    switch (typeId) {
        case 3:
            return "sprites/b.gif";
        case 6:
            return "sprites/l.gif";
        case 7:
            return "sprites/s.gif";
        case 12:
            return "sprites/a.gif";
        case 16:
            return "sprites/m.gif";
        case 22:
            return "sprites/r.gif";
        case 23:
            return "sprites/p.gif";
        case 24:
            return "sprites/n.gif";
        default:
            return "sprites/n.gif";
    }
}