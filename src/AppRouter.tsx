import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Components
import Layout from "./components/Layout";
import EventsPage from "./components/pages/events/EventsPage";
import LoginPage from "./components/pages/LoginPage";
import EventPage from "./components/pages/event/EventPage";

// Store
import { AuthStore } from "./stores/AuthStore";
const authStore = new AuthStore();

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/events">
          <Layout appState={authStore}>
            <EventsPage />
          </Layout>
        </Route>
        <Route path="/event/:id">
          <Layout appState={authStore}>
            <EventPage />
          </Layout>
        </Route>
        <Route path="/login">
          <LoginPage appState={authStore} />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
