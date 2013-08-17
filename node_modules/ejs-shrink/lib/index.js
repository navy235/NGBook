var _s = require('underscore.string');
var ejs = require('ejs');
var parse = ejs.parse;
ejs.parse = function(str, options) {
    str = str.replace(/<!--[\s\S]*?-->/g, '');
    var spl = str.split("\n");
    for(var i=0; i<spl.length;i++){
        spl[i] = _s.trim(spl[i]);
    }
    str = spl.join("");
    return parse.apply(this, [str, options]);
};
