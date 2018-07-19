import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter  } from "react-router-dom";
import Button from '@material-ui/core/Button';

import ContractTable from './components/ContractTable/ContractTable';
import NewCampaign from './components/NewCampaign/NewCampaign';
import CampaignDetail from './components/CampaignDetail/CampaignDetail';

// css
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/new" component={NewCampaign} />
          <Route exact path="/details" component={CampaignDetail} />
        </div>
      </Router>
    );
  }
}

const RouteButton = withRouter(({ history }) => (
  <Button
    variant="contained" 
    color="primary"
    onClick={() => { history.push('/new') }}
  >
    New Event
  </Button>
))

const Home = () =>  (
  <div >
    <div className='create-new-contract'>
        <RouteButton />
    </div>
    <ContractTable />
  </div>
)

export default App;
