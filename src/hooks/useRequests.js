import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { offerAuthenticateUser } from "../api/requests";

const useOfferAuthenticateUser = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingOfferAuthenticateUser, setLoadingOfferAuthenticateUser] = useState(false);
	const [showOfferAuthenticateUserModal, setShowOfferAuthenticateUserModal] = useState(null);
	const [pid, setPID] = useState("");
	const [offerUniqueId, setOfferUniqueId] = useState("");
	const [authenticatedUserDetails, setAuthenticatedUserDetails] = useState(null);

	const [errorOfferAuthenticateUser, setErrorOfferAuthenticateUser] = useState(null);
	const [successOfferAuthenticateUser, setSuccessOfferAuthenticateUser] = useState(null);

	const handlePID = (e) => { e.preventDefault(); setPID(e.target.value.toLocaleUpperCase()); };
	const handleOfferUniqueId = (e) => { e.preventDefault(); setOfferUniqueId(e.target.value); };

	const handleSubmitOfferAuthenticateUser = (e) => {
		e.preventDefault();

		if (!loadingOfferAuthenticateUser) {
			if (pid.length === 0) {
				setErrorOfferAuthenticateUser(null);
				setSuccessOfferAuthenticateUser(null);
				setErrorOfferAuthenticateUser("PID is required");
				setTimeout(function () {
					setErrorOfferAuthenticateUser(null);
				}, 2500)
			} else if (pid.length !== 6) {
				setErrorOfferAuthenticateUser("Invalid PID");
				setTimeout(function () {
					setErrorOfferAuthenticateUser(null);
				}, 2500)
			} else if (offerUniqueId.length === 0) {
				setErrorOfferAuthenticateUser("Offer is required");
				setTimeout(function () {
					setErrorOfferAuthenticateUser(null);
				}, 2500)
			} else {
				setLoadingOfferAuthenticateUser(true);

				const offerAuthenticateUserRes = offerAuthenticateUser(cookie, {
					pid,
					offer_unique_id: offerUniqueId
				})

				offerAuthenticateUserRes.then(res => {
					setLoadingOfferAuthenticateUser(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorOfferAuthenticateUser(error);
							setTimeout(function () {
								setErrorOfferAuthenticateUser(null);
							}, 3500)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorOfferAuthenticateUser(error);
							setTimeout(function () {
								setErrorOfferAuthenticateUser(null);
							}, 3500)
						}
					} else {
						setErrorOfferAuthenticateUser(null);
						setSuccessOfferAuthenticateUser(res.data.message);
						setAuthenticatedUserDetails(res.data.data);

						setTimeout(function () {
							setSuccessOfferAuthenticateUser(null);
							setShowOfferAuthenticateUserModal(true);
							setPID(""); setOfferUniqueId("");
						}, 2500)
					}
				}).catch(err => {
					setLoadingOfferAuthenticateUser(false);
				})

			}
		}
	};

	return {
		cookie, loadingOfferAuthenticateUser, showOfferAuthenticateUserModal, pid, errorOfferAuthenticateUser, successOfferAuthenticateUser,
		handlePID, handleSubmitOfferAuthenticateUser, setShowOfferAuthenticateUserModal, offerUniqueId, setOfferUniqueId, handleOfferUniqueId, 
		setAuthenticatedUserDetails, authenticatedUserDetails
	};
};

export { useOfferAuthenticateUser };