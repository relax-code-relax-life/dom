const copy = require('../../copy');
const {execSync} = require('child_process');
const path = require('path');

console.log('npm run build');
execSync('npm run build');

console.log('start copy');
const dirDist = path.resolve(__dirname, './package');
copy(['dist/*.*', 'README.md', 'package.json'], dirDist);

console.log('npm publish')
execSync('npm publish', {cwd: dirDist});