import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import queryString  from 'query-string';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import factory from '../../etherium/factory';
import Campaign from '../../etherium/campaign';
import web3 from '../../etherium/web3';


export default class CampaignDetail extends Component {

    state = {
        address: '',
        minimumContribution: '',
        balance: '',
        requestsCount: '',
        approversCount: '',
        manager: '',
        contribution: '',
        loading: false,
        errorMessage: ''
    }
    
    async componentDidMount() {
        const parsed = queryString.parse(window.location.search);
        const campaign = Campaign(parsed.address);
        const summary = await campaign.methods.getSummary().call();
        this.setState({ 
            address: parsed.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            description: summary[5]
        })
    }
    
    contributeToCampaign = async() => {
        const parsed = queryString.parse(window.location.search);

        const campaign = Campaign(parsed.address);
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
              from: accounts[0],
              value: web3.utils.toWei(this.state.contribution, 'ether')
            });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({loading: false})
    }

    render() {
        if( this.state.loading ) {
            return (
                <div>
                    <span>Your Contribution is being Added</span>
                    <LinearProgress />
                    <br />
                    <LinearProgress color="secondary" />
                </div>
            )
        } else {
            return (
                <div>
                    <Card>
                        <CardContent >
                            <Typography variant="headline">{this.state.description}</Typography>
                            <Typography variant="subheading" color="textSecondary">
                                {this.state.address}
                            </Typography>
                            <div>
                                Contributers {this.state.approversCount}
                            </div>
                        </CardContent>
                    </Card>
                    <div className='txt-field'>
                        <TextField
                            label='ETH'
                            value={this.state.contribution}
                            type="number"
                            onChange={event =>
                                this.setState({ contribution: event.target.value })}
                        />
                    </div>
    
                    <Button
                        variant="contained" 
                        color="primary"
                        onClick={this.contributeToCampaign}
                        disabled={this.state.loading}
                    >
                        Contribute
                    </Button>
                </div>
            )
        }
    }
}