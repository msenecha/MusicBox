import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Info from "./Info";
import Room from "./Room";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Typography } from '@mui/material';
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    // Use `this.state` to initialize state
    this.state = {
      roomCode: null,
    };
	this.clearRoomCode = this.clearRoomCode.bind(this);
  }

  async componentDidMount() {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  clearRoomCode() {
	this.setState({
		roomCode: null,
	});
  }

  renderHomePage() {
    return (
      <Box>
        <Box>
          <Typography variant="h3" component="h3">House Party</Typography>
        </Box>
        <Box>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="secondary" to="/join" component={Link}>
              Join a room
            </Button>
            <Button color="default" to="/info" component={Link}>
              Info
            </Button>
            <Button color="primary" to="/create" component={Link}>
              Create a room
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    );
  }


  render() {
    return (
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              this.state.roomCode ? (
                <Navigate to={`/room/${this.state.roomCode}`} />
              ) : (
                this.renderHomePage()
              )
            }
          />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/info" element={<Info />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room leaveRoomCallback={this.clearRoomCode} />}
			/>
        </Routes>
      </Router>
    );
  }
}
