import React, {Component} from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import factory from '../../etherium/factory';

export default class ContractTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contracts: [],
            loading: true
        }
        
    }

    async componentDidMount() {
        const contractsCount = await factory.methods.getContractsCount().call();
        
        const campaigns = await Promise.all(
            Array(parseInt(contractsCount))
              .fill()
              .map((element, index) => {
                return factory.methods.deployedCampaigns(index).call();
              })
        );

        this.setState({ contracts: campaigns });
    }


    render() {
        return(
            <div>
                <Paper >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Address</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Minimum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.contracts.map(n => {
                                    return (
                                        <TableRow key={n.contractAddress}>
                                            <TableCell>
                                                {n.contractAddress.substring(0, 6)} ...
                                            </TableCell>
                                            <TableCell>
                                                {n.description}
                                            </TableCell>
                                            <TableCell>
                                                {n.minimum}
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