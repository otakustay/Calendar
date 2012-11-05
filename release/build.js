var fs = require('fs');
var path = require('path');
var importPrefix = '// @import '
var newline = (process.platform === 'win32' ? '\r\n' : '\n');

var src = path.join(__dirname, '..', 'src');
var lib = path.join(src, 'lib');

function calculateSpaces(line) {
    var count = 0;
    for (var i = 0; i < line.length; i++) {
        if (line[i] === ' ') {
            count++;
        }
        else {
            break;
        }
    }
    return count;
}

function processFile(filename, output, spaceCount) {
    spaceCount = spaceCount || 0;
    var linePrefix = Array(spaceCount + 1).join(' ');

    var input = fs.readFileSync(path.join(src, filename), 'utf8');
    var lines = input.split(/\r?\n/);

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var trimedLine = line.trim();

        // 是否为@import
        if (trimedLine.indexOf(importPrefix) === 0) {
            var module = trimedLine.substring(importPrefix.length);
            console.log('import ' + module);
            processFile(module + '.js', output, calculateSpaces(line));
        }
        else {
            output.push(linePrefix + line);
        }
    }

    // 最后加一行
    output.push('');
}

function copyFile(source, destination) {
    fs.createReadStream(source).pipe(fs.createWriteStream(destination));
}

var output = [];
processFile('calendar.js', output);
fs.writeFileSync(
    path.join(__dirname, 'calendar.js'), 
    output.join(newline), 
    'utf8'
);

copyFile(path.join(src, 'default-theme.css'), path.join(__dirname, 'default-theme.css'));
var libFiles = fs.readdirSync(lib);
for (var i = 0; i < libFiles.length; i++) {
    var filename = libFiles[i];
    copyFile(path.join(lib, filename), path.join(__dirname, 'lib', filename));
}
