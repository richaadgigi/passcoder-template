import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { addPartnerAnnouncement } from "../api/announcements";

const usePartnerAnnouncement = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingPartnerAnnouncement, setLoadingPartnerAnnouncement] = useState(false);
	const [removePartnerAnnouncementModal, setRemovePartnerAnnouncementModal] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const [errorPartnerAnnouncement, setErrorPartnerAnnouncement] = useState(null);
	const [successPartnerAnnouncement, setSuccessPartnerAnnouncement] = useState(null);

	const handleTitle = (e) => { e.preventDefault(); setTitle(e.target.value); };
	const handleDescription = (contents) => { setDescription(contents); };

	const handleSubmitPartnerAnnouncement = (e) => {
		e.preventDefault();

		if (!loadingPartnerAnnouncement) {
			if (title.length < 3) {
				setErrorPartnerAnnouncement(null);
				setSuccessPartnerAnnouncement(null);
				setErrorPartnerAnnouncement("Title is required | Min character - 3");
				setTimeout(function () {
					setErrorPartnerAnnouncement(null);
				}, 2500)
			} else if (title.length > 50) {
				setErrorPartnerAnnouncement("Invalid Title | Max character - 50");
				setTimeout(function () {
					setErrorPartnerAnnouncement(null);
				}, 2500)
			} else if (description.length < 3) {
				setErrorPartnerAnnouncement("Description is required | Min character - 3");
				setTimeout(function () {
					setErrorPartnerAnnouncement(null);
				}, 2500)
			} else if (description.length > 65535) {
				setErrorPartnerAnnouncement("Invalid Description | Max length reached");
				setTimeout(function () {
					setErrorPartnerAnnouncement(null);
				}, 2500)
			} else {
				setLoadingPartnerAnnouncement(true);

				const addPartnerAnnouncementRes = addPartnerAnnouncement(cookie, {
					title,
					description
				})

				addPartnerAnnouncementRes.then(res => {
					setLoadingPartnerAnnouncement(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorPartnerAnnouncement(error);
							setTimeout(function () {
								setErrorPartnerAnnouncement(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorPartnerAnnouncement(error);
							setTimeout(function () {
								setErrorPartnerAnnouncement(null);
							}, 2000)
						}
					} else {
						setErrorPartnerAnnouncement(null);
						setSuccessPartnerAnnouncement(`Announcement created successfully!`);

						setTimeout(function () {
							setSuccessPartnerAnnouncement(null);
							setRemovePartnerAnnouncementModal(true);
							setTitle(""); setDescription("");
						}, 2500)
					}
				}).catch(err => {
					setLoadingPartnerAnnouncement(false);
				})

			}
		}
	};

	return {
		cookie, loadingPartnerAnnouncement, removePartnerAnnouncementModal, title, description, errorPartnerAnnouncement, successPartnerAnnouncement,
		handleTitle, handleDescription, handleSubmitPartnerAnnouncement, setRemovePartnerAnnouncementModal
	};
};

export { usePartnerAnnouncement };