import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { 
	updateComplianceCertificate, updateComplianceDetails, updateComplianceDocument, updateDescription, 
	updateEmail, updateMasterToken, updateName, updateProfilePhoto, updateProfileCover, updatePointThreshold, 
	getPartnerProfilePhotoProof, getPartnerComplianceDocumentsProof, getPartnerProfileCoverProof, 
} from "../api/settings";

const useUpdateName = () => {

	const {cookie, removeCookie} = useCookie(config.token, "");
	const changeLGA = config.changeLGA;
	const [cities, setCities] = useState([]);

	const [loadingUpdateName, setLoadingUpdateName] = useState(false);
	const [removeUpdateNameModal, setRemoveUpdateNameModal] = useState(null);
	const [partnerName, setPartnerName] = useState("");
	const [partnerCity, setPartnerCity] = useState("");
	const [partnerState, setPartnerState] = useState("");
	const [partnerCountry, setPartnerCountry] = useState(null);

	const [errorUpdateName, setErrorUpdateName] = useState(null);
	const [successUpdateName, setSuccessUpdateName] = useState(null);

	const handlePartnerName = (e) => { e.preventDefault(); setPartnerName(e.target.value); };
	const handlePartnerCity = (e) => { e.preventDefault(); setPartnerCity(e.target.value) };
	const handlePartnerState = (e) => { e.preventDefault(); setPartnerState(e.target.value); setCities(changeLGA(e.target.value)) };
	const handlePartnerCountry = (e) => { e.preventDefault(); setPartnerCountry(e.target.value) };

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
			if (partnerName.length === 0) {
				setErrorUpdateName(null);
				setSuccessUpdateName(null);
				setErrorUpdateName("Name is required");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else if (partnerName.length < 3) {
				setErrorUpdateName("Min character - 3");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else if (partnerName.length > 50) {
				setErrorUpdateName("Max character - 50");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else if (!partnerCountry) {
				setErrorUpdateName("Country is required");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else if (!partnerState) {
				setErrorUpdateName("State is required");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else if (!partnerCity) {
				setErrorUpdateName("City is required");
				setTimeout(function () {
					setErrorUpdateName(null);
				}, 2500)
			} else {
				setLoadingUpdateName(true);

				const updateNameRes = updateName(cookie, {
					name: partnerName,
					country: partnerCountry,
					state: partnerState,
					city: partnerCity
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
						setSuccessUpdateName(`Partner name edited successfully!`);

						setTimeout(function () {
							setSuccessUpdateName(null);
							setRemoveUpdateNameModal(true);
							removeCookie();
							navigate(`/access/${strip_text(partnerName + " " + partnerCity + " " + partnerState)}`);
							window.location.reload(true);
							setPartnerName("");
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdateName(false);
				})

			}
		}
	};

	return {
		cookie, partnerName, loadingUpdateName, errorUpdateName, successUpdateName, handleUpdateName, handlePartnerName, setPartnerName, 
		removeUpdateNameModal, setRemoveUpdateNameModal, handlePartnerCity, handlePartnerState, handlePartnerCountry, cities, partnerCity, 
		partnerState, partnerCountry, setPartnerCity, setPartnerState, setPartnerCountry, setCities
	};
};

const useUpdateEmail = () => {

	const {cookie, removeCookie} = useCookie(config.token, "");

	const [loadingUpdateEmail, setLoadingUpdateEmail] = useState(false);
	const [stripped, setStripped] = useState("");
	const [removeUpdateEmailModal, setRemoveUpdateEmailModal] = useState(null);
	const [partnerEmail, setPartnerEmail] = useState("");

	const [errorUpdateEmail, setErrorUpdateEmail] = useState(null);
	const [successUpdateEmail, setSuccessUpdateEmail] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);

	const handlePartnerEmail = (e) => { e.preventDefault(); setPartnerEmail(e.target.value); };
	const handleStripped = (stripped) => { setStripped(stripped); };

	const navigate = useNavigate();

	const handleUpdateEmail = (e) => {
		e.preventDefault();

		if (!loadingUpdateEmail) {
			if (partnerEmail.length === 0) {
				setErrorUpdateEmail(null);
				setSuccessUpdateEmail(null);
				setErrorUpdateEmail("Email is required");
				setTimeout(function () {
					setErrorUpdateEmail(null);
				}, 2500)
			} else if (!validEmail.test(partnerEmail)) {
				setErrorUpdateEmail("Invalid email");
				setTimeout(function () {
					setErrorUpdateEmail(null);
				}, 2500)
			} else if (stripped.length === 0) {
				setErrorUpdateEmail("Unable to get partner details");
				setTimeout(function () {
					setErrorUpdateEmail(null);
				}, 2500)
			} else {
				setLoadingUpdateEmail(true);

				const updateEmailRes = updateEmail(cookie, {
					email: partnerEmail
				})

				updateEmailRes.then(res => {
					setLoadingUpdateEmail(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							const error_2 = `${res.error.response.data.data[0].msg}`;
							setErrorUpdateEmail(error_2 || error);
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
						setSuccessUpdateEmail(`Partner email edited successfully!`);

						setTimeout(function () {
							setSuccessUpdateEmail(null);
							setRemoveUpdateEmailModal(true);
							removeCookie();
							navigate(`/access/${stripped}`);
							window.location.reload(true);
							setPartnerEmail("");
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdateEmail(false);
				})

			}
		}
	};

	return {
		cookie, partnerEmail, loadingUpdateEmail, errorUpdateEmail, successUpdateEmail, handleUpdateEmail, handlePartnerEmail, setPartnerEmail, 
		removeUpdateEmailModal, setRemoveUpdateEmailModal, handleStripped
	};
};

const useUpdateDescription = () => {

	const {cookie} = useCookie(config.token, "");

	const [loadingUpdateDescription, setLoadingUpdateDescription] = useState(false);
	const [partnerDescription, setPartnerDescription] = useState("");

	const [errorUpdateDescription, setErrorUpdateDescription] = useState(null);
	const [successUpdateDescription, setSuccessUpdateDescription] = useState(null);

	const handlePartnerDescription = (e) => { e.preventDefault(); setPartnerDescription(e.target.value); };

	const handleUpdateDescription = (e) => {
		e.preventDefault();

		if (!loadingUpdateDescription) {
			if (partnerDescription.length === 0) {
				setErrorUpdateDescription(null);
				setSuccessUpdateDescription(null);
				setErrorUpdateDescription("Description is required");
				setTimeout(function () {
					setErrorUpdateDescription(null);
				}, 2500)
			} else if (partnerDescription.length < 3) {
				setErrorUpdateDescription("Min character - 3");
				setTimeout(function () {
					setErrorUpdateDescription(null);
				}, 2500)
			} else if (partnerDescription.length > 500) {
				setErrorUpdateDescription("Max character - 500");
				setTimeout(function () {
					setErrorUpdateDescription(null);
				}, 2500)
			} else {
				setLoadingUpdateDescription(true);

				const updateDescriptionRes = updateDescription(cookie, {
					description: partnerDescription
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
						setSuccessUpdateDescription(`Partner description edited successfully!`);

						setTimeout(function () {
							setSuccessUpdateDescription(null);
							setPartnerDescription("");
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdateDescription(false);
				})

			}
		}
	};

	return {
		cookie, partnerDescription, loadingUpdateDescription, errorUpdateDescription, successUpdateDescription, handleUpdateDescription, handlePartnerDescription, setPartnerDescription,
	};
};

const useUpdatePointThreshold = () => {

	const { cookie } = useCookie(config.token, "");

	const [loadingUpdatePointThreshold, setLoadingUpdatePointThreshold] = useState(false);
	const [pointThreshold, setPointThreshold] = useState(null);

	const [errorUpdatePointThreshold, setErrorUpdatePointThreshold] = useState(null);
	const [successUpdatePointThreshold, setSuccessUpdatePointThreshold] = useState(null);

	const handlePointThreshold = (e) => { e.preventDefault(); setPointThreshold(e.target.value); };

	const handleUpdatePointThreshold = (e) => {
		e.preventDefault();

		if (!loadingUpdatePointThreshold) {
			if (pointThreshold < 1) {
				setErrorUpdatePointThreshold(null);
				setSuccessUpdatePointThreshold(null);
				setErrorUpdatePointThreshold("Point Threshold is required");
				setTimeout(function () {
					setErrorUpdatePointThreshold(null);
				}, 2500)
			} else {
				setLoadingUpdatePointThreshold(true);

				const updatePointThresholdRes = updatePointThreshold(cookie, {
					point_threshold: pointThreshold
				})

				updatePointThresholdRes.then(res => {
					setLoadingUpdatePointThreshold(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorUpdatePointThreshold(error);
							setTimeout(function () {
								setErrorUpdatePointThreshold(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorUpdatePointThreshold(error);
							setTimeout(function () {
								setErrorUpdatePointThreshold(null);
							}, 2000)
						}
					} else {
						setErrorUpdatePointThreshold(null);
						setSuccessUpdatePointThreshold(`Point Threshold updated successfully!`);

						setTimeout(function () {
							setSuccessUpdatePointThreshold(null);
							setPointThreshold(null);
						}, 2500)
					}
				}).catch(err => {
					setLoadingUpdatePointThreshold(false);
				})

			}
		}
	};

	return {
		cookie, pointThreshold, loadingUpdatePointThreshold, errorUpdatePointThreshold, successUpdatePointThreshold, handleUpdatePointThreshold, handlePointThreshold, setPointThreshold,
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
					website_url: companyWebsiteUrl === null ? undefined : companyWebsiteUrl,
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

const useUploadPartnerProfilePhoto = () => {

	const storage = getStorage(app);

	const {cookie} = useCookie(config.token, "");

	const [loadingProfilePhoto, setLoadingProfilePhoto] = useState(false);
	const [partnerUniqueId, setPartnerUniqueId] = useState("");
	const [selectedProfilePhoto, setSelectedProfilePhoto] = useState("");
	const [uploadingProfilePhotoPercentage, setUploadingProfilePhotoPercentage] = useState(0);

	const [errorProfilePhoto, setErrorProfilePhoto] = useState(null);
	const [successProfilePhoto, setSuccessProfilePhoto] = useState(null);

	const allowed_extensions = ["image/png", "image/PNG", "image/jpg", "image/JPG", "image/jpeg", "image/JPEG", "image/webp", "image/WEBP"];
	const maximum_file_size = 5 * 1024 * 1024;

	const handleUploadProfilePhoto = (e) => {
		e.preventDefault();

		if (!loadingProfilePhoto) {
			if (partnerUniqueId.length === 0) {
				setErrorProfilePhoto(null);
				setSuccessProfilePhoto(null);
				setErrorProfilePhoto("Partner ID is required");
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
	
				const profilePhotoProofRes = getPartnerProfilePhotoProof({ partner_unique_id: partnerUniqueId })
	
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

						const imagePath = "/partners/" + profile_image_rename + "." + ext;

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
									
									const updatePartnerProfileImageRes = updateProfilePhoto(cookie, {
										photo: downloadURL,
										photo_file_ext: imagePath
									})

									updatePartnerProfileImageRes.then(res => {
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
		cookie, loadingProfilePhoto, errorProfilePhoto, successProfilePhoto, handleUploadProfilePhoto, partnerUniqueId, setSelectedProfilePhoto, 
		setPartnerUniqueId, uploadingProfilePhotoPercentage, selectedProfilePhoto,
	};
};

const useUploadPartnerProfileCover = () => {

	const storage = getStorage(app);

	const { cookie } = useCookie(config.token, "");

	const [loadingProfileCover, setLoadingProfileCover] = useState(false);
	const [partnerUniqueId, setPartnerUniqueId] = useState("");
	const [selectedProfileCover, setSelectedProfileCover] = useState("");
	const [uploadingProfileCoverPercentage, setUploadingProfileCoverPercentage] = useState(0);

	const [errorProfileCover, setErrorProfileCover] = useState(null);
	const [successProfileCover, setSuccessProfileCover] = useState(null);

	const allowed_extensions = ["image/png", "image/PNG", "image/jpg", "image/JPG", "image/jpeg", "image/JPEG", "image/webp", "image/WEBP"];
	const maximum_file_size = 5 * 1024 * 1024;

	const handleUploadProfileCover = (e) => {
		e.preventDefault();

		if (!loadingProfileCover) {
			if (partnerUniqueId.length === 0) {
				setErrorProfileCover(null);
				setSuccessProfileCover(null);
				setErrorProfileCover("Partner ID is required");
				setTimeout(function () {
					setErrorProfileCover(null);
				}, 2000)
			} else if (!allowed_extensions.includes(selectedProfileCover.type)) {
				setErrorProfileCover("Invalid image format (.png, .jpg, .jpeg & .webp)");
				setTimeout(function () {
					setErrorProfileCover(null);
				}, 2000)
			} else if (selectedProfileCover.size > maximum_file_size) {
				setErrorProfileCover("File too large (max 5mb)");
				setTimeout(function () {
					setErrorProfileCover(null);
				}, 2000)
			} else {
				setLoadingProfileCover(true);

				const profileCoverProofRes = getPartnerProfileCoverProof({ partner_unique_id: partnerUniqueId })

				profileCoverProofRes.then(res => {
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setUploadingProfileCoverPercentage(0);
							setLoadingProfileCover(false);
							setErrorProfileCover(error);
							setTimeout(function () {
								setErrorProfileCover(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setUploadingProfileCoverPercentage(0);
							setLoadingProfileCover(false);
							setErrorProfileCover(error);
							setTimeout(function () {
								setErrorProfileCover(null);
							}, 2000)
						}
					} else {
						const profile_cover_rename = res.data.data[0].photo;
						let lastDot = selectedProfileCover.name.lastIndexOf('.');
						let ext = selectedProfileCover.name.substring(lastDot + 1);

						const imagePath = "/partners/" + profile_cover_rename + "." + ext;

						const storageRef = ref(storage, imagePath);
						const uploadTask = uploadBytesResumable(storageRef, selectedProfileCover);

						uploadTask.on('state_changed',
							(snapshot) => {
								const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
								setUploadingProfileCoverPercentage(progress);
							},
							(error) => {
								setUploadingProfileCoverPercentage(0);
								setLoadingProfileCover(false);
								setErrorProfileCover("An error occured while uploading");
								setTimeout(function () {
									setErrorProfileCover(null);
								}, 3000)
							},
							() => {
								getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

									const updatePartnerProfileImageRes = updateProfileCover(cookie, {
										cover: downloadURL,
										cover_file_ext: imagePath
									})

									updatePartnerProfileImageRes.then(res => {
										if (res.err) {
											if (!res.error.response.data.success) {
												const error = `${res.error.response.data.message}`;
												setUploadingProfileCoverPercentage(0);
												setLoadingProfileCover(false);
												setErrorProfileCover(error);
												setTimeout(function () {
													setErrorProfileCover(null);
												}, 2000)
											} else {
												const error = `${res.error.code} - ${res.error.message}`;
												setUploadingProfileCoverPercentage(0);
												setLoadingProfileCover(false);
												setErrorProfileCover(error);
												setTimeout(function () {
													setErrorProfileCover(null);
												}, 2000)
											}
										} else {
											setErrorProfileCover(null);
											setUploadingProfileCoverPercentage(0);
											setSuccessProfileCover(`Profile cover uploaded successfully!`);

											setTimeout(function () {
												setLoadingProfileCover(false);
												setSuccessProfileCover(null);
												window.location.reload(true);
											}, 3000)
										}
									}).catch(err => {
										setUploadingProfileCoverPercentage(0);
										setLoadingProfileCover(false);
									})
								});

							}
						)
					}
				}).catch(err => {
					setUploadingProfileCoverPercentage(0);
					setLoadingProfileCover(false);
				})
			}
		}
	};

	return {
		cookie, loadingProfileCover, errorProfileCover, successProfileCover, handleUploadProfileCover, partnerUniqueId, setSelectedProfileCover,
		setPartnerUniqueId, uploadingProfileCoverPercentage, selectedProfileCover,
	};
};

const useUploadPartnerComplianceDocument = () => {

	const storage = getStorage(app);

	const {cookie} = useCookie(config.token, "");

	const [loadingComplianceDocument, setLoadingComplianceDocument] = useState(false);
	const [partnerUniqueId, setPartnerUniqueId] = useState("");
	const [selectedComplianceDocument, setSelectedComplianceDocument] = useState("");
	const [uploadingComplianceDocumentPercentage, setUploadingComplianceDocumentPercentage] = useState(0);

	const [errorComplianceDocument, setErrorComplianceDocument] = useState(null);
	const [successComplianceDocument, setSuccessComplianceDocument] = useState(null);

	const allowed_extensions = ["image/png", "image/PNG", "image/jpg", "image/JPG", "image/jpeg", "image/JPEG", "application/pdf", "application/PDF"];
	const maximum_file_size = 5 * 1024 * 1024;

	const handleUploadComplianceDocument = (e) => {
		e.preventDefault();

		if (!loadingComplianceDocument) {
			if (partnerUniqueId.length === 0) {
				setErrorComplianceDocument(null);
				setSuccessComplianceDocument(null);
				setErrorComplianceDocument("Partner ID is required");
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

				const complianceDocumentProofRes = getPartnerComplianceDocumentsProof({ partner_unique_id: partnerUniqueId })

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
						const partner_file_rename = res.data.data[1].registration_document;
						let lastDot = selectedComplianceDocument.name.lastIndexOf('.');
						let ext = selectedComplianceDocument.name.substring(lastDot + 1);

						const filePath = "/partners/" + partner_file_rename + "." + ext;

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

									const updatePartnerRegistrationDocumentRes = updateComplianceDocument(cookie, {
										registration_document: downloadURL,
										registration_document_file_ext: filePath
									})

									updatePartnerRegistrationDocumentRes.then(res => {
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
		cookie, loadingComplianceDocument, errorComplianceDocument, successComplianceDocument, handleUploadComplianceDocument, partnerUniqueId, setSelectedComplianceDocument,
		setPartnerUniqueId, uploadingComplianceDocumentPercentage, selectedComplianceDocument,
	};
};

const useUploadPartnerComplianceCertificate = () => {

	const storage = getStorage(app);

	const {cookie} = useCookie(config.token, "");

	const [loadingComplianceCertificate, setLoadingComplianceCertificate] = useState(false);
	const [partnerUniqueId, setPartnerUniqueId] = useState("");
	const [selectedComplianceCertificate, setSelectedComplianceCertificate] = useState("");
	const [uploadingComplianceCertificatePercentage, setUploadingComplianceCertificatePercentage] = useState(0);

	const [errorComplianceCertificate, setErrorComplianceCertificate] = useState(null);
	const [successComplianceCertificate, setSuccessComplianceCertificate] = useState(null);

	const allowed_extensions = ["image/png", "image/PNG", "image/jpg", "image/JPG", "image/jpeg", "image/JPEG", "application/pdf", "application/PDF"];
	const maximum_file_size = 5 * 1024 * 1024;

	const handleUploadComplianceCertificate = (e) => {
		e.preventDefault();

		if (!loadingComplianceCertificate) {
			if (partnerUniqueId.length === 0) {
				setErrorComplianceCertificate(null);
				setSuccessComplianceCertificate(null);
				setErrorComplianceCertificate("Partner ID is required");
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

				const complianceCertificateProofRes = getPartnerComplianceDocumentsProof({ partner_unique_id: partnerUniqueId })

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
						const partner_file_rename = res.data.data[0].registration_certificate;
						let lastDot = selectedComplianceCertificate.name.lastIndexOf('.');
						let ext = selectedComplianceCertificate.name.substring(lastDot + 1);

						const filePath = "/partners/" + partner_file_rename + "." + ext;

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

									const updatePartnerRegistrationCertificateRes = updateComplianceCertificate(cookie, {
										registration_certificate: downloadURL,
										registration_certificate_file_ext: filePath
									})

									updatePartnerRegistrationCertificateRes.then(res => {
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
		cookie, loadingComplianceCertificate, errorComplianceCertificate, successComplianceCertificate, handleUploadComplianceCertificate, partnerUniqueId, setSelectedComplianceCertificate,
		setPartnerUniqueId, uploadingComplianceCertificatePercentage, selectedComplianceCertificate,
	};
};

export { 
	useUpdateName, useUpdateEmail, useUpdateDescription, useUpdateComplianceDetails, useResetMasterToken, useUpdatePointThreshold,  
	useUploadPartnerProfilePhoto, useUploadPartnerComplianceDocument, useUploadPartnerComplianceCertificate, useUploadPartnerProfileCover
};