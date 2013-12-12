function CmdQ(fnMap) {
    this.queue = [];
    this.fnMap = fnMap;
};

CmdQ.prototype.appendCode = function(keyCode) {
    var missingLength = this.fnMap.minCodeLength - keyCode.toString().length;
    var code = Array(missingLength + 1).join('0') + keyCode.toString();
    this.queue.push(code);
};

CmdQ.prototype.getRunnable = function() {
    var cmd = this.qToString();

    if(typeof this.fnMap[cmd] === 'function') {
        return this.fnMap[cmd];
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

