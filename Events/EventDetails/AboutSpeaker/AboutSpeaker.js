import React from "react";
import { MISC_URL } from "../../../../Constants/UrlConstants";
import "./styles/AboutSpeaker.css";
import { eventInfoBox } from "../../../../Utilities/EventsUtility/EventsUtility";
import participants from "../../../../Resources/Images/participants.svg";
import { Button } from "@mui/material";
import Scholar from "../../../../Resources/Images/Scholar.svg";
import Group from "../../../../Resources/Images/Group.svg";
import Degree from "../../../../Resources/Images/Degree.svg";
import Stars from "../../../../Resources/Images/Stars.svg";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";

const outcomeImages = [Scholar, Group, Stars, Degree];

const getOutcome = (outcome, index) => {
	return (
		<div className="aboutspeaker-outcome">
			<div>
				<img src={outcomeImages[index % outcomeImages.length]} alt="outcome_image" />
			</div>
			<div> {outcome} </div>
		</div>
	);
};

const getAboutSpeaker = (speakers) => {
	if (speakers) {
		return (
			<div className="aboutspeaker-inner-wrapper">
				<div className="aboutspeaker-header">About Speaker</div>
				<hr className="blue-border"></hr>

				{speakers.map((speaker, index) => {
					return <p key={index}>{speaker.about}</p>;
				})}
			</div>
		);
	}

	return <></>;
};

const getLearningOutcomes = (learning_outcomes) => {
	if (learning_outcomes && learning_outcomes.length > 0) {
		return (
			<>
				<div className="aboutspeaker-header">Learning Outcomes</div>
				<hr className="blue-border"></hr>

				<div className="aboutspeaker-outcomes-wrapper">
					{learning_outcomes.map((outcome, index) => {
						return getOutcome(outcome, index);
					})}
				</div>
			</>
		);
	}

	return <></>;
};

function AboutSpeaker(props) {
	const { event_id } = useParams();
	const history = useHistory();
	const route = useRouteMatch();
	const url = `${window.location.href}`;

	const handleClickOnLinkedinButton = () => {
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`);
	};

	const handleClickOnFacebookButton = () => {
		window.open(`https://www.facebook.com/sharer.php?u=${url}`);
	};

	return (
		<section className="aboutspeaker-wrapper">
			{getAboutSpeaker(props.data.speakers)}
			{getLearningOutcomes(props.data.learning_outcomes)}

			<div className="aboutspeaker-register">
				<Button
					variant="contained"
					onClick={() => history.push(`/Register/${event_id}`)}
					className="aboutspeaker-regbutton">
					Register Now
				</Button>
				{eventInfoBox(participants, `${props.data.total_participants} people participating`)}
			</div>
			<div className="aboutspeaker-socials">
				<button onClick={handleClickOnLinkedinButton}>in</button>
				<button onClick={handleClickOnFacebookButton}>f</button>
			</div>
		</section>
	);
}

export default AboutSpeaker;
