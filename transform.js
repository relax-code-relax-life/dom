var babel = require("babel-core");
var fs = require('fs');
var UglifyJS = require("uglify-es");
// var UglifyJS = require("uglify-js");


var file = __dirname + '/index.js';
var babelResult = babel.transformFileSync(file,
    {
        presets: [
            ['env', {modules: 'umd'}]
        ],
        moduleId: 'dom'
    }
);

var code = babelResult.code;

// console.log(code);

var minifyResult = UglifyJS.minify(code, {
    compress: {
        drop_console: true
    },
    ecma: 7,
    parse:{
        bare_returns:true
    }
});
code = '/*http://wangwl.net*/\r\n'+minifyResult.code;

// console.log(minifyResult.code);

var distFile = __dirname + '/dist/index.js';
fs.writeFileSync(distFile, code, 'utf8');


