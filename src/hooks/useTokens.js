import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { addPlatformToken, deleteToken, getPlatformToken, getPlatformTokens, updateToken, updateTokenDetails } from "../api/tokens";

const useAddToken = () => {

	const [cookie] = useCookie(config.token, "");

	const [loading, setLoading] = useState(false);
	const [removeAddTokenModal, setRemoveAddTokenModal] = useState(null);
	const [alias, setAlias] = useState("");
	const [valid, setValid] = useState(true);
	const [expiration, setExpiration] = useState(null);

	const [errorAddToken, setErrorAddToken] = useState(null);
	const [successAddToken, setSuccessAddToken] = useState(null);

	const handleAlias = (e) => { e.preventDefault(); setAlias(e.target.value); };
	const handleValid = (e) => { e.preventDefault(); setValid(!valid); };
	const handleExpiration = (e) => { e.preventDefault(); setExpiration(e.target.value); };

	const validateExpiration = (expiration) => {
		const d = new Date(expiration);
		const today = new Date();
		today.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		if (d === "Invalid Date") return false;
		if (today.getTime() > d.getTime()) return false;
		return true;
	};

	const return_expiration = (expiration) => {
		if (expiration === "") return undefined;
		let _expiration = expiration.split("T");
		return _expiration[0] + " " + _expiration[1];
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!loading) {
			if (alias.length < 3) {
				setErrorAddToken(null);
				setSuccessAddToken(null);
				setErrorAddToken("Alias is required | Min character - 3");
				setTimeout(function () {
					setErrorAddToken(null);
				}, 2500)
			} else if (alias.length > 150) {
				setErrorAddToken("Invalid Alias | Max character - 150");
				setTimeout(function () {
					setErrorAddToken(null);
				}, 2500)
			} else if (expiration && !validateExpiration(expiration)) {
				setErrorAddToken("Invalid Expiration datetime (note: Timezone +01:00)");
				setTimeout(function () {
					setErrorAddToken(null);
				}, 2500)
			} else {
				setLoading(true);

				const addTokenRes = addPlatformToken(cookie, {
					alias,
					valid,
					expiration: expiration === null ? undefined : return_expiration(expiration)
				})

				addTokenRes.then(res => {
					setLoading(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorAddToken(error);
							setTimeout(function () {
								setErrorAddToken(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorAddToken(error);
							setTimeout(function () {
								setErrorAddToken(null);
							}, 2000)
						}
					} else {
						setErrorAddToken(null);
						setSuccessAddToken(`Member added successfully!`);

						setTimeout(function () {
							setSuccessAddToken(null);
							setRemoveAddTokenModal(true);
							setAlias("");
							setValid(true);
							setExpiration("");
						}, 2500)
					}
				}).catch(err => {
					setLoading(false);
				})

			}
		}
	};

	return {
		cookie, loading, removeAddTokenModal, alias, valid, expiration, errorAddToken, successAddToken,
		handleAlias, handleValid, handleExpiration, handleSubmit, setRemoveAddTokenModal
	};
};

const useResetToken = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingResetToken, setLoadingResetToken] = useState(false);
	const [removeResetTokenModal, setRemoveResetTokenModal] = useState(null);
	const [resetTokenUniqueId, setResetTokenUniqueId] = useState(null);

	const [errorResetToken, setErrorResetToken] = useState(null);
	const [successResetToken, setSuccessResetToken] = useState(null);

	const handleResetToken = () => {

		if (!loadingResetToken) {
			if (!resetTokenUniqueId) {
				setErrorResetToken(null);
				setSuccessResetToken(null);
				setErrorResetToken("Unique ID is required");
				setTimeout(function () {
					setErrorResetToken(null);
				}, 2500)
			} else {
				setLoadingResetToken(true);

				const resetTokenRes = updateToken(cookie, {
					unique_id: resetTokenUniqueId
				})

				resetTokenRes.then(res => {
					setLoadingResetToken(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorResetToken(error);
							setTimeout(function () {
								setErrorResetToken(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorResetToken(error);
							setTimeout(function () {
								setErrorResetToken(null);
							}, 2000)
						}
					} else {
						setErrorResetToken(null);
						setSuccessResetToken(`Token reset successful!`);

						setTimeout(function () {
							setSuccessResetToken(null);
							setRemoveResetTokenModal(true);
							setResetTokenUniqueId(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingResetToken(false);
				})

			}
		}
	};

	return {
		cookie, loadingResetToken, removeResetTokenModal, resetTokenUniqueId, errorResetToken, successResetToken,
		handleResetToken, setRemoveResetTokenModal, setResetTokenUniqueId
	};
};

const useEditToken = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingEditToken, setLoadingEditToken] = useState(false);
	const [removeEditTokenModal, setRemoveEditTokenModal] = useState(null);
	const [aliasEdit, setAliasEdit] = useState(null);
	const [validEdit, setValidEdit] = useState(null);
	const [expirationEdit, setExpirationEdit] = useState(null);
	const [editTokenUniqueId, setEditTokenUniqueId] = useState(null);

	const [errorEditToken, setErrorEditToken] = useState(null);
	const [successEditToken, setSuccessEditToken] = useState(null);

	const handleAliasEdit = (e) => { e.preventDefault(); setAliasEdit(e.target.value); };
	const handleValidEdit = (e) => { e.preventDefault(); setValidEdit(!validEdit); };
	const handleExpirationEdit = (e) => { e.preventDefault(); setExpirationEdit(e.target.value); };

	const return_expiration = (expirationEdit) => {
		if (expirationEdit === "") return undefined;
		let _expiration = expirationEdit.split("T");
		return _expiration[0] + " " + _expiration[1];
	};

	const validateExpiration = (expirationEdit) => {
		const d = new Date(expirationEdit);
		const today = new Date();
		today.toLocaleString('en-US', { timeZone: 'Africa/Lagos' });
		if (d === "Invalid Date") return false;
		if (today.getTime() > d.getTime()) return false;
		return true;
	};

	const handleEditToken = (e) => {
		e.preventDefault();

		if (!loadingEditToken) {
			if (aliasEdit.length < 3) {
				setErrorEditToken(null);
				setSuccessEditToken(null);
				setErrorEditToken("Alias is required | Min character - 3");
				setTimeout(function () {
					setErrorEditToken(null);
				}, 2500)
			} else if (aliasEdit.length > 150) {
				setErrorEditToken("Invalid Alias | Max character - 150");
				setTimeout(function () {
					setErrorEditToken(null);
				}, 2500)
			} else if (expirationEdit && !validateExpiration(expirationEdit)) {
				setErrorEditToken("Invalid Expiration datetime (note: Timezone +01:00)");
				setTimeout(function () {
					setErrorEditToken(null);
				}, 2500)
			} else {
				setLoadingEditToken(true);

				const editTokenRes = updateTokenDetails(cookie, {
					unique_id: editTokenUniqueId,
					alias: aliasEdit,
					valid: validEdit,
					expiration: expirationEdit === null ? undefined : return_expiration(expirationEdit)
				})

				editTokenRes.then(res => {
					setLoadingEditToken(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorEditToken(error);
							setTimeout(function () {
								setErrorEditToken(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorEditToken(error);
							setTimeout(function () {
								setErrorEditToken(null);
							}, 2000)
						}
					} else {
						setErrorEditToken(null);
						setSuccessEditToken(`Member details edited successfully!`);

						setTimeout(function () {
							setSuccessEditToken(null);
							setRemoveEditTokenModal(true);
							setEditTokenUniqueId(null);
							setAliasEdit(null);
							setValidEdit(null);
							setExpirationEdit(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingEditToken(false);
				})

			}
		}
	};

	return {
		cookie, aliasEdit, validEdit, expirationEdit, loadingEditToken, removeEditTokenModal, editTokenUniqueId, errorEditToken, successEditToken,
		handleEditToken, handleAliasEdit, handleValidEdit, handleExpirationEdit, setRemoveEditTokenModal, setEditTokenUniqueId, setAliasEdit, 
		setValidEdit, setExpirationEdit
	};
};

const useDeleteToken = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingDeleteToken, setLoadingDeleteToken] = useState(false);
	const [removeDeleteTokenModal, setRemoveDeleteTokenModal] = useState(null);
	const [deleteTokenUniqueId, setDeleteTokenUniqueId] = useState(null);

	const [errorDeleteToken, setErrorDeleteToken] = useState(null);
	const [successDeleteToken, setSuccessDeleteToken] = useState(null);

	const handleDeleteToken = () => {

		if (!loadingDeleteToken) {
			if (!deleteTokenUniqueId) {
				setErrorDeleteToken(null);
				setSuccessDeleteToken(null);
				setErrorDeleteToken("Unique ID is required");
				setTimeout(function () {
					setErrorDeleteToken(null);
				}, 2500)
			} else {
				setLoadingDeleteToken(true);
				
				const deleteTokenRes = deleteToken(cookie, {
					unique_id: deleteTokenUniqueId
				})

				deleteTokenRes.then(res => {
					setLoadingDeleteToken(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorDeleteToken(error);
							setTimeout(function () {
								setErrorDeleteToken(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorDeleteToken(error);
							setTimeout(function () {
								setErrorDeleteToken(null);
							}, 2000)
						}
					} else {
						setErrorDeleteToken(null);
						setSuccessDeleteToken(`Member deleted successfully!`);

						setTimeout(function () {
							setSuccessDeleteToken(null);
							setRemoveDeleteTokenModal(true);
							setDeleteTokenUniqueId(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingDeleteToken(false);
				})

			}
		}
	};

	return {
		cookie, loadingDeleteToken, removeDeleteTokenModal, deleteTokenUniqueId, errorDeleteToken, successDeleteToken,
		handleDeleteToken, setRemoveDeleteTokenModal, setDeleteTokenUniqueId
	};
};

export { useAddToken, useResetToken, useEditToken, useDeleteToken };