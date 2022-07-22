import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import RegisterDriverPartner from "../pages/register/form";
export default function Routes() {
  return (
    <Router>
          <html style={{backgroundColor:'#ccc',margin:-20}}>
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <RegisterDriverPartner {...props} />}
          />
        </Switch>
     </html>
    </Router>
  );
}
