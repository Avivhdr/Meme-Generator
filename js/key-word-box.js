//stringify any argument
function stringify(a) {
    return JSON.stringify(a);
}
//sets object in storage
//input: desired key name and variable
function setStorage(key, obj) {
    var strObj = stringify(obj);
    localStorage.setItem(key, strObj);
}

// gets object from local storage
//input: key name of local storage value
//output: desired value
function getStorage(key) {
    var objString = localStorage.getItem(key);
    return JSON.parse(objString);
}

// store all images key words with count and stores in local storage if does not exist
function storeKeyWords() {
    var KeyWords = {};
    if (!localStorage.getItem('keyWords')) {
        gImgs.forEach(function(img) {
            img.category.forEach(function(currKey) {
                if (KeyWords[currKey] === undefined) {
                    var newKeyWord = { sumAppearances: 0 }
                    KeyWords[currKey] = newKeyWord;
                } else {
                    KeyWords[currKey].sumAppearances += 2;
                };
            });
        });
        setStorage('keyWords', KeyWords);
    }
}

//add count to a choosen key word and render screen
function addKeywords(category) {
    var keyWords = getStorage('keyWords');
    keyWords[category].sumAppearances += 2;
    setStorage('keyWords', keyWords);
    renderKeywords();
}

// change keyword size on screen
function renderKeywords() {
    var keyWords = getStorage('keyWords');
    var STRkeyWords = '';
    for (var word in keyWords) {
        for (var apearance in keyWords[word]) {
            STRkeyWords += '<span onclick="searchForImg(' + "'" + word + "'" + ')"style="font-size:' + (14 + keyWords[word][apearance]) + 'px; cursor:pointer;">' + word + ' </span>';
        }
    }
    $('.key-word-box-container').html(STRkeyWords);
}