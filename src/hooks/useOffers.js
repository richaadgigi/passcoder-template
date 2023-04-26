import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { addPartnerOffer, deleteOffer, updateOfferCriteria, updateOfferDetails, updateOfferLimit } from "../api/offers";

const useAddOffer = () => {

	const { cookie } = useCookie(config.token, "");

	const [loading, setLoading] = useState(false);
	const [removeAddOfferModal, setRemoveAddOfferModal] = useState(null);
	const [name, setName] = useState("");
	const [discount, setDiscount] = useState(null);
	const [single, setSingle] = useState(false);
	const [points, setPoints] = useState(null);
	const [star, setStar] = useState(null);
	const [description, setDescription] = useState("");
	const [offerLimit, setOfferLimit] = useState(null);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);

	const [errorAddOffer, setErrorAddOffer] = useState(null);
	const [successAddOffer, setSuccessAddOffer] = useState(null);

	const handleName = (e) => { e.preventDefault(); setName(e.target.value); };
	const handleDiscount = (e) => { e.preventDefault(); setDiscount(e.target.value); };
	const handleSingle = (e) => { e.preventDefault(); setSingle(!single); };
	const handlePoints = (e) => { e.preventDefault(); setPoints(e.target.value); };
	const handleStar = (e) => { e.preventDefault(); setStar(e.target.value); };
	const handleDescription = (e) => { e.preventDefault(); setDescription(e.target.value) };
	const handleOfferLimit = (e) => { e.preventDefault(); setOfferLimit(e.target.value); };
	const handleStart = (e) => { e.preventDefault(); setStart(e.target.value); };
	const handleEnd = (e) => { e.preventDefault(); setEnd(e.target.value); };

	const validateStart = (start) => {
		const d = new Date(start);
		const today = new Date();
		today.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		if (d === "Invalid Date") return false;
		if (today.getTime() > d.getTime()) return false;
		return true;
	};

	const validateEnd = (_start, _end) => {
		const start = new Date(_start);
		start.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		const end = new Date(_end);
		end.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		if (start === "Invalid Date") return false;
		if (end === "Invalid Date") return false;
		if (start.getTime() >= end.getTime()) return false;
		return true;
	};

	const return_start = (start) => {
		if (start === "") return undefined;
		let _start = start.split("T");
		return _start[0] + " " + _start[1];
	};

	const return_end = (end) => {
		if (end === "") return undefined;
		let _end = end.split("T");
		return _end[0] + " " + _end[1];
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!loading) {
			if (name.length < 3) {
				setErrorAddOffer(null);
				setSuccessAddOffer(null);
				setErrorAddOffer("Name is required | Min character - 3");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (name.length > 50) {
				setErrorAddOffer("Invalid Name | Max character - 50");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (!discount) {
				setErrorAddOffer("Discount is required");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (discount < 1 || discount > 100) {
				setErrorAddOffer("Invalid discount (1 - 100%)");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (!points) {
				setErrorAddOffer("Points is required");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (points < 1) {
				setErrorAddOffer("Invalid points (minimum - 1)");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (!star) {
				setErrorAddOffer("Star is required");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (star < 1 || star > 5) {
				setErrorAddOffer("Invalid star (1 - 5)");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (offerLimit && offerLimit < 1) {
				setErrorAddOffer("Invalid offer limit (minimum - 1)");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (description.length < 3) {
				setErrorAddOffer("Description is required | Min character - 3");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (description.length > 1500) {
				setErrorAddOffer("Invalid Description | Max length reached");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (start && !validateStart(start)) {
				setErrorAddOffer("Invalid Start datetime (note: Timezone +01:00)");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else if (end && !validateEnd(start, end)) {
				setErrorAddOffer("Invalid End datetime (note: Timezone +01:00)");
				setTimeout(function () {
					setErrorAddOffer(null);
				}, 2500)
			} else {
				setLoading(true);

				const addOfferRes = addPartnerOffer(cookie, {
					name,
					discount: parseInt(discount),
					single,
					points: parseInt(points),
					star: parseInt(star),
					description: description === null ? undefined : description,
					offer_limit: offerLimit === null ? undefined : parseInt(offerLimit),
					start: start === null ? undefined : return_start(start),
					end: end === null ? undefined : return_end(end)
				})

				addOfferRes.then(res => {
					setLoading(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorAddOffer(error);
							setTimeout(function () {
								setErrorAddOffer(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorAddOffer(error);
							setTimeout(function () {
								setErrorAddOffer(null);
							}, 2000)
						}
					} else {
						setErrorAddOffer(null);
						setSuccessAddOffer(`Offer added successfully!`);

						setTimeout(function () {
							setSuccessAddOffer(null);
							setRemoveAddOfferModal(true);
							setName(""); setSingle(false); setDiscount(null); setPoints(null); setStar(null); setOfferLimit(null); setStart(""); setEnd(""); setDescription("");
						}, 2500)
					}
				}).catch(err => {
					setLoading(false);
				})

			}
		}
	};

	return {
		cookie, loading, removeAddOfferModal, name, discount, single, points, star, description, offerLimit, start, end, errorAddOffer, successAddOffer,
		handleName, handleSingle, handleDiscount, handlePoints, handleStar, handleDescription, handleOfferLimit, handleStart, handleEnd, handleSubmit, 
		setRemoveAddOfferModal
	};
};

const useEditOffer = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingEditOffer, setLoadingEditOffer] = useState(false);
	const [removeEditOfferModal, setRemoveEditOfferModal] = useState(null);
	const [nameEdit, setNameEdit] = useState("");
	const [discountEdit, setDiscountEdit] = useState(null);
	const [singleEdit, setSingleEdit] = useState(false);
	const [descriptionEdit, setDescriptionEdit] = useState("");
	const [startEdit, setStartEdit] = useState(null);
	const [endEdit, setEndEdit] = useState(null);

	const [offerLimitEdit, setOfferLimitEdit] = useState(null);

	const [pointsEdit, setPointsEdit] = useState(null);
	const [starEdit, setStarEdit] = useState(null);

	const [editOfferUniqueId, setEditOfferUniqueId] = useState(null);

	const [errorEditOffer, setErrorEditOffer] = useState(null);
	const [successEditOffer, setSuccessEditOffer] = useState(null);

	const handleNameEdit = (e) => { e.preventDefault(); setNameEdit(e.target.value); };
	const handleDiscountEdit = (e) => { e.preventDefault(); setDiscountEdit(e.target.value); };
	const handleSingleEdit = (e) => { e.preventDefault(); setSingleEdit(!singleEdit); };
	const handleDescriptionEdit = (e) => { e.preventDefault(); setDescriptionEdit(e.target.value) };
	const handleStartEdit = (e) => { e.preventDefault(); setStartEdit(e.target.value); };
	const handleEndEdit = (e) => { e.preventDefault(); setEndEdit(e.target.value); };

	const handleOfferLimitEdit = (e) => { e.preventDefault(); setOfferLimitEdit(e.target.value); };

	const handlePointsEdit = (e) => { e.preventDefault(); setPointsEdit(e.target.value); };
	const handleStarEdit = (e) => { e.preventDefault(); setStarEdit(e.target.value); };

	const validateStart = (start) => {
		const d = new Date(start);
		const today = new Date();
		today.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		if (d === "Invalid Date") return false;
		if (today.getTime() > d.getTime()) return false;
		return true;
	};

	const validateEnd = (_start, _end) => {
		const start = new Date(_start);
		start.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		const end = new Date(_end);
		end.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		if (start === "Invalid Date") return false;
		if (end === "Invalid Date") return false;
		if (start.getTime() >= end.getTime()) return false;
		return true;
	};

	const return_start = (start) => {
		if (start === "") return undefined;
		let _start = start.split("T");
		return _start[0] + " " + _start[1];
	};

	const return_end = (end) => {
		if (end === "") return undefined;
		let _end = end.split("T");
		return _end[0] + " " + _end[1];
	};

	const handleEditOfferDetails = (e) => {
		e.preventDefault();

		if (!loadingEditOffer) {
			if (nameEdit.length < 3) {
				setErrorEditOffer(null);
				setSuccessEditOffer(null);
				setErrorEditOffer("Name is required | Min character - 3");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (nameEdit.length > 50) {
				setErrorEditOffer("Invalid Name | Max character - 50");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (!discountEdit) {
				setErrorEditOffer("Discount is required");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (discountEdit < 1 || discountEdit > 100) {
				setErrorEditOffer("Invalid discount (1 - 100%)");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (descriptionEdit.length < 3) {
				setErrorEditOffer("Description is required | Min character - 3");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (descriptionEdit.length > 1500) {
				setErrorEditOffer("Invalid Description | Max length reached");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (startEdit && !validateStart(startEdit)) {
				setErrorEditOffer("Invalid Start datetime (note: Timezone +01:00)");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (endEdit && !validateEnd(startEdit, endEdit)) {
				setErrorEditOffer("Invalid End datetime (note: Timezone +01:00)");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else {
				setLoadingEditOffer(true);

				const editOfferDetailsRes = updateOfferDetails(cookie, {
					unique_id: editOfferUniqueId,
					name: nameEdit,
					discount: parseInt(discountEdit),
					single: singleEdit,
					description: descriptionEdit === null ? undefined : descriptionEdit,
					start: startEdit === null ? undefined : return_start(startEdit),
					end: endEdit === null ? undefined : return_end(endEdit)
				})

				editOfferDetailsRes.then(res => {
					setLoadingEditOffer(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorEditOffer(error);
							setTimeout(function () {
								setErrorEditOffer(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorEditOffer(error);
							setTimeout(function () {
								setErrorEditOffer(null);
							}, 2000)
						}
					} else {
						setErrorEditOffer(null);
						setSuccessEditOffer(`Offer details edited successfully!`);

						setTimeout(function () {
							setSuccessEditOffer(null);
							setRemoveEditOfferModal(true);
							setEditOfferUniqueId(null);
							setNameEdit(""); setSingleEdit(false); setDiscountEdit(null); setStartEdit(""); setEndEdit(""); setDescriptionEdit("");
						}, 2500)
					}
				}).catch(err => {
					setLoadingEditOffer(false);
				})

			}
		}
	};

	const handleEditOfferLimit = (e) => {
		e.preventDefault();

		if (!loadingEditOffer) {
			if (offerLimitEdit && offerLimitEdit < 1) {
				setErrorEditOffer(null);
				setSuccessEditOffer(null);
				setErrorEditOffer("Invalid offer limit (minimum - 1)");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else {
				setLoadingEditOffer(true);

				const editOfferLimitRes = updateOfferLimit(cookie, {
					unique_id: editOfferUniqueId,
					offer_limit: offerLimitEdit === null ? undefined : parseInt(offerLimitEdit)
				})

				editOfferLimitRes.then(res => {
					setLoadingEditOffer(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorEditOffer(error);
							setTimeout(function () {
								setErrorEditOffer(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorEditOffer(error);
							setTimeout(function () {
								setErrorEditOffer(null);
							}, 2000)
						}
					} else {
						setErrorEditOffer(null);
						setSuccessEditOffer(`Offer limit edited successfully!`);

						setTimeout(function () {
							setSuccessEditOffer(null);
							setRemoveEditOfferModal(true);
							setEditOfferUniqueId(null);
							setOfferLimitEdit(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingEditOffer(false);
				})

			}
		}
	};

	const handleEditOfferCriteria = (e) => {
		e.preventDefault();

		if (!loadingEditOffer) {
			if (!pointsEdit) {
				setErrorEditOffer(null);
				setSuccessEditOffer(null);
				setErrorEditOffer("Points is required");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (pointsEdit < 1) {
				setErrorEditOffer("Invalid points (minimum - 1)");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (!starEdit) {
				setErrorEditOffer("Star is required");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else if (starEdit < 1 || starEdit > 5) {
				setErrorEditOffer("Invalid star (1 - 5)");
				setTimeout(function () {
					setErrorEditOffer(null);
				}, 2500)
			} else {
				setLoadingEditOffer(true);

				const editOfferCriteriaRes = updateOfferCriteria(cookie, {
					unique_id: editOfferUniqueId,
					points: parseInt(pointsEdit),
					star: parseInt(starEdit)
				})

				editOfferCriteriaRes.then(res => {
					setLoadingEditOffer(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorEditOffer(error);
							setTimeout(function () {
								setErrorEditOffer(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorEditOffer(error);
							setTimeout(function () {
								setErrorEditOffer(null);
							}, 2000)
						}
					} else {
						setErrorEditOffer(null);
						setSuccessEditOffer(`Offer criteria edited successfully!`);

						setTimeout(function () {
							setSuccessEditOffer(null);
							setRemoveEditOfferModal(true);
							setEditOfferUniqueId(null);
							setOfferLimitEdit(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingEditOffer(false);
				})

			}
		}
	};

	return {
		cookie, nameEdit, discountEdit, singleEdit, descriptionEdit, startEdit, endEdit, offerLimitEdit, pointsEdit, starEdit, 
		loadingEditOffer, removeEditOfferModal, errorEditOffer, successEditOffer, setRemoveEditOfferModal, setEditOfferUniqueId, editOfferUniqueId, 
		handleNameEdit, handleSingleEdit, handleDiscountEdit, handleDescriptionEdit, handleStartEdit, handleEndEdit, handleOfferLimitEdit, handlePointsEdit, handleStarEdit, 
		setNameEdit, setDiscountEdit, setSingleEdit, setDescriptionEdit, setStartEdit, setEndEdit, setOfferLimitEdit, setPointsEdit, setStarEdit, 
		handleEditOfferDetails, handleEditOfferLimit, handleEditOfferCriteria, 
	};
};

const useDeleteOffer = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingDeleteOffer, setLoadingDeleteOffer] = useState(false);
	const [removeDeleteOfferModal, setRemoveDeleteOfferModal] = useState(null);
	const [deleteOfferUniqueId, setDeleteOfferUniqueId] = useState(null);

	const [errorDeleteOffer, setErrorDeleteOffer] = useState(null);
	const [successDeleteOffer, setSuccessDeleteOffer] = useState(null);

	const handleDeleteOffer = () => {

		if (!loadingDeleteOffer) {
			if (!deleteOfferUniqueId) {
				setErrorDeleteOffer(null);
				setSuccessDeleteOffer(null);
				setErrorDeleteOffer("Unique ID is required");
				setTimeout(function () {
					setErrorDeleteOffer(null);
				}, 2500)
			} else {
				setLoadingDeleteOffer(true);

				const deleteOfferRes = deleteOffer(cookie, {
					unique_id: deleteOfferUniqueId
				})

				deleteOfferRes.then(res => {
					setLoadingDeleteOffer(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorDeleteOffer(error);
							setTimeout(function () {
								setErrorDeleteOffer(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorDeleteOffer(error);
							setTimeout(function () {
								setErrorDeleteOffer(null);
							}, 2000)
						}
					} else {
						setErrorDeleteOffer(null);
						setSuccessDeleteOffer(`Offer deleted successfully!`);

						setTimeout(function () {
							setSuccessDeleteOffer(null);
							setRemoveDeleteOfferModal(true);
							setDeleteOfferUniqueId(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingDeleteOffer(false);
				})

			}
		}
	};

	return {
		cookie, loadingDeleteOffer, removeDeleteOfferModal, deleteOfferUniqueId, errorDeleteOffer, successDeleteOffer,
		handleDeleteOffer, setRemoveDeleteOfferModal, setDeleteOfferUniqueId
	};
};

export { useAddOffer, useEditOffer, useDeleteOffer };