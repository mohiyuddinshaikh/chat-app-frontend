import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SchoolIcon from "@material-ui/icons/School";
import PasswordDialog from "./PasswordDialog";

export default function OneRoom(props) {
  return (
    <Card
      style={{
        borderLeft: "3px solid black",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
            alignItems: "center",
          }}
        >
          <React.Fragment>
            {props.icon} {props.groupName}
          </React.Fragment>

          <Button
            variant="contained"
            style={{ backgroundColor: "black", color: "white" }}
            onClick={props.handleOpenDialog}
          >
            Join
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
