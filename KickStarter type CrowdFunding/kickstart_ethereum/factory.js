import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x342Bc87a9940e58C779e5C7BE0Ad857288F85735',

)

export default instance;
