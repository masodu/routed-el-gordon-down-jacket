/**************************************************************************
 *
 *    ADOBE CONFIDENTIAL
 *    ___________________
 *
 *    Copyright 2018 Adobe
 *    All Rights Reserved.
 *
 *    NOTICE:  All information contained herein is, and remains
 *    the property of Adobe and its suppliers, if any. The intellectual
 *    and technical concepts contained herein are proprietary to Adobe
 *    and its suppliers and are protected by all applicable intellectual
 *    property laws, including trade secret and copyright laws.
 *    Dissemination of this information or reproduction of this material
 *    is strictly forbidden unless prior written permission is obtained
 *    from Adobe.
 *
 **************************************************************************/

import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { ConnectedRouter as Router, connectRouter, routerMiddleware } from 'connected-react-router';
import { Route } from 'react-router'
import ProductDetails from './components/ProductDetails/ProductDetails';

const history = createBrowserHistory();
// Initialize redux store
const store = createStore(connectRouter(history)(rootReducer),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(thunk, routerMiddleware(history))));

// Expose function to render ProductDetails component
ReactDOM.render(   
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={ProductDetails} />
        </Router>
    </Provider>
, document.getElementById("root"));
