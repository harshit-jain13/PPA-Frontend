import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MISC_URL } from "../../../Constants/UrlConstants";
import { Button } from "@mui/material";
import { validateEmail, validatePhonenumber } from "../../../Utilities/CommonUtility/CommonUtility";
import { logoSvg } from "../../../Constants/MainPageConstants/HeaderConstants";
import RegisterSuccess from "./RegisterSuccess";
import Vectormail from "../../../Resources/Images/Vectormail.png";
import Vectorphone from "../../../Resources/Images/Vectorphone.png";
import formImage from "../../../Resources/Images/registerformimage.png";
import desktopBackImage from "../../../Resources/Images/registerFormBackgroundImage.png";
import mobileBackImage from "../../../Resources/Images/registerFormBackImageMobile.png";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import "./styles/EventRegister.css";

function EventRegister(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [organisation, setOrganisation] = useState("");
	const [form, setForm] = useState(true);
	const [title, setTitle] = useState("");
	const [namePresent, setNamePresent] = useState(true);
	const [emailValid, setEmailValid] = useState(true);
	const [phoneValid, setPhoneValid] = useState(true);
	const [alreadyRegistered, setAlreadyRegistered] = useState(false);
	const [registering, setRegistering] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const imageUrl = windowWidth > 700 ? desktopBackImage : mobileBackImage;
	const { e_id } = useParams();
	const history = useHistory();

	useEffect(() => {
		const handleWindowResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	useEffect(() => {
		axios
			.get(MISC_URL + "/getEventTitle", {
				params: {
					event_id: e_id,
				},
			})
			.then((response) => {
				setTitle(`Topic: ${response.data[0].event_title}!`);
			})
			.catch((error) => {
				console.log(error);
			});
		return () => {
			setTitle("");
		};
	}, [e_id]);

	const handleSubmit = () => {
		setAlreadyRegistered(false);
		setRegistering(true);

		if (name === "") {
			setNamePresent(false);
			setRegistering(false);
			return;
		}
		setNamePresent(true);

		if (!validateEmail(email)) {
			setEmailValid(false);
			setRegistering(false);
			return;
		}
		setEmailValid(true);

		if(!validatePhonenumber(phone)){
			setPhoneValid(false);
			setRegistering(false);
			return;
		}
		axios
			.post(MISC_URL + "/postEventParticipantDetails", {
				name: name,
				email: email,
				phone_number: phone,
				organisation: organisation,
				event_id: e_id,
			})
			.then((response) => {
				setForm(false);
				setRegistering(false);
			})
			.catch((error) => {
				if (error.response.status === 403) {
					setAlreadyRegistered(true);
					setEmailValid(true);
					setPhoneValid(true);
					setRegistering(false);
					setName("");
					setEmail("");
					setPhone("");
					setOrganisation("");
				}
				return error;
			});
	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePhoneChange = (e) => {
		setPhone(e.target.value);
	};

	const handleOrgChange = (e) => {
		setOrganisation(e.target.value);
	};

	const getNavbar = () => {
		return (
			<div className="eventregister-header">
				<div className="eventregister-header-logo">
					<div className="eventregister-header-logo-brandlogo">{logoSvg}</div>
					<div className="eventregister-header-logo-brandname">Programming Pathshala</div>
				</div>
				<div className="eventregister-header-contact">
					<div className="eventregister-contact">
						<img alt="email_icon" src={Vectormail} />
						<p>support@programmingpathshala.com</p>
					</div>
					<div className="eventregister-contact">
						<img alt="phone_icon" src={Vectorphone} />
						<p>+91 98717 23495</p>
					</div>
				</div>
			</div>
		);
	};

	const getEventTitle = () => {
		return <div className="eventregister-title">{title}</div>;
	};

	const getForm = () => {
		return (
			<form className="eventregister-form">
				{getNameField()}
				{getEmailField()}
				{getPhoneField()}
				{getOrgField()}
				{getRegisterButton()}
			</form>
		);
	};

	const getNameField = () => {
		return (
			<>
				<div className="eventregister-label">Name</div>
				<input id={namePresent ? "" : "red-box"} type="text" value={name} onChange={handleNameChange}></input>
				{namePresent ? <></> : <div className="eventregister-invalid-warning">Please fill the details!</div>}
			</>
		);
	};

	const getEmailField = () => {
		return (
			<>
				<div className="eventregister-label">Email</div>
				<input id={emailValid ? "" : "red-box"} type="email" value={email} onChange={handleEmailChange}></input>
				{emailValid ? (
					<></>
				) : (
					<div className="eventregister-invalid-warning">Please fill a valid email id!</div>
				)}
			</>
		);
	};

	const getPhoneField = () => {
		return (
			<>
				<div className="eventregister-label">Phone</div>
				<input id={phoneValid ? "" : "red-box"} type="text" value={phone} onChange={handlePhoneChange}></input>
				{phoneValid ? (
					<></>
				) : (
					<div className="eventregister-invalid-warning">Please fill a valid phone number!</div>
				)}
			</>
		);
	};

	const getOrgField = () => {
		return (
			<>
				<div className="eventregister-label">Organisation/College Name</div>
				<input type="text" value={organisation} onChange={handleOrgChange}></input>
			</>
		);
	};

	const getRegisterButton = () => {
		return (
			<div className="eventregister-form-button-div">
				<Button className="eventregister-form-button" variant="contained" onClick={handleSubmit}>
					{registering ? <div className="dot-pulse"></div> : "Register"}
				</Button>
			</div>
		);
	};

	const getAlreadyRegisterdCondition = () => {
		return (
			<>
				{alreadyRegistered ? (
					<div className="eventregister-invalid-warning already-registered">
						You are already registered for the event!
					</div>
				) : (
					<></>
				)}
			</>
		);
	};

	const goToEventPage = () => {
		return history.push("/Events")
	}

	return (
		<>
			{getNavbar()}
			<div className="eventregister-background-image" style={{ backgroundImage: `url(${imageUrl})` }}></div>
			{form ? (
				<div className="Modal-box">
					<CloseIcon className="eventregistor-close-button" onClick={goToEventPage}/>
					{getEventTitle()}
					<div className="eventregister-form-container">
						<img alt="modal_icon" className="eventregister-form-image" src={formImage} />
						{getForm()}
					</div>
					{getAlreadyRegisterdCondition()}
				</div>
			) : (
				<RegisterSuccess />
			)}
		</>
	);
}

export default EventRegister;
