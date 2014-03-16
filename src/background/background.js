require.config({
    baseUrl: '/src/',

    paths: {
        'config': '../config',
        'lib': '../lib',
        'underscore': '../lib/underscore/underscore-min'
    },

    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['background/chromeFunctions'], function(cf) {

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(sender.tab ?
                'cs' + sender.tab.url :
                'from the extension');
            cf.shiftTab.apply(null, request.params);
            console.log(chrome);
            console.log(chrome === window.chrome);
            sendResponse({farewell: 'goodbye'});
        }
    );
});
