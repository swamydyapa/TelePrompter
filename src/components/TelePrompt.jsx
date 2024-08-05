import { HiPlay, HiPause } from "react-icons/hi2";
import {
	BiSolidTimer,
	BiFontFamily,
	BiCaretRight,
	BiSolidRectangle,
} from "react-icons/bi";
import { useContext, useEffect, useRef, useState } from "react";
import { ValueContext } from "../contextApi";
import { Link } from "react-router-dom";

const TelePrompt = () => {
	const textRef = useRef(null);
	const buttonRef = useRef(null);
	const { value } = useContext(ValueContext);

	const [rangeValue, setRangeValue] = useState(0.3); //initial range value
	const [fontSize, setFontSize] = useState(36); //initial font size value

	const [isScrolling, setIsScrolling] = useState(false); // for scrolling
	const [isPaused, setIsPaused] = useState(true); //used to pause and start
	const [text, setText] = useState("");

	const handleKeyDown = (e) => {
		if (e.key === " ") {
			e.preventDefault();
			setIsScrolling(true);
			setIsPaused(!isPaused);
		} else if (e.key === "ArrowUP") {
			scrollUp();
		} else if (e.key === "ArrowDown") {
			scrollDown();
		}
	};

	const scrollUp = () => {
		if (textRef.current) {
			textRef.current.scrollTop -= 10;
		}
	};
	const scrollDown = () => {
		if (textRef.current) {
			textRef.current.scrollTop += 10;
		}
	};

	useEffect(() => {
		if (isScrolling && textRef.current) {
			let scrollTop = textRef.current.scrollTop;

			const intervalId = setInterval(() => {
				//start the scrolling where the user left of
				if (scrollTop >= textRef.current.scrollHeight || isPaused) {
					clearInterval(intervalId);
					setIsScrolling(isPaused);
					return;
				}
				//scrollIncrement to increase the speed of the scrolling
				const scrollIncrement = 1 + parseFloat(rangeValue);
				scrollTop += scrollIncrement;
				textRef.current.scrollTop = scrollTop;
			}, 50);
			return () => clearInterval(intervalId);
		}
	}, [isScrolling, isPaused, textRef]);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isPaused]);

	return (
		<>
			<header className="fixed top-0 left-0 w-full py-5 flex flex-row justify-center gap-10   ">
				<Link
					to="/TelePrompter"
					className=" px-4 py-2 bg-blue-600 text-white rounded-md w-20">
					Home
				</Link>
				<button
					className={`block border-1 ${
						isPaused ? "bg-blue-400" : "bg-orange-400"
					}  px-4 py-1 text-gray-50 rounded-md`}>
					{isPaused ? <HiPlay size={25} /> : <HiPause size={25} />}
				</button>

				{/* speed range value  */}
				<div className="flex gap-3">
					<p className="flex gap-3 text-xl items-center">
						<BiSolidTimer size={40} /> {rangeValue}
					</p>
					<input
						type="range"
						min={0.1}
						step={0.1}
						max={20}
						value={rangeValue}
						id="speedRange"
						onChange={(e) => setRangeValue(e.target.value)}
					/>
				</div>
				{/* font size value */}
				<div className="flex gap-3">
					<p className="flex gap-3 text-xl items-center">
						<BiFontFamily size={30} />
						{fontSize}
					</p>
					<input
						type="range"
						min={1}
						step={1}
						max={120}
						value={fontSize}
						id="fontSize"
						onChange={(e) => setFontSize(e.target.value)}
					/>
				</div>
				<button
					ref={buttonRef}
					onClick={(e) => {
						if (e.type === "click") {
							textRef.current.scrollTop = 0;
						}
					}}
					className="bg-red-600 px-3 text-gray-50 rounded-md ">
					<BiSolidRectangle size={20} />
				</button>
			</header>

			{/*add  black box */}
			<div className="w-full h-72 bg-black fixed inset-0 m-auto -z-10 flex items-center ">
				<BiCaretRight size={80} />
			</div>
			{/* add display text area box */}
			<div className="w-full h-screen flex justify-center">
				<textarea
					ref={textRef}
					value={value || "Text not found"}
					readOnly
					className={`text-center w-10/12 bg-transparent focus:outline-none border-none text-white h-full overflow-hidden pt-[30%] pb-[30%]`}
					style={{ fontSize: `${fontSize}px` }}
					onChange={(e) => setText(e.target.value)}></textarea>
			</div>
		</>
	);
};

export default TelePrompt;
