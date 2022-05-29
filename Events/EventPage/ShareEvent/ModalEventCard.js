import React from "react";
import "./styles/ModalEventCard.css";
import cal from "../../../../Resources/Images/calender.svg";
import watch from "../../../../Resources/Images/watch.svg";
import participants from "../../../../Resources/Images/participants.svg";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { convertDate, convertTime } from "../../../../Utilities/EventsUtility/EventsUtility";

function EventCard(props) {
	const history = useHistory();
	const event_image = props.event_image;
	const event_date = convertDate(props.cardContent.event_date_time);
	const event_time = convertTime(props.cardContent.event_date_time);
	const icon_with_info = (icon, desc) => {
		return (
			<div className="modal-icon-info">
				<img alt="icon" src={icon} />
				<p>{desc}</p>
			</div>
		);
	};

	const card = (cardContent) => {
		return (
			<div className="modal-event-card-box">
				<img
					alt="event_image"
					className="modal-event_image_regular_window"
					src={event_image}
					onClick={() => history.push(`/Events/${cardContent.event_id}`)}
				/>
				<div className="modal-card-info">
					<div className="modal-EventTitle" onClick={() => history.push(`/Events/${cardContent.event_id}`)}>
						{cardContent.event_title}
					</div>

					<div className="modal-EventDescription">{cardContent.event_description}</div>

					<div className="modal-time-date">
						{icon_with_info(cal, event_date)}
						{icon_with_info(watch, event_time)}
					</div>

					<div className="modal-card-footer">
						<Button
							className="modal-mui-button"
							onClick={() => history.push(`/Register/${cardContent.event_id}`)}
							variant="contained">
							Register Now
						</Button>
						<p>{icon_with_info(participants, cardContent.event_participants + " people participating")}</p>
					</div>
				</div>
			</div>
		);
	};

	return <>{card(props.cardContent)}</>;
}

export default EventCard;
