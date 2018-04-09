var babel = require("babel-core");
var fs = require('fs');
var UglifyJS = require("uglify-es");


var file = __dirname + '/index.js';
var babelResult = babel.transformFileSync(file,
    {
        presets: [
            ['env', {modules: 'commonjs'}]
        ]
    }
);

var minifyResult=UglifyJS.minify(babelResult.code,{
    compress:{
        drop_console:true
    },
    output:{
        ascii_only:true,
    },
    ecma:5
});

// console.log(minifyResult.code);

var distFile = __dirname + '/dist/index.js';
fs.writeFileSync(distFile, minifyResult.code, 'utf8');

