define(['underscore'], function(_) {

    var shiftTab = function(offset, callback) {
        var currentTab,
            currentIndex,
            numTabs,
            targetIndex,
            targetTab,
            callback = callback || function() {};

        getCurrentTabs(function (tabs) {
            currentTab = _.find(tabs, function(tab) {
                return tab.active === true;
            });

            currentIndex = currentTab.index;
            numTabs = tabs.length;
            offset = offset % numTabs;
            targetIndex = (currentIndex + offset + numTabs) % numTabs;

            targetTab = _.find(tabs, function(tab) {
                return tab.index === targetIndex;
            });

            chrome.tabs.update(targetTab.id, {
                active:true
            }, callback);
        }); 

    };

    var getCurrentTabs = function(callback) {

        chrome.tabs.query({
            currentWindow: true
        }, function(tabs) {
            callback(tabs);
        });

    };

    return {
        shiftTab: shiftTab
    };
});
