import "./styles/ShareEvent.css";
import React from "react";
import ModalEventCard from "./ModalEventCard";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

function Modal_window(props) {
	const handleClickOnLinkedinButton = () => {
		window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${props.event_url}`);
	};

	const handleClickOnFacebookButton = () => {
		window.open(`https://www.facebook.com/sharer.php?u=${props.event_url}`);
	};

	return (
		<div>
			<CloseIcon className="modal-close-icon" onClick={props.handleClickOnModal} />

			<div className="main">
				<div className="modal-header">
					<CloseIcon className="modal-close-button" onClick={props.handleClickOnModal} />
				</div>

				<ModalEventCard cardContent={props.event_details} event_image={props.event_image} />

				<div className="modal-ask-share">
					<>Share this Event with your Social Community</>
				</div>
				<div className="modal-share-buttons">
					<button className="linkedin btn" onClick={handleClickOnLinkedinButton}>
						in
					</button>
					<button className="facebook btn" onClick={handleClickOnFacebookButton}>
						f
					</button>
				</div>
				<div className="modal-copy-link">
					<p>or copy link</p>
					<div className="modal-url-box">
						<p>{props.event_url}</p>
						<Button
							className="modal-copy-link-button"
							onClick={() => {
								navigator.clipboard.writeText(`${props.event_url}`);
							}}>
							Copy
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal_window;
