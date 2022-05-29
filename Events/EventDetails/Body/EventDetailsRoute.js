import React from "react";
import { useState, useEffect } from "react";
import Poster from "../../EventPage/Poster/Poster";
import axios from "axios";
import { MISC_URL } from "../../../../Constants/UrlConstants";
import { useParams } from "react-router-dom";
import AboutEvent from "../AboutEvent/AboutEvent";
import AboutSpeaker from "../AboutSpeaker/AboutSpeaker";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles/EventDetailsRoute.css";

function EventDetailsRoute() {
	const [isLoading, setLoading] = useState(true);
	const [EventDetails, setEventDetails] = useState({});
	const { event_id } = useParams();

	useEffect(() => {
		window.scrollTo({ top: 0 });
		axios
			.get(MISC_URL + "/getEventDetails", {
				params: {
					id: event_id,
				},
			})
			.then((eventData) => {
				eventData.data[0]["event_id"] = event_id;
				setEventDetails(eventData.data[0]);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
		return () => setEventDetails({});
	}, [event_id]);

	if (isLoading) {
		return (
			<div className="spinner">
				<CircularProgress />
			</div>
		);
	}

	return (
		<section className="eventdetails-wrapper">
			<Poster event_details={EventDetails} />
			<AboutEvent data={EventDetails} />
			<AboutSpeaker data={EventDetails} />
		</section>
	);
}

export default EventDetailsRoute;
