import React, { useContext } from "react";
import ReactStopwatch from "react-stopwatch";
import { EndCallContext } from "../App/App";

const Stopwatch = () => {
	const onLeave = useContext(EndCallContext);

	return (
		<ReactStopwatch
			seconds={0}
			minutes={0}
			hours={0}
			limit='00:01:00'
			onChange={({ hours, minutes, seconds }) => {
				if (seconds === 30) {
					console.log(
						"YOU HAVE @ 30 SECONDS LEFT!   BUY ADDITONAL COINS TO CONTINUE THIS CALL"
					);
				}
			}}
			onCallback={() => onLeave()}
			render={({ formatted, hours, minutes, seconds }) => {
				return <span>{`${hours}:${minutes}:${seconds}`}</span>;
			}}
		/>
	);
};

export default Stopwatch;
