import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import OneRoom from "./OneRoom";
import SchoolIcon from "@material-ui/icons/School";
import CodeIcon from "@material-ui/icons/Code";
import LiveTvIcon from "@material-ui/icons/LiveTv";
//
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory } from "react-router";
//
import { isMobile } from "react-device-detect";

export default function RoomsContainer() {
  const history = useHistory();
  const rooms = [
    { groupName: "Rizvites", icon: <SchoolIcon />, password: "qwertyuiop" },
    { groupName: "TechZ Devs", icon: <CodeIcon />, password: "qwertyuiop" },
    {
      groupName: "House Of Cards",
      icon: <LiveTvIcon />,
      password: "qwertyuiop",
    },
  ];

  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  function handleOpenDialog(index) {
    setOpen(true);
    setCurrentIndex(index);
  }

  function handleClose() {
    setOpen(false);
  }

  // console.log("password :>> ", password);
  function handleJoin() {
    if (password == rooms[currentIndex].password) {
      history.push({
        pathname: "/room",
        state: { groupName: rooms[currentIndex].groupName },
      });
    } else {
      // console.log("Incorrect password");
      alert("Incorrect Password");
    }
  }

  return (
    <React.Fragment>
      <Card
        className="rooms-container-main"
        style={{ width: isMobile ? "95vw" : "80vw" }}
      >
        <CardContent style={{ width: "90%" }}>
          <Typography
            style={{
              color: "black",
              textAlign: "center",
              fontSize: "1.2em",
              fontWeight: "bold",
            }}
          >
            Join Room
          </Typography>
          {rooms.map((item, index) => {
            return (
              <OneRoom
                icon={item.icon}
                groupName={item.groupName}
                handleOpenDialog={() => handleOpenDialog(index)}
              />
            );
          })}
        </CardContent>
      </Card>
      {open ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth="sm"
        >
          <DialogTitle id="form-dialog-title">
            Enter Password for {rooms[currentIndex].groupName}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password : qwertyuiop"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleJoin} color="primary">
              Join
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </React.Fragment>
  );
}
