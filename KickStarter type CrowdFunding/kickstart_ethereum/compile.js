const path = require('path');
const fs = require('fs-extra');
//fs stands for file system
const solc = require('solc');
//solc stands for solidity compiler

const buildpath  = path.resolve(__dirname,'build');
fs.removeSync(buildpath);
//removing the directory named build if already exists

const campaignPath = path.resolve(__dirname,'contracts','campaign.sol')
const source = fs.readFileSync(campaignPath,'utf8');
const output = solc.compile(source, 1).contracts;
//this "1 "activates the optimizer
//this is a settings
fs.ensureDirSync(buildpath);
console.log(output)
// creates a directory named build
// creating the contracts in two separate files in the build directory
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildpath, contract.replace(':','') + '.json'),
    //removing the : with empty space in the contract
    output[contract]
  );
}
