(function () {
    'use strict';
    
    // add enter key functionality to click 'define' button.
    $("#term").on("keyup", function (event) {
        event.preventDefault();
        //keycode is 13 when the key released is 'enter' key.
        if (event.keyCode === 13) {
            $('#define').click();
        }
    });
    
    //when define button is clicked, then handleButton in backgroundpage.
    $("#define").on("click", function () {
        var backgroundpage = chrome.extension.getBackgroundPage();
        var term = $('#term')[0].value;
        if (backgroundpage !== null) {
            backgroundpage.handleButtonClick(term);
        }
        
    });
}());

//retrieve message from background.js getting the response from the dictionary api and adding it to the popup.
chrome.runtime.onMessage.addListener(function (response) {
    'use strict';
    
    var b = $("#seemore");
//    document.getElementById('label').innerHTML = 
    //set text as definition to be shown
    var definition = $("#definition");
    definition[0].innerText = response.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
    
    //set see more text
    b[0].innerText = "Click for more info on this word.";
    //link see more text
    b[0].href = "";
    //when href is clicked, create a new tab with the actual dictionary entry for the word at oxford dictionary.
    b.on("click", function () {
        chrome.tabs.create({url: "http://en.oxforddictionaries.com/definition/" + response.results[0].id.toLowerCase()});
    });
});



