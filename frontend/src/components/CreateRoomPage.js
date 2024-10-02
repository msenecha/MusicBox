import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, FormHelperText, RadioGroup, FormControlLabel, Radio, TextField, Collapse, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function CreateRoomPage({ update = false, votesToSkip: initialVotesToSkip = 2, guestCanPause: initialGuestCanPause = true, roomCode = null, updateCallback }) {
	const [guestCanPause, setGuestCanPause] = useState(initialGuestCanPause);
	const [votesToSkip, setVotesToSkip] = useState(initialVotesToSkip);
	const navigate = useNavigate();
	const [successMsg, setSuccessMsg] = useState("");

	// If we're updating an existing room, change the button label
	const buttonText = update ? "Update Room" : "Create Room";

	const handleVotesChange = (e) => {
		setVotesToSkip(e.target.value);
	};

	const handleGuestCanPauseChange = (e) => {
		setGuestCanPause(e.target.value === "true");
	};

	const handleRoomButtonClicked = () => {
		const requestOptions = {
			method: update ? 'PATCH' : 'POST', // Use PATCH if updating a room
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				votes_to_skip: votesToSkip,
				guest_can_pause: guestCanPause,
				code: roomCode, // Include roomCode for updating the room
			}),
		};

		const apiUrl = update ? "/api/update-room/" : "/api/create-room/";

		fetch(apiUrl, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				if (update) {
					setSuccessMsg("Room updated successfully!");
					updateCallback(); // Call the update callback when the room is updated
				} else {
					navigate("/room/" + data.code);
				}
			});
	};

	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
			<Typography component='h4' variant="h4" gutterBottom>
			  <Collapse in={successMsg !== ""}>
					<Alert severity="success" variant="filled">
						{successMsg}
					</Alert>
				</Collapse>
			</Typography>
			<Typography component='h4' variant="h4" gutterBottom>
				{update ? "Update Room Settings" : "Create a Room"}
			</Typography>
			<FormControl component="fieldset">
				<FormHelperText align="center">
					Guest control of playback state
				</FormHelperText>
				<RadioGroup row value={guestCanPause.toString()} onChange={handleGuestCanPauseChange}>
					<FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
					<FormControlLabel value="false" control={<Radio color="secondary" />} label="No control" labelPlacement="bottom" />
				</RadioGroup>
			</FormControl>
			<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
				<FormControl>
					<TextField
						required
						type="number"
						value={votesToSkip} // Controlled input for votes to skip
						onChange={handleVotesChange}
					/>
					<FormHelperText align="center">
						Votes required to skip song
					</FormHelperText>
				</FormControl>
			</Box>
			<Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleRoomButtonClicked}>
				{buttonText}
			</Button>
			{!update && (
				<Button variant="contained" color="secondary" sx={{ mt: 1 }} to="/" component={Link}>
					Back
				</Button>
			)}
		</Box>
	);
}
