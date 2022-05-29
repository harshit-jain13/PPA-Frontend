import React, { useEffect, useState } from "react";
import "./styles/Poster.css";
import { useHistory } from "react-router-dom";

function Poster(props) {
	const event_details = props.event_details;
	const history = useHistory();
	const timeInMs = Date.parse(event_details.event_date_time);
	const calculateTimeLeft = () => {
		const difference = +timeInMs - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}
		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);
		return () => clearTimeout(timer);
	});

	const timerComponents = [];

	Object.keys(timeLeft).forEach((interval) => {
		timerComponents.push(<>{timeLeft[interval]} </>);
	});

	const time = (value, time_scale) => {
		return (
			<>
				<div className="poster-countdown">
					<div>{value}</div>
					<div className="time_scale">{time_scale}</div>
				</div>
				{time_scale !== "Minutes" ? <div className="clock-double-dots">:</div> : ``}
			</>
		);
	};

	return (
		<div
			style={{ backgroundImage: `url(${event_details.event_image})` }}
			className="poster-main"
			onClick={() => history.push(`/Register/${event_details.event_id}`)}>
			<div className="poster-footer">
				<div>Webinar Starts In</div>
				<div className="poster-event-time-stamp">
					{time(timerComponents[0], "Days")}
					{time(timerComponents[1], "Hours")}
					{time(timerComponents[2], "Minutes")}
				</div>
			</div>
		</div>
	);
}

export default Poster;
