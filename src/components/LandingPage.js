import React from "react";
import Header from "../extras/Header";
import Typography from "@material-ui/core/Typography";
import RoomsContainer from "../extras/Card";

export default function LandingPage() {
  return (
    <React.Fragment>
      <Header />
      <div className="landingPageMainContainer">
        <RoomsContainer />
      </div>
    </React.Fragment>
  );
}
