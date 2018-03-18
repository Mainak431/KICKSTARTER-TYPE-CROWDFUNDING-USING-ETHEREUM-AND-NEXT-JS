import React, {Component} from 'react'
import Layout from '../../components/Layout'
import Campaign from '../../kickstart_ethereum/Campaign'
import {Card, Grid,Button} from 'semantic-ui-react'
import web3 from '../../kickstart_ethereum/web3'
import ContributeForm from '../../components/contributefrom'
import {Link} from '../../routes'

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign =  Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);

    return({
            address : props.query.address,
            minimumContribution : summary[0],
            balance : summary[1],
            requestsCount: summary[2],
            approversCount : summary[3],
            manager : summary[4]
            })
  }

  renderCard() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props;

    const items = [
      {
        header : manager,
        meta : 'Address Of Manager',
        description :'The manager created and manages this campaign',
        style : {overflowWrap:'break-word'}
      },
      {
        header : minimumContribution,
        meta : 'Minimum Contribution (wei)',
        description : 'You must contribute atleast this much wei to become an approver'

      },
      {
        header: requestsCount,
        meta : 'Number of Active Requests',
        description : ' Spending request crated for this contract'
      },
      {
        header: approversCount,
        meta : 'Number of approvers',
        description : 'The number of people donated to this campaign'
      },
      {
        header: web3.utils.fromWei(balance,'ether'),
        meta : 'Campaign Balance (ETHER)',
        description : 'The balance is how much this campaign has left to spend'
      }
    ]

    return <Card.Group items = {items}/>
  }

  render() {
    return(
      <Layout>
        <h3> Campaign Show </h3>
        <Grid>
          <Grid.Column width = {10}>
            {this.renderCard()}
            <p />
            <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>
              <Button primary> View Requests </Button>
            </a>
            </Link>
          </Grid.Column>
          <Grid.Column width = {6}>
            <ContributeForm address={this.props.address}/>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}
export default CampaignShow;
