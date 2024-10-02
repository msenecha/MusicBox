import React, {Component} from "react";
import { Box, Typography, Card, IconButton, LinearProgress } from "@mui/material";
import { PlayArrow, SkipNext, Pause } from "@mui/icons-material";

const Player = (props) => {
	  const songProgress = (props.time / props.duration) * 100;

  const pauseSong = ()	=> {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
	};
	fetch("/spotify/pause", requestOptions);
};

const playSong = ()	=> {
	const requestOptions = {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
	};
	fetch("/spotify/play", requestOptions);
};

  const handlePlayPause = () => {
	props.is_playing ? pauseSong() : playSong();
  };

  const skipSong = () => {
	const requestOptions = {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	};
	fetch("/spotify/skip", requestOptions);
  };



  return (
	<Card>
	  <Box display="flex" alignItems="center">
		<Box>
			<img src={props.image_url} height="100px" width="100px" />
		</Box>
		<Box>
			<Box>
				<Typography variant="h5" component="h5">{props.title}</Typography>
			</Box>
			<Box>
				<Typography variant="p" component="p">{props.artists}</Typography>
			</Box>
			<IconButton onClick={handlePlayPause}>
				{props.is_playing ? <Pause /> : <PlayArrow />}
			</IconButton>
			{props.votes} {" / "} {props.votes_needed}
			<IconButton onClick={skipSong}><SkipNext /></IconButton>
		</Box>
	  </Box>
	  <LinearProgress variant="determinate" value={songProgress} />
	</Card>
  );
}

export default Player;
