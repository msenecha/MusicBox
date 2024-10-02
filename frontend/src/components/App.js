import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import HomePage from "./HomePage";


export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="center">
				<HomePage />
			</div>
		);
	}
}

// Find the root DOM element where the app will be rendered
const container = document.getElementById("app");

// Use createRoot instead of render
const root = createRoot(container); // Create a root for your app

// Render the App component inside the root
root.render(<App />);
