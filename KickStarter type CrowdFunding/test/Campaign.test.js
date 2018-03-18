const assert =  require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 =  new Web3(ganache.provider());

const compiledFactory = require('../kickstart_ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../kickstart_ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async()=> {
  accounts =  await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
            .deploy({data : compiledFactory.bytecode})
            .send({from: accounts[0], gas:'1000000'})
  //we call send when we try to do some operation which will cost some amount of gas.
  //we call call when only reading operation is done
  await factory.methods.createCampaign('100').send({
    from : accounts[0], gas :'1000000'
  })
  const addresses = await factory.methods.getDeployedCampaigns().call();
  campaignAddress =  addresses[0]
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
    //as the contracts are already deployed we only pass the address where the contract is deployed
  )
})

describe('Campaigns',()=> {
  it('deploys a factory and a campaign', ()=> {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  })
  it('manager checking', async() => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  })
  it('allow to contribute money and mark them as approver', async()=>{
    await campaign.methods.contribute().send({
      value: '200',
      from : accounts[1]
    })
    const isContributor =  await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  })
  it('requires minimum contribution' , async() => {
    try {
      await campaign.methods.contribute().send({
        value: '1000',
        //far lower than minimum set contribution value 200
        from : accounts[1]
      })
      assert(false);
    } catch(err) {
      assert(err)
    }
  })
  it('manager of a campaign can create a payment request', async()=> {
    await campaign.methods.createRequest('Buy chips','100',accounts[1])
    .send({
      from : accounts[0],
      gas: '1000000'
    })
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy chips', request.description)
  })
  it('End to end test', async()=> {
    await campaign.methods.contribute().send({
      from : accounts[0],
      value : web3.utils.toWei('10','ether')
    })
    await campaign.methods.createRequest('transportation',web3.utils.toWei('5','ether'), accounts[1])
      .send({from: accounts[0], gas:'1000000'})
    await campaign.methods.approveRequest(0).send({
      from : accounts[0],
      gas : '1000000'
    })
    await campaign.methods.finalizeRequest(0).send ({
      from : accounts[0],
      gas : '1000000'
    })
    let balance = await web3.eth.getBalance(accounts[1])
    balance =  web3.utils.fromWei(balance,'ether')
    balance = parseFloat(balance);
    console.log(balance)
    assert(balance > 104 )
  })
})
