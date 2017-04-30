#!/usr/bin/env node --harmony

const { promisify } = require('util');
const argv = require('yargs').argv;
const sizeOf = promisify(require('image-size'));

async function calcRatio(files) {
	// output k, where:
  // w1*k == w2*(1 - k)
	const size1 = await sizeOf(files[0]);
	const size2 = await sizeOf(files[1]);
	const r1 = size1.width/size1.height;
	const r2 = size2.width/size2.height;
	const k = r1/(r1 + r2);
	console.log(k, `${(k*100).toFixed(6)}%`);
}	

calcRatio(argv._);