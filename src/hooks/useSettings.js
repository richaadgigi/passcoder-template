import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { 
	updateComplianceCertificate, updateComplianceDetails, updateComplianceDocument, updateDescription, 
	updateEmail, updateLiveApiKey, updateMasterToken, updateName, updateProfilePhoto, updateTestApiKey, 
	getPlatformProfilePhotoProof, getPlatformComplianceDocumentsProof
} from "../api/settings";

const useUpdateName = () => {

	const {cookie, removeCookie} = useCookie(config.token, "");

	const [loadingUpdateName, setLoadingUpdateName] = useState(false);
	const [removeUpdateNameModal, setRemoveUpdateNameModal] = useState(null);
	const [businessName, setBusinessName] = useState("");

	const [errorUpdateName, setErrorUpdateName] = useState(null);
	const [successUpdateName, setSuccessUpdateName] = useState(null);

	const handleBusinessName = (e) => { e.preventDefault(); setBusinessName(e.target.value); };

	const navigate = useNavigate();
	
	const strip_text = (text) => {
		// Lower case everything
		let string = text.toLowerCase();
		// Make alphanumeric (removes all other characters)
		string = string.replace(/[^a-z0-9_\s-]/g, "");
		// Clean up multiple dashes or whitespaces
		string = string.replace(/[\s-]+/g, " ");
		// Convert whitespaces and underscore to dash
		string = string.replace(/[\s_]/g, "-");
		return string;
	};

	const handleUpdateName = (e) => {
		e.preventDefault();

		if (!loadingUpdateName) {
			if (businessName.length === 0) {
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
							setRemoveUpdateNameModal(true);
							removeCookie();
							navigate(`/access/${strip_text(businessName)}`);
							window.location.reload(true);
							setBusinessName("");
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
		removeUpdateNameModal, setRemoveUpdateNameModal
	};
};

const useUpdateEmail = () => {

	const {cookie, removeCookie} = useCookie(config.token, "");

	const [loadingUpdateEmail, setLoadingUpdateEmail] = useState(false);
	const [stripped, setStripped] = useState("");
	const [removeUpdateEmailModal, setRemoveUpdateEmailModal] = useState(null);
	const [businessEmail, setBusinessEmail] = useState("");

	const [errorUpdateEmail, setErrorUpdateEmail] = useState(null);
	const [successUpdateEmail, setSuccessUpdateEmail] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);

	const handleBusinessEmail = (e) => { e.preventDefault(); setBusinessEmail(e.target.value); };
	const handleStripped = (stripped) => { setStripped(stripped); };

	const navigate = useNavigate();

	const handleUpdateEmail = (e) => {
		e.preventDefault();

		if (!loadingUpdateEmail) {
			if (businessEmail.length === 0) {
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
			} else if (stripped.length === 0) {
				setErrorUpdateEmail("Unable to get platform details");
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
							setRemoveUpdateEmailModal(true);
							removeCookie();
							navigate(`/access/${stripped}`);
							window.location.reload(true);
							setBusinessEmail("");
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
		removeUpdateEmailModal, setRemoveUpdateEmailModal, handleStripped
	};
};

const useUpdateDescription = () => {

	const {cookie} = useCookie(config.token, "");

	const [loadingUpdateDescription, setLoadingUpdateDescription] = useState(false);
	const [businessDescription, setBusinessDescription] = useState("");

	const [errorUpdateDescription, setErrorUpdateDescription] = useState(null);
	const [successUpdateDescription, setSuccessUpdateDescription] = useState(null);

	const handleBusinessDescription = (e) => { e.preventDefault(); setBusinessDescription(e.target.value); };

	const handleUpdateDescription = (e) => {
		e.preventDefault();

		if (!loadingUpdateDescription) {
			if (businessDescription.length === 0) {
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
							setBusinessDescription("");
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

	const {cookie} = useCookie(config.token, "");

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
			} else if (!companyWebsiteUrl) {
				setErrorUpdateComplianceDetails("Website Url is required");
				setTimeout(function () {
					setErrorUpdateComplianceDetails(null);
				}, 2500)
			} else if (!validate_url(companyWebsiteUrl)) {
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
						if (res.response_code === 200) {
							setSuccessUpdateComplianceDetails(`Compliance details verified successfully!`);
						} else {
							setSuccessUpdateComplianceDetails(`Compliance details edited successfully!`);
						}

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

	const {cookie, removeCookie} = useCookie(config.token, "");

	const [loadingResetMasterToken, setLoadingResetMasterToken] = useState(false);
	const [stripped, setStripped] = useState("");
	const [removeResetMasterTokenModal, setRemoveResetMasterTokenModal] = useState(null);

	const [errorResetMasterToken, setErrorResetMasterToken] = useState(null);
	const [successResetMasterToken, setSuccessResetMasterToken] = useState(null);

	const handleStripped = (stripped) => { setStripped(stripped); };

	const navigate = useNavigate();

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
						removeCookie();
						navigate(`/access/${stripped}`);
						window.location.reload(true);
					}, 2500)
				}
			}).catch(err => {
				setLoadingResetMasterToken(false);
			})
		}
	};

	return {
		cookie, loadingResetMasterToken, removeResetMasterTokenModal, errorResetMasterToken, successResetMasterToken,
		handleResetMasterToken, setRemoveResetMasterTokenModal, handleStripped
	};
};

const useResetLiveApiKey = () => {

	const {cookie} = useCookie(config.token, "");

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

	const {cookie} = useCookie(config.token, "");

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

const useUploadPlatformProfilePhoto = () => {

	const storage = getStorage(app);

	const {cookie} = useCookie(config.token, "");

	const [loadingProfilePhoto, setLoadingProfilePhoto] = useState(false);
	const [platformUniqueId, setPlatformUniqueId] = useState("");
	const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("");
	const [uploadingProfilePhotoPercentage, setUploadingProfilePhotoPercentage] = useState(0);

	const [errorProfilePhoto, setErrorProfilePhoto] = useState(null);
	const [successProfilePhoto, setSuccessProfilePhoto] = useState(null);

	const allowed_extensions = ["image/png", "image/PNG", "image/jpg", "image/JPG", "image/jpeg", "image/JPEG", "image/webp", "image/WEBP"];
	const maximum_file_size = 5 * 1024 * 1024;

	const handleUploadProfilePhoto = (e) => {
		e.preventDefault();

		if (!loadingProfilePhoto) {
			if (platformUniqueId.length === 0) {
				setErrorProfilePhoto(null);
				setSuccessProfilePhoto(null);
				setErrorProfilePhoto("Platform ID is required");
				setTimeout(function () {
					setErrorProfilePhoto(null);
				}, 2000)
			} else if (!allowed_extensions.includes(selectedProfilePhoto.type)) {
				setErrorProfilePhoto("Invalid image format (.png, .jpg, .jpeg & .webp)");
				setTimeout(function () {
					setErrorProfilePhoto(null);
				}, 2000)
			} else if (selectedProfilePhoto.size > maximum_file_size) {
				setErrorProfilePhoto("File too large (max 5mb)");
				setTimeout(function () {
					setErrorProfilePhoto(null);
				}, 2000)
			} else {
				setLoadingProfilePhoto(true);
	
				const profilePhotoProofRes = getPlatformProfilePhotoProof({ platform_unique_id: platformUniqueId })
	
				profilePhotoProofRes.then(res => {
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setUploadingProfilePhotoPercentage(0);
							setLoadingProfilePhoto(false);
							setErrorProfilePhoto(error);
							setTimeout(function () {
								setErrorProfilePhoto(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setUploadingProfilePhotoPercentage(0);
							setLoadingProfilePhoto(false);
							setErrorProfilePhoto(error);
							setTimeout(function () {
								setErrorProfilePhoto(null);
							}, 2000)
						}
					} else {
						const profile_image_rename = res.data.data[0].photo;
						let lastDot = selectedProfilePhoto.name.lastIndexOf('.');
						let ext = selectedProfilePhoto.name.substring(lastDot + 1);

						const imagePath = "/platforms/" + profile_image_rename + "." + ext;

						const storageRef = ref(storage, imagePath);
						const uploadTask = uploadBytesResumable(storageRef, selectedProfilePhoto);

						uploadTask.on('state_changed',
							(snapshot) => {
								const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
								setUploadingProfilePhotoPercentage(progress);
							},
							(error) => {
								setUploadingProfilePhotoPercentage(0);
								setLoadingProfilePhoto(false);
								setErrorProfilePhoto("An error occured while uploading");
								setTimeout(function () {
									setErrorProfilePhoto(null);
								}, 3000)
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
									
									const updatePlatformProfileImageRes = updateProfilePhoto(cookie, {
										photo: downloadURL,
										photo_file_ext: imagePath
									})

									updatePlatformProfileImageRes.then(res => {
										if (res.err) {
											if (!res.error.response.data.success) {
												const error = `${res.error.response.data.message}`;
												setUploadingProfilePhotoPercentage(0);
												setLoadingProfilePhoto(false);
												setErrorProfilePhoto(error);
												setTimeout(function () {
													setErrorProfilePhoto(null);
												}, 2000)
											} else {
												const error = `${res.error.code} - ${res.error.message}`;
												setUploadingProfilePhotoPercentage(0);
												setLoadingProfilePhoto(false);
												setErrorProfilePhoto(error);
												setTimeout(function () {
													setErrorProfilePhoto(null);
												}, 2000)
											}
										} else {
											setErrorProfilePhoto(null);
											setUploadingProfilePhotoPercentage(0);
											setSuccessProfilePhoto(`Profile image uploaded successfully!`);
											
											setTimeout(function () {
												setLoadingProfilePhoto(false);
												setSuccessProfilePhoto(null);
												window.location.reload(true);
											}, 3000)
										}
									}).catch(err => {
										setUploadingProfilePhotoPercentage(0);
										setLoadingProfilePhoto(false);
									})
								});

							}
						)
					}
				}).catch(err => {
					setUploadingProfilePhotoPercentage(0);
					setLoadingProfilePhoto(false);
				})
			}
		}
	};

	return {
		cookie, loadingProfilePhoto, errorProfilePhoto, successProfilePhoto, handleUploadProfilePhoto, platformUniqueId, setSelectedProfilePhoto, 
		setPlatformUniqueId, uploadingProfilePhotoPercentage, selectedProfilePhoto,
	};
};

const useUploadPlatformComplianceDocument = () => {

	const storage = getStorage(app);

	const {cookie} = useCookie(config.token, "");

	const [loadingComplianceDocument, setLoadingComplianceDocument] = useState(false);
	const [platformUniqueId, setPlatformUniqueId] = useState("");
	const [selectedComplianceDocument, setSelectedComplianceDocument] = useState("");
	const [uploadingComplianceDocumentPercentage, setUploadingComplianceDocumentPercentage] = useState(0);

	const [errorComplianceDocument, setErrorComplianceDocument] = useState(null);
	const [successComplianceDocument, setSuccessComplianceDocument] = useState(null);

	const allowed_extensions = ["image/png", "image/PNG", "image/jpg", "image/JPG", "image/jpeg", "image/JPEG", "application/pdf", "application/PDF"];
	const maximum_file_size = 5 * 1024 * 1024;

	const handleUploadComplianceDocument = (e) => {
		e.preventDefault();

		if (!loadingComplianceDocument) {
			if (platformUniqueId.length === 0) {
				setErrorComplianceDocument(null);
				setSuccessComplianceDocument(null);
				setErrorComplianceDocument("Platform ID is required");
				setTimeout(function () {
					setErrorComplianceDocument(null);
				}, 2000)
			} else if (!allowed_extensions.includes(selectedComplianceDocument.type)) {
				setErrorComplianceDocument("Invalid image format (.png, .jpg, .jpeg & .pdf)");
				setTimeout(function () {
					setErrorComplianceDocument(null);
				}, 2000)
			} else if (selectedComplianceDocument.size > maximum_file_size) {
				setErrorComplianceDocument("File too large (max 5mb)");
				setTimeout(function () {
					setErrorComplianceDocument(null);
				}, 2000)
			} else {
				setLoadingComplianceDocument(true);

				const complianceDocumentProofRes = getPlatformComplianceDocumentsProof({ platform_unique_id: platformUniqueId })

				complianceDocumentProofRes.then(res => {
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setUploadingComplianceDocumentPercentage(0);
							setLoadingComplianceDocument(false);
							setErrorComplianceDocument(error);
							setTimeout(function () {
								setErrorComplianceDocument(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setUploadingComplianceDocumentPercentage(0);
							setLoadingComplianceDocument(false);
							setErrorComplianceDocument(error);
							setTimeout(function () {
								setErrorComplianceDocument(null);
							}, 2000)
						}
					} else {
						const platform_file_rename = res.data.data[1].registration_document;
						let lastDot = selectedComplianceDocument.name.lastIndexOf('.');
						let ext = selectedComplianceDocument.name.substring(lastDot + 1);

						const filePath = "/platforms/" + platform_file_rename + "." + ext;

						const storageRef = ref(storage, filePath);
						const uploadTask = uploadBytesResumable(storageRef, selectedComplianceDocument);

						uploadTask.on('state_changed',
							(snapshot) => {
								const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
								setUploadingComplianceDocumentPercentage(progress);
							},
							(error) => {
								setUploadingComplianceDocumentPercentage(0);
								setLoadingComplianceDocument(false);
								setErrorComplianceDocument("An error occured while uploading");
								setTimeout(function () {
									setErrorComplianceDocument(null);
								}, 3000)
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

									const updatePlatformRegistrationDocumentRes = updateComplianceDocument(cookie, {
										registration_document: downloadURL,
										registration_document_file_ext: filePath
									})

									updatePlatformRegistrationDocumentRes.then(res => {
										if (res.err) {
											if (!res.error.response.data.success) {
												const error = `${res.error.response.data.message}`;
												setUploadingComplianceDocumentPercentage(0);
												setLoadingComplianceDocument(false);
												setErrorComplianceDocument(error);
												setTimeout(function () {
													setErrorComplianceDocument(null);
												}, 2000)
											} else {
												const error = `${res.error.code} - ${res.error.message}`;
												setUploadingComplianceDocumentPercentage(0);
												setLoadingComplianceDocument(false);
												setErrorComplianceDocument(error);
												setTimeout(function () {
													setErrorComplianceDocument(null);
												}, 2000)
											}
										} else {
											setErrorComplianceDocument(null);
											setUploadingComplianceDocumentPercentage(0);
											setSuccessComplianceDocument(`Registration Document uploaded successfully!`);

											setTimeout(function () {
												setLoadingComplianceDocument(false);
												setSuccessComplianceDocument(null);
												window.location.reload(true);
											}, 3000)
										}
									}).catch(err => {
										setUploadingComplianceDocumentPercentage(0);
										setLoadingComplianceDocument(false);
									})
								});

							}
						)
					}
				}).catch(err => {
					setUploadingComplianceDocumentPercentage(0);
					setLoadingComplianceDocument(false);
				})
			}
		}
	};

	return {
		cookie, loadingComplianceDocument, errorComplianceDocument, successComplianceDocument, handleUploadComplianceDocument, platformUniqueId, setSelectedComplianceDocument,
		setPlatformUniqueId, uploadingComplianceDocumentPercentage, selectedComplianceDocument,
	};
};

const useUploadPlatformComplianceCertificate = () => {

	const storage = getStorage(app);

	const {cookie} = useCookie(config.token, "");

	const [loadingComplianceCertificate, setLoadingComplianceCertificate] = useState(false);
	const [platformUniqueId, setPlatformUniqueId] = useState("");
	const [selectedComplianceCertificate, setSelectedComplianceCertificate] = useState("");
	const [uploadingComplianceCertificatePercentage, setUploadingComplianceCertificatePercentage] = useState(0);

	const [errorComplianceCertificate, setErrorComplianceCertificate] = useState(null);
	const [successComplianceCertificate, setSuccessComplianceCertificate] = useState(null);

	const allowed_extensions = ["image/png", "image/PNG", "image/jpg", "image/JPG", "image/jpeg", "image/JPEG", "application/pdf", "application/PDF"];
	const maximum_file_size = 5 * 1024 * 1024;

	const handleUploadComplianceCertificate = (e) => {
		e.preventDefault();

		if (!loadingComplianceCertificate) {
			if (platformUniqueId.length === 0) {
				setErrorComplianceCertificate(null);
				setSuccessComplianceCertificate(null);
				setErrorComplianceCertificate("Platform ID is required");
				setTimeout(function () {
					setErrorComplianceCertificate(null);
				}, 2000)
			} else if (!allowed_extensions.includes(selectedComplianceCertificate.type)) {
				setErrorComplianceCertificate("Invalid image format (.png, .jpg, .jpeg & .pdf)");
				setTimeout(function () {
					setErrorComplianceCertificate(null);
				}, 2000)
			} else if (selectedComplianceCertificate.size > maximum_file_size) {
				setErrorComplianceCertificate("File too large (max 5mb)");
				setTimeout(function () {
					setErrorComplianceCertificate(null);
				}, 2000)
			} else {
				setLoadingComplianceCertificate(true);

				const complianceCertificateProofRes = getPlatformComplianceDocumentsProof({ platform_unique_id: platformUniqueId })

				complianceCertificateProofRes.then(res => {
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setUploadingComplianceCertificatePercentage(0);
							setLoadingComplianceCertificate(false);
							setErrorComplianceCertificate(error);
							setTimeout(function () {
								setErrorComplianceCertificate(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setUploadingComplianceCertificatePercentage(0);
							setLoadingComplianceCertificate(false);
							setErrorComplianceCertificate(error);
							setTimeout(function () {
								setErrorComplianceCertificate(null);
							}, 2000)
						}
					} else {
						const platform_file_rename = res.data.data[0].registration_certificate;
						let lastDot = selectedComplianceCertificate.name.lastIndexOf('.');
						let ext = selectedComplianceCertificate.name.substring(lastDot + 1);

						const filePath = "/platforms/" + platform_file_rename + "." + ext;

						const storageRef = ref(storage, filePath);
						const uploadTask = uploadBytesResumable(storageRef, selectedComplianceCertificate);

						uploadTask.on('state_changed',
							(snapshot) => {
								const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
								setUploadingComplianceCertificatePercentage(progress);
							},
							(error) => {
								setUploadingComplianceCertificatePercentage(0);
								setLoadingComplianceCertificate(false);
								setErrorComplianceCertificate("An error occured while uploading");
								setTimeout(function () {
									setErrorComplianceCertificate(null);
								}, 3000)
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

									const updatePlatformRegistrationCertificateRes = updateComplianceCertificate(cookie, {
										registration_certificate: downloadURL,
										registration_certificate_file_ext: filePath
									})

									updatePlatformRegistrationCertificateRes.then(res => {
										if (res.err) {
											if (!res.error.response.data.success) {
												const error = `${res.error.response.data.message}`;
												setUploadingComplianceCertificatePercentage(0);
												setLoadingComplianceCertificate(false);
												setErrorComplianceCertificate(error);
												setTimeout(function () {
													setErrorComplianceCertificate(null);
												}, 2000)
											} else {
												const error = `${res.error.code} - ${res.error.message}`;
												setUploadingComplianceCertificatePercentage(0);
												setLoadingComplianceCertificate(false);
												setErrorComplianceCertificate(error);
												setTimeout(function () {
													setErrorComplianceCertificate(null);
												}, 2000)
											}
										} else {
											setErrorComplianceCertificate(null);
											setUploadingComplianceCertificatePercentage(0);
											setSuccessComplianceCertificate(`Registration Certificate uploaded successfully!`);

											setTimeout(function () {
												setLoadingComplianceCertificate(false);
												setSuccessComplianceCertificate(null);
												window.location.reload(true);
											}, 3000)
										}
									}).catch(err => {
										setUploadingComplianceCertificatePercentage(0);
										setLoadingComplianceCertificate(false);
									})
								});

							}
						)
					}
				}).catch(err => {
					setUploadingComplianceCertificatePercentage(0);
					setLoadingComplianceCertificate(false);
				})
			}
		}
	};

	return {
		cookie, loadingComplianceCertificate, errorComplianceCertificate, successComplianceCertificate, handleUploadComplianceCertificate, platformUniqueId, setSelectedComplianceCertificate,
		setPlatformUniqueId, uploadingComplianceCertificatePercentage, selectedComplianceCertificate,
	};
};

export { 
	useUpdateName, useUpdateEmail, useUpdateDescription, useUpdateComplianceDetails, useResetMasterToken, useResetLiveApiKey, useResetTestApiKey, 
	useUploadPlatformProfilePhoto, useUploadPlatformComplianceDocument, useUploadPlatformComplianceCertificate
};