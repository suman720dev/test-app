import React from 'react';
import './App.css';
import RegisterPage from "./RegisterPage";
import Home from './Home';
import LoginPage from './LoginPage';
import PrivateRoute from "./ProtectedRoute";
import { alertActions } from "./actions/alert";
import { connect } from "react-redux";
import { history } from "./helper";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
          <div className="App">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}
            <Switch>
              <PrivateRoute exact path="/" render={() => <Home />} />
              <Route path="/login" component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Redirect from="*" to="/" />
            </Switch>
          </div>
        );
      }
    }

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);

export default connectedApp;