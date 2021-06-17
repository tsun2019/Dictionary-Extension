function handleButtonClick(term){ 
    //make request (GET dictioanry entry info for a term) and then send
    var xhr = new XMLHttpRequest();
    //retrieve specific word using api.
    xhr.open('GET', 'https://od-api.oxforddictionaries.com/api/v1/entries/en/' + term.toLowerCase(), true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //set authetnication id and key in headers.
    xhr.setRequestHeader("app_id", "");
    xhr.setRequestHeader("app_key","");
    //send request
    xhr.send();
    
    //wait for request to be get the work done
    xhr.addEventListener("readystatechange",processRequest, false);
    
   
    //create processRequest for event listener
    function processRequest(e){
        //fires 5 times bc fires everytime state changes, but only want when state is done so provide conditions
        // status provides it is okay too.
        if (xhr.readyState == 4 && xhr.status == 200){
            //parse json string for readable response.
            var response = JSON.parse(xhr.responseText);
            
            //print response in popup by sending message to popup with response(term) info.
            chrome.runtime.sendMessage(response);
        }
    }

}




