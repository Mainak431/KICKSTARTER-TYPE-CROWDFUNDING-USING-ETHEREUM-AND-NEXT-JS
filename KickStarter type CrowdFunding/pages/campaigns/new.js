import React from 'react'
import { Component } from 'react'
import {Form, Button, Input, Message} from 'semantic-ui-react'
import Layout from '../../components/Layout'
import factory from '../../kickstart_ethereum/factory'
import web3  from '../../kickstart_ethereum/web3'
import {Link, Router} from '../../routes'

class CampaignNew extends Component {
  state = {
    minimumContribution:'',
    errorMessage : '',
    loading : false
  };
  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0])
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
      Router.pushRoute('/');
      //Navigating user to the index page
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
      <h3>Create A Campaign </h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label> Minimum Contribution </label>
            <Input
            label="wei"
            labelPosition="right"
            value = {this.state.minimumContribution}
            onChange = {event => this.setState({minimumContribution : event.target.value})}
            />
          </Form.Field>
          <Button primary loading={this.state.loading}> Create </Button>
          <Message error header = "Something went wrong" content = {this.state.errorMessage} />
        </Form>
      </Layout>
    )
  }
}

export default CampaignNew;
