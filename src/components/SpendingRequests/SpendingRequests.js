import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import queryString  from '../../lib/query-string-master';
import Button from '@material-ui/core/Button';

import Campaign from '../../etherium/campaign';
import web3 from '../../etherium/web3';

export default class SpendingRequests extends Component {

    state = {
        requestCount: '',
        contributersCount: '',
        requests: []
    }

    async componentDidMount() {
        const parsed = queryString.parse(window.location.search);
        const campaign = Campaign(parsed.address);

        const requestCount = await campaign.methods.getRequestsCount().call();
        const contributersCount = await campaign.methods.contributersCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount))
              .fill()
              .map((element, index) => {
                return campaign.methods.requests(index).call();
              })
        );

        this.setState({
            requestCount: requestCount,
            contributersCount: contributersCount,
            requests: requests
        })
    }

    render() {
        return(
            <div>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Approvals</TableCell>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Action</TableCell>
                                <TableCell>Finalize</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.requests.map(n => {
                                    return(
                                        <TableRow key={n.contractAddress}>
                                            <TableCell>
                                                {n.description}
                                            </TableCell>
                                            <TableCell>
                                                {n.approvalCount}
                                            </TableCell>
                                            <TableCell>
                                                {n.recipient.substring(0, 6)} ...
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" >
                                                    Approve
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" >
                                                    Finalize
                                                </Button> 
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}