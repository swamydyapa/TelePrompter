import "./App.css";
import { ValueProvider } from "./contextApi";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Container from "./components/Container";
import TelePrompt from "./components/TelePrompt";

function App() {
	return (
		<ValueProvider>
			<Router>
				<Routes>
					<Route path="/" element={<Container />} />
					<Route path="/telePrompt" element={<TelePrompt />} />
				</Routes>
			</Router>
		</ValueProvider>
	);
}

export default App;
