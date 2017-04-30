#!/usr/bin/env node --harmony

const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const argv = require('yargs').argv;
const mkdirp = require('mkdirp');

let maxRes = 1200;

const files = argv._;

const gridSize = argv.count || files.length;

if (gridSize > 3) {
  maxRes = 1000;
}
if (gridSize > 5) {
  maxRes = 850;
}
if (gridSize > 8) {
  maxRes = 800;
}

async function convertFiles() {
  for (let picturePath of files) {
    const destDir = path.join(path.dirname(picturePath), 'th');
    mkdirp.sync(destDir);

    const destPath = path.join(destDir, path.basename(picturePath));
    const command = `convert "${picturePath}" -resize x${maxRes} "${destPath}"`;
    console.log(command);
    const { stdout, stderr } = await exec(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  };
}

convertFiles();
