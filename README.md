
# Django-React Spotify MusicBox

## Overview
The Spotify Room Controller is a web application built with Django (backend) and React (frontend), allowing users to create and join music rooms. Users in the room can control the currently playing Spotify track, whether as the host or guest, and the room dynamically updates in real-time to show the current song, allowing a synchronized music experience. Hosts have more control over playback, while guests can vote to skip songs.

This project integrates the Spotify API to fetch and control music playback, leveraging Django REST Framework (DRF) to build a robust backend, and React.js for the interactive, modern frontend experience.
## Features

- Create and Join Rooms: Users can create or join rooms using a unique room code.
- Real-time Music Control: Hosts control playback while guests can vote to skip songs.
- Spotify Authentication: Users can log in via Spotify to control or see the currently playing track.
- Dynamic UI Updates: No need to refresh the page for updates; the UI updates in real-time using React hooks.
- Room Settings: Hosts can change room settings such as the number of votes needed to skip a song.
- Responsive Design: A mobile-friendly, clean interface powered by Material UI.

## Tech Stack

**Client:**
- React.js: Powers the interactive, component-based frontend with a focus on single-page application behavior.
- Material-UI: Used to create responsive, accessible, and customizable components like buttons, typography, and cards.
- React Router: Enables navigation between different routes/pages like the home page, create room page, and individual room pages.

**Server:** 
- Django: Provides the backend structure, room management, session handling, and integration with the Spotify API.
- Django REST Framework (DRF): Used to create API endpoints for room creation, joining, and managing Spotify-related actions.
- Spotify Web API: Interacts with Spotify to manage music playback and authentication for users.
- dotenv: To securely manage Spotify API credentials in development and production environments.


## Best Practices & Considerations

- Environment Variables: Use the .env file to manage sensitive data such as Spotify API credentials, which are loaded using python-dotenv in the Django settings.
- Component Reusability: The React components are modular, allowing for easy maintenance and expansion of the frontend UI.
- Error Handling: The app has error handling for failed Spotify authentications, room joins, and missing room codes.
- Security: The project uses CSRF protection and session-based authentication to ensure secure communication between the frontend and backend.