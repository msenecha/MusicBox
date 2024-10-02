import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Make sure useParams is imported here
import { Box, Typography, Button } from '@mui/material';
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';

const Room = (props) => {
	const { roomCode } = useParams();
	const [votesToSkip, setVotesToSkip] = useState(2);
	const [guestCanPause, setGuestCanPause] = useState(false);
	const [isHost, setIsHost] = useState("");
	const [showSettings, setShowSettings] = useState(false);
	const navigate = useNavigate();
	const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(false);
	const [song, setSong] = useState({});
	let interval;


	const getRoomDetails = () => {
	  fetch('/api/get-room?code=' + roomCode)
		.then((response) => {
		  if (!response.ok) {
			props.leaveRoomCallback();
			navigate('/');
		  }
		  return response.json();
		})
		.then((data) => {
		  setVotesToSkip(data.votes_to_skip);
		  setGuestCanPause(data.guest_can_pause);
		  setIsHost(data.is_host);
		  console.log(data.isHost);
		  if (data.is_host) {
			  console.log('User is host');
			  authenticateSpotify();
			  getCurrentSong();
			}
		});
	};


	useEffect(() => {
		console.log("Room component loaded with roomCode:", roomCode);
		getRoomDetails();
		interval = setInterval(getCurrentSong, 1000);
		return () => clearInterval(interval);
	}, [roomCode]);


	const leaveButtonPressed = () => {
	  const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	  };
	  fetch('/api/leave-room', requestOptions)
		.then((response) => {
		  props.leaveRoomCallback();
		  navigate('/');
		});
	};


	const authenticateSpotify = () => {
	  console.log('Attempting to authenticate Spotify');
	  fetch('/spotify/is-authenticated')
		.then((response) => response.json())
		.then((data) => {
		  console.log('Spotify authentication status:', data.status);
		  setSpotifyAuthenticated(data.status);
		  if (!data.status) {
			console.log('Redirecting to Spotify authentication');
			fetch('/spotify/get-auth-url')
			  .then((response) => response.json())
			  .then((data) => {
				window.location.replace(data.url);
			  });
		  }
		});
	}

	const getCurrentSong = () => {  // Added 'const' for this function
		fetch('/spotify/current-song')
			.then((response) => {
				if (!response.ok) {
					return {};
				} else {
					return response.json();
				}
			})
			.then((data) => {
				setSong(data);
			});
	};

	const toggleSettings = () => {
	  setShowSettings(!showSettings);
	  if (showSettings) {
		getRoomDetails();  // Re-fetch updated room details when closing settings
	  }
	};

	const renderSettings = () => {
	  return (
		<Box align='center'>
		  <CreateRoomPage
			update={true}
			votesToSkip={votesToSkip}
			guestCanPause={guestCanPause}
			roomCode={roomCode}
			updateCallback={getRoomDetails}  // Fetch updated room details after update
		  />
		  <Button variant='contained' color='secondary' onClick={toggleSettings}>
			Close
		  </Button>
		</Box>
	  );
	};

	const renderRoomInfo = () => {
	  return (
		<Box align="center">
		  <Typography variant="h4">Code: {roomCode}</Typography>
		  <MusicPlayer {...song} />
		  {isHost && (
			<Button variant="contained" color="primary" onClick={toggleSettings}>
			  Settings
			</Button>
		  )}
		  <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>
			Leave room
		  </Button>
		</Box>
	  );
	};

	return showSettings ? renderSettings() : renderRoomInfo();
};

// Move export default to the top level (outside the component)
export default Room;
