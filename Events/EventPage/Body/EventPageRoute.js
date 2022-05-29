import React from "react";
import Header from "../../../MainPage/Header/Header";
import Footer from "../../../MainPage/Footer/Footer";
import Stories from "../../../MainPage/Stories/Stories";
import StartTrial from "../../../MainPage/StartTrial/StartTrial";
import Body from "./Body";
import EventDetailsRoute from "../../EventDetails/Body/EventDetailsRoute";
import { useRouteMatch } from "react-router-dom";

function EventPageRoute() {
	let { path } = useRouteMatch();

	return (
		<div className="landing-page-wrapper">
			<div className="header-sticky">
				<Header />
			</div>
			{path === "/Events" ? <Body /> : <EventDetailsRoute />}
			<div id="StartTrial">
				<StartTrial />
			</div>
			<div className="">
				<Footer />
			</div>
		</div>
	);
}

export default EventPageRoute;
