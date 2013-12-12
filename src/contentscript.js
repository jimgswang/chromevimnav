(function() {
    
    var queue = new CmdQ(fnMap);

    document.onkeydown = function(e) {
        console.log(e.keyCode);

        queue.appendCode(e.keyCode);

        var cmd = queue.getRunnable(); 

        if(typeof cmd === 'function') {
            cmd();
            queue.clear();
        }
    };

}());
