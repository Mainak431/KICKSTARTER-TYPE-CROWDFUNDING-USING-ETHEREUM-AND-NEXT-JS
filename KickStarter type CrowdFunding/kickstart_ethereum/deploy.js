const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
//only deploying the CampaignFactory as CampaignFactory can deploy Campaign
const compiledFactory = require('./build/CampaignFactory.json')
const provider = new HDWalletProvider(
  //copy paste the mnemonic to link to the rinkeby accounts
  'kill rent name asthma awkward ago tonight round walnut punch lecture shop',
  //network we want to connect to . copy the link from infura
  'https://rinkeby.infura.io/RCkuAhCuzmIUEP9vRby2'
  //this link is actually a node where we deploy our contract
);

const web3 = new Web3(provider);
const deploy = async() => {
  const accounts = await web3.eth.getAccounts();
  //this accounts list out all accounts can be in that rinkeby network
  console.log('Attempting to deploy from account',accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
  .deploy({data:compiledFactory.bytecode})
  .send({gas:'1000000', from:accounts[0] });
 //we dont initially know the deployed node address so we print it here
  console.log('Contract deployed to',result.options.address);
};
deploy();
