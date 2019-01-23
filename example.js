#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const cosmiconfig = require('cosmiconfig');

const prefix = '.env';

let localSearchPlaces = [
  `${prefix}.local`,
  `webpack/${prefix}.local`
];

const dotEnvLoader = (filepath, content) => {
  return content ? content : null;
};

const loaders = {
  '.local': dotEnvLoader,
  noExt: dotEnvLoader
};

const localExplorer = cosmiconfig('localEnv', { localSearchPlaces, loaders });
const localSearchedFor = localExplorer.searchSync();

let loadResult;
// TODO: figure out why this works and not localSearchedFor
if (fs.existsSync(path.resolve(process.cwd(), '.env.local'))) {
  loadResult = localExplorer.loadSync(path.resolve(process.cwd(), '.env.local'));
}

console.log('localSearchedFor', localSearchedFor);
console.log('loadResult', loadResult);

