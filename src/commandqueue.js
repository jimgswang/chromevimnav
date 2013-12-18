function CmdQ(fnMap) {
    this.queue = [];
    this.fnMap = fnMap;
};

CmdQ.prototype.appendCode = function(keyCode) {
    var missingLength = this.fnMap.minCodeLength - keyCode.toString().length;
    var code = Array(missingLength + 1).join('0') + keyCode.toString();
    var arr = Object.keys(this.fnMap.functions);

    var self = this;
    var isNewCodeValid = arr.some(function(item) {
        return ~item.indexOf(self.qToString() + code);
    });

    if(isNewCodeValid)
        this.queue.push(code);
    else {
        console.log('cleared');
        this.clear();
    }
};

CmdQ.prototype.getRunnable = function() {
    var cmd = this.qToString();

    if(typeof this.fnMap.functions[cmd] === 'function') {
        return this.fnMap.functions[cmd];
    }
    return undefined;
};

CmdQ.prototype.clear = function() {
    this.queue = [];
};

CmdQ.prototype.qToString = function() {
    var output = "";
    this.queue.forEach(function(code) {
        output = output.concat(code);
    });
    return output;
};

