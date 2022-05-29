import React from "react";
import Header from "../../MainPage/Header/Header";
import Footer from "../../MainPage/Footer/Footer";
import StartTrial from "../../MainPage/StartTrial/StartTrial";
import { useState, useEffect } from "react";
import axios from "axios";
import { MISC_URL } from "../../../Constants/UrlConstants";
import { useHistory } from "react-router-dom";
import EventCard from "../EventPage/EventCard/EventCard";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles/PreviousEvents.css";

function PreviousEvents() {
	const [prevEventDetails, setPrevEventDetails] = useState([]);
	const [isLoading, setLoading] = useState(true);

	const history = useHistory();
	const width = window.innerWidth;

	// get current page events
	const cardsPerPage = 4;
	const [currentPage, setCurrentPage] = useState(1);
	const indexOfLastCard = currentPage * cardsPerPage;
	const indexOfFirstCard = indexOfLastCard - cardsPerPage;
	const currentCards = prevEventDetails.slice(indexOfFirstCard, indexOfLastCard);

	useEffect(() => {
		axios
			.get(MISC_URL + "/getPreviousEvents")
			.then((eventData) => {
				setPrevEventDetails(eventData.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});

		return () => setPrevEventDetails([]);
	}, []);

	if (isLoading) {
		return (
			<div className="spinner">
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<Header />

			<div className="previousevents-wrapper">
				<h4 className="previousevents-header">Previous Events</h4>

				<section className="previousevents-cards-wrapper">
					{currentCards.map((eventCard) => (
						<EventCard cardContent={eventCard} isPrevious={true} />
					))}
				</section>

				<section className="previousevents-pagination">
					<Pagination
						count={Math.ceil(prevEventDetails.length / cardsPerPage)}
						defaultPage={1}
						size={width < 660 ? "small" : "large"}
						onChange={(event, value) => setCurrentPage(value)}
						shape="rounded"
					/>
				</section>

				<div className="upcoming-events">
					<Button
						className="upcoming-events-button"
						onClick={() => history.push(`/Events`)}
						variant="outlined">
						View Upcoming Events
					</Button>
				</div>
			</div>

			<StartTrial />
			<Footer />
		</>
	);
}

export default PreviousEvents;
