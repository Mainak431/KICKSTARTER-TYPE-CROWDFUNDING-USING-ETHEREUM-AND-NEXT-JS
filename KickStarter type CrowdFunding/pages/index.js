import React, {Component} from 'react'
import factory from '../kickstart_ethereum/factory'
import { Card,Button } from 'semantic-ui-react'
import Layout from '../components/Layout'
import {Link} from '../routes'

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  async componentDidMount() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    console.log(campaigns);
  }
  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header : address,
        description : (
        <Link route = {`/campaigns/${address}`}>
        <a>View Campaign </a>
        </Link>
      ),
        fluid : true
      };
    });
    return<Card.Group items = {items} />
  }
  // anchor tag <a> gives the functionality of right click too with button tag
  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns </h3>
          <Link route = "/campaigns/new">
          <a>
          <Button
            floated = "right"
            content = "Create Campaign"
            icon = "add circle"
            primary
          />
          </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }

}
export default CampaignIndex;
