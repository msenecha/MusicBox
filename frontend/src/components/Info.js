import { IconButton } from '@mui/material';
import { Box, Typography, Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { Link } from 'react-router-dom';


export default function Info(props) {
	const [page, setPage] = useState(1);
	
	return (
		<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
			<Typography component='h4' variant="h4" gutterBottom>
				About the Project
			</Typography>
			<Button variant="contained" color="secondary" to="/" component={Link}>
				Back
		  	</Button>
		</Box>
	);
}
