describe('commandqueue', function() {
    var map,
        q;

    beforeEach(function() {
        map =  {
            minCodeLength: 4,
            '0023': function() {}
        };
        q = new CmdQ(map);
    })

    it('should add a keycode to queue', function() {
        q.appendCode(23);
        expect(q.qToString().length).toBeGreaterThan(0);
    });

    it('should append 0s to keycodes shorter than minCodeLength', function() {
        q.appendCode(23);
        expect(q.qToString()).toEqual('0023');
    });

    describe('.getRunnable()', function() {

        it('should return a function for existing keycode', function() {
            q.appendCode(23);
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
