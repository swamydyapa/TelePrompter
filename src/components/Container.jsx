import { useContext } from "react";
import { Link } from "react-router-dom";

import { ValueContext } from "../contextApi";

const Container = () => {
	const { value, setValue } = useContext(ValueContext);

	return (
		<>
			<div className="flex flex-col items-center max-w-screen-lg m-auto h-screen">
				<h1 className="text-3xl py-10 ">TelePrompter</h1>
				<p className="text-center max-w-screen-sm">
					A telePrompter, also known as an autocue, is a device used in
					television, film production and in public speaking to display a
					scrolling script or speech.
				</p>
				{/* Textarea  text box */}
				<textarea
					className="w-full h-screen border border-gray-300 p-4 my-4 rounded-md shadow-md  "
					placeholder="Enter your text here"
					onChange={(e) => setValue(e.target.value)}></textarea>

				<Link
					to="/TelePrompter"
					className="w-full px-4 py-2 bg-blue-600 text-white rounded-md ">
					Generate
				</Link>
			</div>
		</>
	);
};
export default Container;
