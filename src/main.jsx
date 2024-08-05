import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ErrorPage from "./components/ErrorPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Container from "./components/Container.jsx";
import TelePrompt from "./components/TelePrompt.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />, // Add error handling here
		children: [
			{
				path: "/",
				element: <Container />,
			},
			{
				path: "/TelePrompter/",
				element: <TelePrompt />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
