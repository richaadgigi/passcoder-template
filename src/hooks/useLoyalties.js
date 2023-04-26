import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { addAnnouncementList, checkoutLoyaltyPoint, issueLoyaltyPoint } from "../api/users";

const useIssueLoyaltyPoint = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingIssueLoyaltyPoint, setLoadingIssueLoyaltyPoint] = useState(false);
	const [removeIssueLoyaltyPointModal, setRemoveIssueLoyaltyPointModal] = useState(null);
	const [pid, setPID] = useState("");
	const [points, setPoints] = useState(null);

	const [errorIssueLoyaltyPoint, setErrorIssueLoyaltyPoint] = useState(null);
	const [successIssueLoyaltyPoint, setSuccessIssueLoyaltyPoint] = useState(null);

	const handlePID = (e) => { e.preventDefault(); setPID(e.target.value); };
	const handlePoints = (e) => { e.preventDefault(); setPoints(e.target.value); };

	const handleSubmitIssueLoyaltyPoint = (e) => {
		e.preventDefault();

		if (!loadingIssueLoyaltyPoint) {
			if (pid.length === 0) {
				setErrorIssueLoyaltyPoint(null);
				setSuccessIssueLoyaltyPoint(null);
				setErrorIssueLoyaltyPoint("PID is required");
				setTimeout(function () {
					setErrorIssueLoyaltyPoint(null);
				}, 2500)
			} else if (pid.length !== 6) {
				setErrorIssueLoyaltyPoint("Invalid PID");
				setTimeout(function () {
					setErrorIssueLoyaltyPoint(null);
				}, 2500)
			} else if (!points) {
				setErrorIssueLoyaltyPoint("Points is required");
				setTimeout(function () {
					setErrorIssueLoyaltyPoint(null);
				}, 2500)
			} else if (points < 1) {
				setErrorIssueLoyaltyPoint("Invalid points (minimum - 1)");
				setTimeout(function () {
					setErrorIssueLoyaltyPoint(null);
				}, 2500)
			} else {
				setLoadingIssueLoyaltyPoint(true);

				const issueLoyaltyPointRes = issueLoyaltyPoint(cookie, {
					pid,
					points: parseInt(points)
				})

				issueLoyaltyPointRes.then(res => {
					setLoadingIssueLoyaltyPoint(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorIssueLoyaltyPoint(error);
							setTimeout(function () {
								setErrorIssueLoyaltyPoint(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorIssueLoyaltyPoint(error);
							setTimeout(function () {
								setErrorIssueLoyaltyPoint(null);
							}, 2000)
						}
					} else {
						setErrorIssueLoyaltyPoint(null);
						setSuccessIssueLoyaltyPoint(`Points issued successfully!`);

						setTimeout(function () {
							setSuccessIssueLoyaltyPoint(null);
							setRemoveIssueLoyaltyPointModal(true);
							setPID(""); setPoints(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingIssueLoyaltyPoint(false);
				})

			}
		}
	};

	return {
		cookie, loadingIssueLoyaltyPoint, removeIssueLoyaltyPointModal, pid, points, errorIssueLoyaltyPoint, successIssueLoyaltyPoint,
		handlePID, handlePoints, handleSubmitIssueLoyaltyPoint, setRemoveIssueLoyaltyPointModal
	};
};

const useCheckoutLoyaltyPoint = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingCheckoutLoyaltyPoint, setLoadingCheckoutLoyaltyPoint] = useState(false);
	const [removeCheckoutLoyaltyPointModal, setRemoveCheckoutLoyaltyPointModal] = useState(null);
	const [pid, setPID] = useState("");
	const [points, setPoints] = useState(null);

	const [errorCheckoutLoyaltyPoint, setErrorCheckoutLoyaltyPoint] = useState(null);
	const [successCheckoutLoyaltyPoint, setSuccessCheckoutLoyaltyPoint] = useState(null);

	const handlePID = (e) => { e.preventDefault(); setPID(e.target.value); };
	const handlePoints = (e) => { e.preventDefault(); setPoints(e.target.value); };

	const handleSubmitCheckoutLoyaltyPoint = (e) => {
		e.preventDefault();

		if (!loadingCheckoutLoyaltyPoint) {
			if (pid.length === 0) {
				setErrorCheckoutLoyaltyPoint(null);
				setSuccessCheckoutLoyaltyPoint(null);
				setErrorCheckoutLoyaltyPoint("PID is required");
				setTimeout(function () {
					setErrorCheckoutLoyaltyPoint(null);
				}, 2500)
			} else if (pid.length !== 6) {
				setErrorCheckoutLoyaltyPoint("Invalid PID");
				setTimeout(function () {
					setErrorCheckoutLoyaltyPoint(null);
				}, 2500)
			} else if (!points) {
				setErrorCheckoutLoyaltyPoint("Points is required");
				setTimeout(function () {
					setErrorCheckoutLoyaltyPoint(null);
				}, 2500)
			} else if (points < 1) {
				setErrorCheckoutLoyaltyPoint("Invalid points (minimum - 1)");
				setTimeout(function () {
					setErrorCheckoutLoyaltyPoint(null);
				}, 2500)
			} else {
				setLoadingCheckoutLoyaltyPoint(true);

				const checkoutLoyaltyPointRes = checkoutLoyaltyPoint(cookie, {
					pid,
					points: parseInt(points)
				})

				checkoutLoyaltyPointRes.then(res => {
					setLoadingCheckoutLoyaltyPoint(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorCheckoutLoyaltyPoint(error);
							setTimeout(function () {
								setErrorCheckoutLoyaltyPoint(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorCheckoutLoyaltyPoint(error);
							setTimeout(function () {
								setErrorCheckoutLoyaltyPoint(null);
							}, 2000)
						}
					} else {
						setErrorCheckoutLoyaltyPoint(null);
						setSuccessCheckoutLoyaltyPoint(`Points checked out successfully!`);

						setTimeout(function () {
							setSuccessCheckoutLoyaltyPoint(null);
							setRemoveCheckoutLoyaltyPointModal(true);
							setPID(""); setPoints(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingCheckoutLoyaltyPoint(false);
				})

			}
		}
	};

	return {
		cookie, loadingCheckoutLoyaltyPoint, removeCheckoutLoyaltyPointModal, pid, points, errorCheckoutLoyaltyPoint, successCheckoutLoyaltyPoint,
		handlePID, handlePoints, handleSubmitCheckoutLoyaltyPoint, setRemoveCheckoutLoyaltyPointModal
	};
};

const useAnnouncementList = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingAnnouncementList, setLoadingAnnouncementList] = useState(false);
	const [removeAnnouncementListModal, setRemoveAnnouncementListModal] = useState(null);
	const [pid, setPID] = useState("");

	const [errorAnnouncementList, setErrorAnnouncementList] = useState(null);
	const [successAnnouncementList, setSuccessAnnouncementList] = useState(null);

	const handlePID = (e) => { e.preventDefault(); setPID(e.target.value); };

	const handleSubmitAnnouncementList = (e) => {
		e.preventDefault();

		if (!loadingAnnouncementList) {
			if (pid.length === 0) {
				setErrorAnnouncementList(null);
				setSuccessAnnouncementList(null);
				setErrorAnnouncementList("PID is required");
				setTimeout(function () {
					setErrorAnnouncementList(null);
				}, 2500)
			} else if (pid.length !== 6) {
				setErrorAnnouncementList("Invalid PID");
				setTimeout(function () {
					setErrorAnnouncementList(null);
				}, 2500)
			} else {
				setLoadingAnnouncementList(true);

				const addAnnouncementListRes = addAnnouncementList(cookie, {
					pid
				})

				addAnnouncementListRes.then(res => {
					setLoadingAnnouncementList(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorAnnouncementList(error);
							setTimeout(function () {
								setErrorAnnouncementList(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorAnnouncementList(error);
							setTimeout(function () {
								setErrorAnnouncementList(null);
							}, 2000)
						}
					} else {
						setErrorAnnouncementList(null);
						setSuccessAnnouncementList(`Points checked out successfully!`);

						setTimeout(function () {
							setSuccessAnnouncementList(null);
							setRemoveAnnouncementListModal(true);
							setPID("");
						}, 2500)
					}
				}).catch(err => {
					setLoadingAnnouncementList(false);
				})

			}
		}
	};

	return {
		cookie, loadingAnnouncementList, removeAnnouncementListModal, pid, errorAnnouncementList, successAnnouncementList,
		handlePID, handleSubmitAnnouncementList, setRemoveAnnouncementListModal
	};
};

export { useIssueLoyaltyPoint, useCheckoutLoyaltyPoint, useAnnouncementList };