import { useState } from "react";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { 
	updateComplianceCertificate, updateComplianceDetails, updateComplianceDocument, updateComplianceDocuments, updateDescription, 
	updateEmail, updateLiveApiKey, updateMasterToken, updateName, updateProfilePhoto, updateTestApiKey
} from "../api/settings";

const useUpdateName = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingUpdateName, setLoadingUpdateName] = useState(false);
	const [businessName, setBusinessName] = useState(null);

	const [errorUpdateName, setErrorUpdateName] = useState(null);
	const [successUpdateName, setSuccessUpdateName] = useState(null);

	const handleBusinessName = (e) => { e.preventDefault(); setBusinessName(e.target.value); };

	const handleUpdateName = (e) => {
		e.preventDefault();

		if (!loadingUpdateName) {
			if (!businessName) {
				setErrorUpdateName(null);
				setSuccessUpdateName(null);
				setErrorUpdateName("Name is required");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else if (businessName.length < 3) {
				setErrorUpdateName("Min character - 3");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else if (businessName.length > 50) {
				setErrorUpdateName("Max character - 50");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else {
				setLoadingUpdateName(true);

				const updateNameRes = updateName(cookie, {
					name: businessName
				})

				updateNameRes.then(res => {
					setLoadingUpdateName(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorUpdateName(error);
							setTimeout(function () {
								setErrorUpdateName(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorUpdateName(error);
							setTimeout(function () {
								setErrorUpdateName(null);
							}, 2000)
						}
					} else {
						setErrorUpdateName(null);
						setSuccessUpdateName(`Business name edited successfully!`);

						setTimeout(function () {
							setSuccessUpdateName(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdateName(false);
				})

			}
		}
	};

	return {
		cookie, businessName, loadingUpdateName, errorUpdateName, successUpdateName, handleUpdateName, handleBusinessName, setBusinessName,
	};
};

const useUpdateEmail = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingUpdateEmail, setLoadingUpdateEmail] = useState(false);
	const [removeUpdateEmailModal, setRemoveUpdateEmailModal] = useState(null);
	const [businessEmail, setBusinessEmail] = useState(null);

	const [errorUpdateEmail, setErrorUpdateEmail] = useState(null);
	const [successUpdateEmail, setSuccessUpdateEmail] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);

	const handleBusinessEmail = (e) => { e.preventDefault(); setBusinessEmail(e.target.value); };

	const handleUpdateEmail = (e) => {
		e.preventDefault();

		if (!loadingUpdateEmail) {
			if (!businessEmail) {
				setErrorUpdateEmail(null);
				setSuccessUpdateEmail(null);
				setErrorUpdateEmail("Email is required");
				setTimeout(function () {
					setErrorUpdateEmail(null);
				}, 2500)
			} else if (!validEmail.test(businessEmail)) {
				setErrorUpdateEmail("Invalid email");
				setTimeout(function () {
					setErrorUpdateEmail(null);
				}, 2500)
			} else {
				setLoadingUpdateEmail(true);

				const updateEmailRes = updateEmail(cookie, {
					email: businessEmail
				})

				updateEmailRes.then(res => {
					setLoadingUpdateEmail(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorUpdateEmail(error);
							setTimeout(function () {
								setErrorUpdateEmail(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorUpdateEmail(error);
							setTimeout(function () {
								setErrorUpdateEmail(null);
							}, 2000)
						}
					} else {
						setErrorUpdateEmail(null);
						setSuccessUpdateEmail(`Business email edited successfully!`);

						setTimeout(function () {
							setSuccessUpdateEmail(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdateEmail(false);
				})

			}
		}
	};

	return {
		cookie, businessEmail, loadingUpdateEmail, errorUpdateEmail, successUpdateEmail, handleUpdateEmail, handleBusinessEmail, setBusinessEmail, 
		removeUpdateEmailModal, setRemoveUpdateEmailModal
	};
};

const useUpdateDescription = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingUpdateDescription, setLoadingUpdateDescription] = useState(false);
	const [businessDescription, setBusinessDescription] = useState(null);

	const [errorUpdateDescription, setErrorUpdateDescription] = useState(null);
	const [successUpdateDescription, setSuccessUpdateDescription] = useState(null);

	const handleBusinessDescription = (e) => { e.preventDefault(); setBusinessDescription(e.target.value); };

	const handleUpdateDescription = (e) => {
		e.preventDefault();

		if (!loadingUpdateDescription) {
			if (businessDescription.length < 3) {
				setErrorUpdateDescription(null);
				setSuccessUpdateDescription(null);
				setErrorUpdateDescription("Description is required");
				setTimeout(function () {
					setErrorUpdateDescription(null);
				}, 2500)
			} else if (businessDescription.length < 3) {
				setErrorUpdateDescription("Min character - 3");
				setTimeout(function () {
					setErrorUpdateDescription(null);
				}, 2500)
			} else if (businessDescription.length > 500) {
				setErrorUpdateDescription("Max character - 500");
				setTimeout(function () {
					setErrorUpdateDescription(null);
				}, 2500)
			} else {
				setLoadingUpdateDescription(true);

				const updateDescriptionRes = updateDescription(cookie, {
					description: businessDescription
				})

				updateDescriptionRes.then(res => {
					setLoadingUpdateDescription(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorUpdateDescription(error);
							setTimeout(function () {
								setErrorUpdateDescription(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorUpdateDescription(error);
							setTimeout(function () {
								setErrorUpdateDescription(null);
							}, 2000)
						}
					} else {
						setErrorUpdateDescription(null);
						setSuccessUpdateDescription(`Business description edited successfully!`);

						setTimeout(function () {
							setSuccessUpdateDescription(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdateDescription(false);
				})

			}
		}
	};

	return {
		cookie, businessDescription, loadingUpdateDescription, errorUpdateDescription, successUpdateDescription, handleUpdateDescription, handleBusinessDescription, setBusinessDescription,
	};
};

const useUpdateComplianceDetails = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingUpdateComplianceDetails, setLoadingUpdateComplianceDetails] = useState(false);
	const [companyName, setCompanyName] = useState(null);
	const [companyEmail, setCompanyEmail] = useState(null);
	const [companyRcNumber, setCompanyRcNumber] = useState(null);
	const [companyType, setCompanyType] = useState(null);
	const [companyAddress, setCompanyAddress] = useState(null);
	const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState(null);

	const [errorUpdateComplianceDetails, setErrorUpdateComplianceDetails] = useState(null);
	const [successUpdateComplianceDetails, setSuccessUpdateComplianceDetails] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);
	const company_types = ["BN", "RC", "IT", "LL", "LLP"];

	const handleCompanyName = (e) => { e.preventDefault(); setCompanyName(e.target.value); };
	const handleCompanyEmail = (e) => { e.preventDefault(); setCompanyEmail(e.target.value); };
	const handleCompanyRcNumber = (e) => { e.preventDefault(); setCompanyRcNumber(e.target.value); };
	const handleCompanyType = (e) => { e.preventDefault(); setCompanyType(e.target.value); };
	const handleCompanyAddress = (e) => { e.preventDefault(); setCompanyAddress(e.target.value); };
	const handleCompanyWebsiteUrl = (e) => { e.preventDefault(); setCompanyWebsiteUrl(e.target.value); };

	const test_all_regex = (data, regex) => {
		if (!data) {
			return false;
		}

		const valid = regex.test(data);
		if (!valid) {
			return false;
		}

		return true;
	};

	const validate_url = (url) => {
		const tester = /^((http|https):\/\/)(www.)?[a-zA-Z0-9@:%._\+~#?&//=]{2,256}((\.[a-z]{2,6})|([a-z0-9:]){2,10})\b([-a-zA-Z0-9@:%._\+~#?&//=]*)$/;
		return test_all_regex(url, tester);
	};

	const validate_rc_number = (number) => {
		const tester = /^([0-9]{6,14})$/;
		return test_all_regex(number, tester);
	};

	const validate_company_type = (company_type) => {
		if (!company_types.includes(company_type)) return false;
		return true;
	};

	const handleUpdateComplianceDetails = (e) => {
		e.preventDefault();

		if (!loadingUpdateComplianceDetails) {
			if (!companyName) {
				setErrorUpdateComplianceDetails(null);
				setSuccessUpdateComplianceDetails(null);
				setErrorUpdateComplianceDetails("Company name is required");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (companyName.length < 3) {
				setErrorUpdateComplianceDetails("Company name minimum characters - 3");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (companyName.length > 150) {
				setErrorUpdateComplianceDetails("Company name maximum characters - 150");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!companyEmail) {
				setErrorUpdateComplianceDetails("Company email is required");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!validEmail.test(companyEmail)) {
				setErrorUpdateComplianceDetails("Invalid email");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!companyRcNumber) {
				setErrorUpdateComplianceDetails("RC Number is required");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!validate_rc_number(companyRcNumber)) {
				setErrorUpdateComplianceDetails("Invalid RC Number");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!companyType) {
				setErrorUpdateComplianceDetails("Company Type is required");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!validate_company_type(companyType)) {
				setErrorUpdateComplianceDetails("Invalid Company Type");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!companyAddress) {
				setErrorUpdateComplianceDetails("Company Address is required");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (companyAddress.length < 3) {
				setErrorUpdateComplianceDetails("Company address minimum characters - 3");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (companyAddress.length > 200) {
				setErrorUpdateComplianceDetails("Company address maximum characters - 200");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (companyWebsiteUrl && !validate_url(companyWebsiteUrl)) {
				setErrorUpdateComplianceDetails("Invalid Website Url");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else {
				setLoadingUpdateComplianceDetails(true);

				const updateComplianceDetailsRes = updateComplianceDetails(cookie, {
					company_name: companyName,
					company_email: companyEmail,
					company_rc_number: companyRcNumber,
					company_type: companyType,
					company_address: companyAddress,
					website_url: companyWebsiteUrl,
				})

				updateComplianceDetailsRes.then(res => {
					setLoadingUpdateComplianceDetails(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorUpdateComplianceDetails(error);
							setTimeout(function () {
								setErrorUpdateComplianceDetails(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorUpdateComplianceDetails(error);
							setTimeout(function () {
								setErrorUpdateComplianceDetails(null);
							}, 2000)
						}
					} else {
						setErrorUpdateComplianceDetails(null);
						setSuccessUpdateComplianceDetails(`Compliance details edited successfully!`);
						// setSuccessUpdateComplianceDetails(`${res.data.data.message}`);
						console.log(res.data);

						setTimeout(function () {
							setSuccessUpdateComplianceDetails(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdateComplianceDetails(false);
				})

			}
		}
	};

	return {
		cookie, companyName, companyEmail, companyRcNumber, companyAddress, companyWebsiteUrl, loadingUpdateComplianceDetails, 
		errorUpdateComplianceDetails, successUpdateComplianceDetails, setCompanyEmail, setCompanyRcNumber, handleCompanyAddress, 
		handleUpdateComplianceDetails, handleCompanyName, handleCompanyEmail, handleCompanyRcNumber, setCompanyName, setCompanyWebsiteUrl,
		handleCompanyType, setCompanyType, companyType, handleCompanyWebsiteUrl, setCompanyAddress,  
	};
};

const useResetMasterToken = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingResetMasterToken, setLoadingResetMasterToken] = useState(false);
	const [removeResetMasterTokenModal, setRemoveResetMasterTokenModal] = useState(null);

	const [errorResetMasterToken, setErrorResetMasterToken] = useState(null);
	const [successResetMasterToken, setSuccessResetMasterToken] = useState(null);

	const handleResetMasterToken = () => {

		if (!loadingResetMasterToken) {
			setLoadingResetMasterToken(true);

			const resetMasterTokenRes = updateMasterToken(cookie)

			resetMasterTokenRes.then(res => {
				setLoadingResetMasterToken(false);
				if (res.err) {
					if (!res.error.response.data.success) {
						const error = `${res.error.response.data.message}`;
						setErrorResetMasterToken(error);
						setTimeout(function () {
							setErrorResetMasterToken(null);
						}, 2000)
					} else {
						const error = `${res.error.code} - ${res.error.message}`;
						setErrorResetMasterToken(error);
						setTimeout(function () {
							setErrorResetMasterToken(null);
						}, 2000)
					}
				} else {
					setErrorResetMasterToken(null);
					setSuccessResetMasterToken(`Master Token reset successful!`);

					setTimeout(function () {
						setSuccessResetMasterToken(null);
						setRemoveResetMasterTokenModal(true);
					}, 2500)
				}
			}).catch(err => {
				setLoadingResetMasterToken(false);
			})
		}
	};

	return {
		cookie, loadingResetMasterToken, removeResetMasterTokenModal, errorResetMasterToken, successResetMasterToken,
		handleResetMasterToken, setRemoveResetMasterTokenModal,
	};
};

const useResetLiveApiKey = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingResetLiveApiKey, setLoadingResetLiveApiKey] = useState(false);
	const [removeResetLiveApiKeyModal, setRemoveResetLiveApiKeyModal] = useState(null);

	const [errorResetLiveApiKey, setErrorResetLiveApiKey] = useState(null);
	const [successResetLiveApiKey, setSuccessResetLiveApiKey] = useState(null);

	const handleResetLiveApiKey = () => {

		if (!loadingResetLiveApiKey) {
			setLoadingResetLiveApiKey(true);

			const resetLiveApiKeyRes = updateLiveApiKey(cookie)

			resetLiveApiKeyRes.then(res => {
				setLoadingResetLiveApiKey(false);
				if (res.err) {
					if (!res.error.response.data.success) {
						const error = `${res.error.response.data.message}`;
						setErrorResetLiveApiKey(error);
						setTimeout(function () {
							setErrorResetLiveApiKey(null);
						}, 2000)
					} else {
						const error = `${res.error.code} - ${res.error.message}`;
						setErrorResetLiveApiKey(error);
						setTimeout(function () {
							setErrorResetLiveApiKey(null);
						}, 2000)
					}
				} else {
					setErrorResetLiveApiKey(null);
					setSuccessResetLiveApiKey(`Live API key reset successful!`);

					setTimeout(function () {
						setSuccessResetLiveApiKey(null);
						setRemoveResetLiveApiKeyModal(true);
					}, 2500)
				}
			}).catch(err => {
				setLoadingResetLiveApiKey(false);
			})
		}
	};

	return {
		cookie, loadingResetLiveApiKey, removeResetLiveApiKeyModal, errorResetLiveApiKey, successResetLiveApiKey,
		handleResetLiveApiKey, setRemoveResetLiveApiKeyModal,
	};
};

const useResetTestApiKey = () => {

	const [cookie] = useCookie(config.token, "");

	const [loadingResetTestApiKey, setLoadingResetTestApiKey] = useState(false);
	const [removeResetTestApiKeyModal, setRemoveResetTestApiKeyModal] = useState(null);

	const [errorResetTestApiKey, setErrorResetTestApiKey] = useState(null);
	const [successResetTestApiKey, setSuccessResetTestApiKey] = useState(null);

	const handleResetTestApiKey = () => {

		if (!loadingResetTestApiKey) {
			setLoadingResetTestApiKey(true);

			const resetTestApiKeyRes = updateTestApiKey(cookie)

			resetTestApiKeyRes.then(res => {
				setLoadingResetTestApiKey(false);
				if (res.err) {
					if (!res.error.response.data.success) {
						const error = `${res.error.response.data.message}`;
						setErrorResetTestApiKey(error);
						setTimeout(function () {
							setErrorResetTestApiKey(null);
						}, 2000)
					} else {
						const error = `${res.error.code} - ${res.error.message}`;
						setErrorResetTestApiKey(error);
						setTimeout(function () {
							setErrorResetTestApiKey(null);
						}, 2000)
					}
				} else {
					setErrorResetTestApiKey(null);
					setSuccessResetTestApiKey(`Test API key reset successful!`);

					setTimeout(function () {
						setSuccessResetTestApiKey(null);
						setRemoveResetTestApiKeyModal(true);
					}, 2500)
				}
			}).catch(err => {
				setLoadingResetTestApiKey(false);
			})
		}
	};

	return {
		cookie, loadingResetTestApiKey, removeResetTestApiKeyModal, errorResetTestApiKey, successResetTestApiKey,
		handleResetTestApiKey, setRemoveResetTestApiKeyModal,
	};
};

export { useUpdateName, useUpdateEmail, useUpdateDescription, useUpdateComplianceDetails, useResetMasterToken, useResetLiveApiKey, useResetTestApiKey };