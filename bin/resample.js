#!/usr/bin/env node --harmony

const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const argv = require('yargs').argv;
const mkdirp = require('mkdirp');
const sizeOf = promisify(require('image-size'));

const gravity = argv.gravity || 'center';

async function resample(files, gravity) {
  let dimensions = null;
  let firstAspectRatio;
  for (let picturePath of files) {
    if (!dimensions) {
      dimensions = await sizeOf(picturePath);
      firstAspectRatio = dimensions.width/dimensions.height;
    } else {
      const currSize = await sizeOf(picturePath);
      const k = currSize.width/currSize.height;
      if (k.toFixed(4) == firstAspectRatio.toFixed(4)) {
        continue;
      }

      const newWidthRatio = firstAspectRatio/k;
      const newHeightRatio = 1/newWidthRatio;
      let newDim;

      if (newWidthRatio < newHeightRatio) {
        newDim = `${Math.round(newWidthRatio*currSize.width)}x${currSize.height}`;
      } else {
        newDim = `${currSize.width}x${Math.round(newHeightRatio*currSize.height)}`;
      }

      const pd = path.parse(picturePath);
      const newPath = `${path.join(pd.dir, pd.name)}-r${pd.ext}`;

      const command = `convert "${picturePath}" -gravity ${gravity} -extent ${newDim} ${newPath}`;
      console.log(command);
      const { stdout, stderr } = await exec(command);
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
    }
  }
}

resample(argv._, gravity);
