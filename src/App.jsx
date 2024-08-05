import "./App.css";
import { ValueProvider } from "./contextApi";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<ValueProvider>
			<Outlet />
		</ValueProvider>
	);
}

export default App;
