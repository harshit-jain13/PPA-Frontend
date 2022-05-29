import React from "react";
import "./styles/AboutEvent.css";
import { Button } from "@mui/material";
import cal from "../../../../Resources/Images/calender.svg";
import watch from "../../../../Resources/Images/watch.svg";
import participants from "../../../../Resources/Images/participants.svg";
import location from "../../../../Resources/Images/Location.svg";
import { convertDate, convertTime, eventInfoBox } from "../../../../Utilities/EventsUtility/EventsUtility";
import { useHistory, useParams } from "react-router-dom";

function AboutEvent(props) {
	const { event_id } = useParams();
	const history = useHistory();
	const duration = parseInt(props.data.duration);
	const calculateDuration = () => {
		let hours = Math.floor(duration / 60);
		let minutes = duration % 60;
		if (hours > 0) {
			if (minutes === 0) {
				return hours > 1 ? `${hours} hours` : `${hours} hour`;
			} else {
				return hours > 1 ? `${hours} hours ${minutes} minutes` : `${hours} hour ${minutes} minutes`;
			}
		} else {
			return `${minutes} minutes`;
		}
	};

	return (
		<section className="aboutevent-wrapper">
			<div className="aboutevent-header">{props.data.event_title}</div>
			<p>{props.data.description}</p>

			<section className="aboutevent-info">
				<div className="aboutevent-datetime">
					{eventInfoBox(
						cal,
						`Starts on : ${convertDate(props.data.event_date_time)} - ${convertTime(
							props.data.event_date_time
						)}`
					)}
				</div>

				<div className="aboutevent-duration">{eventInfoBox(watch, `Duration : ${calculateDuration()}`)}</div>
				<div className="aboutevent-venue">{eventInfoBox(location, `Venue : ${props.data.event_venue}`)}</div>
			</section>

			<div className="aboutevent-register">
				<Button
					variant="contained"
					onClick={() => history.push(`/Register/${event_id}`)}
					className="aboutevent-regbutton">
					Register Now
				</Button>
				{eventInfoBox(participants, `${props.data.total_participants} people participating`)}
			</div>
		</section>
	);
}

export default AboutEvent;
