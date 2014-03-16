define(['background/chromeFunctions'], function(cf) {

    describe('chrome functions', function() {
            
        var prevChrome,
            mockedChrome,
            tabs;

        beforeEach(function() {

            prevChrome = window.chrome;
            mockedChrome = {
                tabs: jasmine.createSpyObj('tabs', ['query', 'update'])
            };
            window.chrome = mockedChrome;

            tabs = [{
                id: 'a',
                index: 0,
                active: false
            },
            {
                id: 'b',
                index: 1,
                active: false
            },
            {
                id: 'c',
                index: 2,
                active: false
            }];

            chrome.tabs.query.and.callFake(function(options, callback) {
                callback(tabs);
            });
            chrome.tabs.update.and.callFake(function(id, options, callback) {
                callback();
            });
        });


        afterEach(function() {
            window.chrome = prevChrome;
        });

        describe('shiftTab', function() {

            it('should call chrome.tabs.update with id of next tab and active', function(done) {
                tabs[0].active = true;

                cf.shiftTab(1, function() {
                    var update = window.chrome.tabs.update,
                        calledArgs = update.calls.argsFor(0);

                    expect(update).toHaveBeenCalled();
                    expect(update.calls.count()).toEqual(1);
                    expect(calledArgs[0]).toEqual('b');
                    expect(calledArgs[1]).toEqual(jasmine.objectContaining({
                        active:true
                    }));
                    done();
                });
            });

            it('should wrap when shifting rightmost tab right', function(done) {
                tabs[2].active = true;

                cf.shiftTab(1, function() {
                    var update = window.chrome.tabs.update,
                        calledArgs = update.calls.argsFor(0);

                    expect(calledArgs[0]).toEqual('a');
                    done();
                });
            });
                    
            it('should wrap when shifting leftmost tab left', function(done) {
                tabs[0].active = true;

                cf.shiftTab(-1, function() {
                    var update = window.chrome.tabs.update,
                        calledArgs = update.calls.argsFor(0);

                    expect(calledArgs[0]).toEqual('c');
                    done();
                });
            });
        });
    });
});
