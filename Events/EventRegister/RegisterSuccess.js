import React from "react";
import { useHistory } from "react-router-dom";
import successImage from "../../../Resources/Images/success.png";
import { Button } from "@mui/material";

function RegisterSuccess(props) {
	return (
		<div className="register-success-modal-box">
			<div className="register-success-container">
				<img className="register-success-image" alt="register_success_img" src={successImage} />
				<div className="register-success-congratulations">Congratulations!</div>
				<div className="register-success-p">
					You have been registered for the Event. Please keep checking your email for the joining link.
				</div>
				<Button
					onClick={() => window.open('https://renaissance.programmingpathshala.com/signup', '_blank')}
					className="register-success-button"
					variant="contained">
					Start Your 7 Days Free Trial
				</Button>
				<div className="register-success-footer">Start Learning Now!</div>
			</div>
		</div>
	);
}

export default RegisterSuccess;
