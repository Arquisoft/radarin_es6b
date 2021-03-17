import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  root: {
    width: 650,
    height: 470,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "6em"
  }
});

class Prueba extends React.Component {
  render() {
    return (
      <div id="login">
        <Typography variant="h4" component="h1" align="center">
          To use this application you will need a Solid identity
        </Typography>

        <div>
          <p>
            <p></p>
            Radarin
          </p>
        </div>
      </div>
    );
  }
}
export default Prueba;
