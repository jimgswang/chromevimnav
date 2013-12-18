describe('commandqueue', function() {
    var map,
        q;

    beforeEach(function() {
        map =  {
            minCodeLength: 4,
            functions: {
                '0023': function() {},
                '00260055': function() {}
            }   
        };
        q = new CmdQ(map);
    })

    describe('appendCode(keyCode)', function() {

        it('should add valid keycode to queue', function() {
            q.appendCode(23);
            expect(q.qToString().length).toBeGreaterThan(0);
        });

        it('should append 0s to keycodes shorter than minCodeLength', function() {
            q.appendCode(23);
            expect(q.qToString()).toEqual('0023');
        });

        it('should not register a keycode that is not in the map', function() {
            q.appendCode(10);
            expect(q.qToString().length).toEqual(0);
        });

        it('should clear queue if keycode combo isnt valid', function() {
            q.appendCode(23);
            q.appendCode(12);
            expect(q.qToString().length).toEqual(0);
        });
    });

    describe('.getRunnable()', function() {

        it('should return a function for existing keycode', function() {
            q.appendCode(23);
            expect(typeof q.getRunnable()).toEqual('function');
        });

        it('should return a function for existing multipart keycode', function() {
            q.appendCode(26);
            q.appendCode(55);
            expect(typeof q.getRunnable()).toEqual('function');
        });

        it('should return falsy if no existing command for keycodes', function() {
            q.appendCode(34);
            expect(q.getRunnable()).toBeFalsy();
        });
    });

    describe('.clear()', function() {

        it('should clear existing keycodes from queue', function() {
            q.appendCode(34);
            q.clear();
            expect(q.qToString()).toEqual('');
        });
    });
}); 
