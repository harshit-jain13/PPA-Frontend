import React, { useState, useEffect } from "react";
import "./styles/Body.css";
import axios from "axios";
import { MISC_URL } from "../../../../Constants/UrlConstants";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import EventCard from "../EventCard/EventCard";
import Poster from "../Poster/Poster";

function Body() {
	const history = useHistory();
	const width = window.innerWidth;
	const cardsPerPage = 4;

	const [eventsData, setEventsData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		window.scrollTo({ top: 0 });
		axios
			.get(MISC_URL + "/getAllEvents")
			.then((eventData) => {
				setEventsData(eventData.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});

		return () => setEventsData([]);
	}, []);

	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCard = eventsData.slice(indexOfFirstCard, indexOfLastCard);

	if (isLoading) {
		return (
			<div className="spinner">
				<CircularProgress />
			</div>
		);
	}
	return (
		<>
			<div id="Poster">
				<Poster event_details={eventsData[0]} />
			</div>
			<div className="eventpage-wrapper">
				<div className="eventpage-header">Upcoming Events</div>
				<section className="eventpage-cards-wrapper">
					{currentCard.map((eventCard) => (
						<EventCard key={eventCard.event_id} cardContent={eventCard} isPrevious={false} />
					))}
				</section>
				<section className="eventpage-pagination">
					<Pagination
						count={Math.ceil(eventsData.length / cardsPerPage)}
						defaultPage={1}
						size={width < 660 ? "small" : "large"}
						onChange={(event, value) => setCurrentPage(value)}
						shape="rounded"
					/>
				</section>
				<section className="previous-events">
					<Button
						className="previous-events-button"
						onClick={() => history.push(`/PreviousEvents`)}
						variant="outlined">
						View Previous Events
					</Button>
				</section>
			</div>
		</>
	);
}

export default Body;
