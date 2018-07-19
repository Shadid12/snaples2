import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default class CampaignDetail extends Component {
    
    componentDidMount() {

    }

    render() {
        return(
            <div>
                <Card>
                    <CardContent >
                        <Typography variant="headline">Live From Space</Typography>
                        <Typography variant="subheading" color="textSecondary">
                            Sub Heading
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}