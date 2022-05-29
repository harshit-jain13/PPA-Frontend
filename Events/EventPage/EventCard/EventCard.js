import React, { useState } from "react";
import "./styles/EventCard.css";
import cal from "../../../../Resources/Images/calender.svg";
import watch from "../../../../Resources/Images/watch.svg";
import shareIcon from "../../../../Resources/Images/share.svg";
import participants from "../../../../Resources/Images/participants.svg";
import ShareEvent from "../ShareEvent/ShareEvent";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { convertDate, convertTime, eventInfoBox } from "../../../../Utilities/EventsUtility/EventsUtility";

const EventCard = (props) => {
	const cardContent = props.cardContent;
	const isPrevious = props.isPrevious;
	const history = useHistory();
	const eventImage = props.cardContent.event_image;

	const getShareButton = () => {
		if (isPrevious) return <></>;
		return <img alt="share" src={shareIcon} className="eventcard-shareicon" onClick={handleClickOnModal} />;
	};

	const getCardImage = () => {
		if (isPrevious)
			return <div className="eventcard-image-wrapper" style={{ backgroundImage: `url(${eventImage})` }}></div>;

		return (
			<div
				className="eventcard-image-wrapper"
				style={{ backgroundImage: `url(${eventImage})` }}
				onClick={() => history.push(`/Events/${cardContent.event_id}`)}></div>
		);
	};

	const getCardTitle = () => {
		if (isPrevious) {
			return <div className="eventcard-header">{cardContent.event_title}</div>;
		}

		return (
			<div
				style={{ "cursor": "pointer" }}
				className="eventcard-header"
				onClick={() => history.push(`/Events/${cardContent.event_id}`)}>
				{cardContent.event_title}
			</div>
		);
	};

	const getRegSection = () => {
		if (isPrevious) return eventInfoBox(participants, `${cardContent.event_participants} people participated`);

		return (
			<div className="eventcard-reg-wrapper">
				<Button
					className="eventcard-regbutton"
					onClick={() => history.push(`/Register/${cardContent.event_id}`)}
					variant="contained">
					Register Now
				</Button>
				{eventInfoBox(participants, `${cardContent.event_participants} people participating`)}
			</div>
		);
	};

	const [isOpen, setIsOpen] = useState(false);
	const handleClickOnModal = () => {
		console.log("Modal");
		setIsOpen(!isOpen);
	};

	return (
		<div className="eventcard-wrapper">
			{getShareButton()}

			<Modal open={isOpen} onClose={handleClickOnModal} className="share-event-modal">
				<ShareEvent
					handleClickOnModal={handleClickOnModal}
					event_details={cardContent}
					event_image={eventImage}
					event_url={`${window.location.href}/${cardContent.event_id}`}
				/>
			</Modal>

			{getCardImage()}

			<div className="eventcard-info-wrapper">
				<div className="eventcard-info">
					{getCardTitle()}

					<div className="eventcard-description">{cardContent.event_description}</div>
					<div className={isPrevious ? "eventcard-datetime prev-datetime" : "eventcard-datetime"}>
						{eventInfoBox(cal, convertDate(cardContent.event_date_time))}
						{eventInfoBox(watch, convertTime(cardContent.event_date_time))}
					</div>

					{getRegSection()}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
