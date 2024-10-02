import React, { useState } from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRoomCodeChange = (e) => {
	setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
	const requestOptions = {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify({
		code: roomCode,
	  }),
	};
	fetch("/api/join-room", requestOptions)
	  .then((response) => {
		if (response.ok) {
		  navigate(`/room/${roomCode}`);
		} else {
		  setError("Room not found");
		}
	  })
	  .catch((error) => {
		console.log(error);
	  });
  };

  return (
	<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
	  <Typography component="h4" variant="h4" gutterBottom>
		Join a Room
	  </Typography>
	  <TextField
		error={Boolean(error)}
		label="Code"
		placeholder="Enter a room code"
		value={roomCode}
		helperText={error}
		variant="outlined"
		onChange={handleRoomCodeChange}
	  />
	  <Box display="flex" flexDirection="column" align="center" sx={{ mt: 1 }}>
		<Button variant="contained" color="primary" onClick={roomButtonPressed}>
		  Enter room
		</Button>
	  </Box>
	  <Box display="flex" flexDirection="column" align="center" sx={{ mt: 1 }}>
		<Button variant="contained" color="secondary" to="/" component={Link}>
		  Back
		</Button>
	  </Box>
	</Box>
  );
};

export default RoomJoinPage;
