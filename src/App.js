import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Import components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/main/dashboard/Dashboard';
import PrivateRoute from './components/private/PrivateRoute';
import FilteredTable from './components/main/table-elements/table/FilteredTable';

// Redux imports
import { store, persistor } from './redux/store';
import Navbar from './components/layout/Navbar';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router>
                    <Navbar />
                    <div className='App'>
                        <Switch>
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                            <PrivateRoute
                                exact
                                path='/dashboard/tickets/:status/:type'
                                component={FilteredTable}
                            />
                            <Route exact path='/' component={Login} />
                            <Route exact path='/sign-in' component={Login} />
                            <Route exact path='/sign-up' component={Register} />
                        </Switch>
                    </div>
                    ;
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
