chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            'cs' + sender.tab.url :
            'from the extension');


        window.scrollBy(0, 50);
        sendResponse({farewell: 'goodbye'});
    }
);

//function scrollPageDown() {
    
