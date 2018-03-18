import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //We are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the browser or the user does not have metamask installed
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/RCkuAhCuzmIUEP9vRby3'
    //giving access to our own infura provider
  )
  web3 = new Web3(provider);
}
//const web3 = new Web3(window.web3.currentProvider);
//next js does server side rendering so if we call window function it will throw an error
// because window is only present in browser
//server side rendering is a process where server renders js files,excute them and pass it into html
// to quickly load the page

export default web3;
