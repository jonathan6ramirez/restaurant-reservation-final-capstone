import React from "react";

//Utils
import { Redirect, Route, Switch } from "react-router-dom";
import { today } from "../utils/date-time";

//Import Components
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import CreateReservation from "./reservations/CreateReservation";
import CreateTable from "./tables/CreateTable";
import Seat from "./seat/Seat";
import SearchPage from "./search/SearchPage";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact path="/reservations/new">
        <CreateReservation />
      </Route>

      <Route exact path="/reservations/:reservationId/seat">
        <Seat />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>

      <Route path="/tables/new" >
        <CreateTable />
      </Route>

      <Route path="/search" >
        <SearchPage />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
