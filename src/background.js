chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
            'cs' + sender.tab.url :
            'from the extension');
        tabNext();
        sendResponse({farewell: 'goodbye'});
    }
);

var tabNext = function tabNext() {

    chrome.windows.getCurrent({populate: true}, function (wind) {
        var totalTabs = wind.tabs.length;
        var cTab = wind.tabs.filter(function(tab) {
            return tab.active === true;
        });
        var index = cTab[0].index,
            nextIndex = index + 1;

        if(nextIndex === totalTabs) {
            nextIndex = 0;
        }

        var nextTab = wind.tabs.filter(function(tab) {
            return tab.index === nextIndex;
        });

        chrome.tabs.update(nextTab[0].id, {active: true});

    });
}
    
