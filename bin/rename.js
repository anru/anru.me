#!/usr/bin/env node --harmony

const path = require('path');
const { promisify } = require('util');
const rename = promisify(require('fs').rename);
const argv = require('yargs').argv;


async function main(files, maybePrefix, from = 1) {
  let cc = from;
  let prefix = maybePrefix;
  for (let picturePath of files) {
    const pd = path.parse(picturePath);
    if (!prefix) {
      prefix = path.basename(pd.dir).charAt(0);
    }
    const newFileName = `${prefix}${cc++}${pd.ext}`
    console.log(`${pd.base} -> ${newFileName}`)
    await rename(picturePath, `${path.join(pd.dir, newFileName)}`);
  }
}

main(argv._, argv.prefix, argv.from);
