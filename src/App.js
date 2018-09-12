import React from 'react'
import PropTypes from 'prop-types'
import {ConnectedRouter} from 'connected-react-router';
import { Route, Switch} from 'react-router'
import ProductDetails from './components/ProductDetails/ProductDetails';

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" render={() => (<div>ProductDetails</div>)} />
      </Switch>
    </ConnectedRouter>
  )
}

App.propTypes = {
  history: PropTypes.object,
}

export default App;
