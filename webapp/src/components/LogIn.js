import React from "react";
import Button from "react-bootstrap/Button";
import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core/styles";

class LogIn extends React.Component {
  async handleButton(e) {
    e.preventDefault();
    await this.props.showLogInPopUp();
  }

  render() {
    return (
      <div className="LogInMessage">
        <h2>Welcome to Radarin_es6b</h2>
        <br />
        <p>
          Radarin is a system to facilitate meetings between friends using new
          technologies. The application will be able to access your location if
          you voluntarily have it activated. It will allow other users who are
          your friends to know when you are nearby. You will be notified when
          you have friends nearby so that you can get in touch. The application
          will not store personal information but you will be asked for
          permission to obtain the information needed.
        </p>
        <Typography variant="h7" component="h7" align="center">
          To use this application you will need a Solid identity
        </Typography>
        <br />
        <h4>
          <br />
          <Button variant="primary" onClick={this.handleButton.bind(this)}>
            Access
          </Button>
        </h4>
        <br />
        <br />
        <p>
          ¿Don't have a solid identity?{" "}
          <a href="https://solidproject.org/users/get-a-pod">Obtain one here</a>
        </p>
      </div>
    );
  }
}

export default LogIn;
