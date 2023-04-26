import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from './useCookie';
import { partnerSignup, loginViaEmail, loginViaToken, resendVerificationEmail, resetMasterToken, verifyEmail, verifyEmailOtp } from "../api/auth";
import { config } from "../config";

const usePartnerSignUp = () => {

	const changeLGA = config.changeLGA;
	const [cities, setCities] = useState([]);

	const [loading, setLoading] = useState(false);
	const [loadingResend, setLoadingResend] = useState(false);
	const [showVerificationEmail, setShowVerificationEmail] = useState(false);

	// declaring and initializing (to null) values
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [description, setDescription] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState(null);
	const [terms_and_conditions, setTermsAndConditions] = useState(false);

	// error & success prompts
	const [errorPartnerSignup, setErrorPartnerSignup] = useState(null);
	const [successPartnerSignup, setSuccessPartnerSignup] = useState(null);
	const [errorVerificationEmail, setErrorVerificationEmail] = useState(null);
	const [successVerificationEmail, setSuccessVerificationEmail] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);
	
	// handling all onChange states
	const handleName = (e) => { e.preventDefault(); setErrorPartnerSignup(null); setSuccessPartnerSignup(null); setName(e.target.value) };
	const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
	const handleDescription = (e) => { e.preventDefault(); setDescription(e.target.value) };
	const handleCity = (e) => { e.preventDefault(); setCity(e.target.value) };
	const handleState = (e) => { e.preventDefault(); setState(e.target.value); setCities(changeLGA(e.target.value)) };
	const handleCountry = (e) => { e.preventDefault(); setCountry(e.target.value) };
	const handleTermsAndConditions = (e) => { e.preventDefault(); setTermsAndConditions(!terms_and_conditions); };

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!loading) {
			if (name.length < 2) {
				setErrorPartnerSignup(null);
				setSuccessPartnerSignup(null);
				setErrorPartnerSignup("Name is required | Min character - 2");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (name.length > 50) {
				setErrorPartnerSignup("Invalid Name | Max character - 50");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (email.length === 0) {
				setErrorPartnerSignup("Email is required");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (!validEmail.test(email)) {
				setErrorPartnerSignup("Invalid email");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (description.length < 3) {
				setErrorPartnerSignup("Description is required | Min character - 3");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (description.length > 500) {
				setErrorPartnerSignup("Invalid Description | Max character - 500");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (!country) {
				setErrorPartnerSignup("Country is required");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (!state) {
				setErrorPartnerSignup("State is required");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (!city) {
				setErrorPartnerSignup("City is required");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else if (!terms_and_conditions) {
				setErrorPartnerSignup("Accept terms and conditions");
				setTimeout(function () {
					setErrorPartnerSignup(null);
				}, 2500)
			} else {
				setLoading(true);
	
				const partnerSignupRes = partnerSignup({
					name,
					email,
					description,
					country,
					state,
					city
				})
	
				partnerSignupRes.then(res => {
					setLoading(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message} - ${res.error.response.data.data[0].msg}`;
							setErrorPartnerSignup(error);
							setTimeout(function () {
								setErrorPartnerSignup(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorPartnerSignup(error);
							setTimeout(function () {
								setErrorPartnerSignup(null);
							}, 2000)
						}
					} else {
						setErrorPartnerSignup(null);
						setSuccessPartnerSignup(`Sign up successful ...`);
	
						setTimeout(function () {
							setShowVerificationEmail(true);
							setSuccessPartnerSignup(null);
						}, 2500)
					}
				}).catch(err => {
					setLoading(false);
				})
	
			}
		}
	};

	const handleVerificationEmailResend = () => {
		if (!loadingResend) {
			setLoadingResend(true);
			const resendVerificationEmailRes = resendVerificationEmail({ email });
	
			resendVerificationEmailRes.then(res => {
				setLoadingResend(false);
				if (res.err) {
					if (!res.error.response.data.success) {
						const error = `${res.error.response.data.message}`;
						setErrorVerificationEmail(error);
						setTimeout(function () {
							setErrorVerificationEmail(null);
						}, 2500)
					} else {
						const error = `${res.error.code} - ${res.error.message}`;
						setErrorVerificationEmail(error);
						setTimeout(function () {
							setErrorVerificationEmail(null);
						}, 2500)
					}
				} else {
					setErrorVerificationEmail(null);
					setSuccessVerificationEmail("Verification email resent successfully!");
	
					setTimeout(function () {
						setSuccessVerificationEmail(null);
					}, 3000);
				}
			}).catch(err => {
				setLoadingResend(false);
			})
		}
	};

	return {
		email, name, state, city, description, country, errorPartnerSignup, successPartnerSignup, loading, cities, 
		handleEmail, handleName, handleState, handleCity, handleDescription, handleCountry, handleSubmit, terms_and_conditions,
		handleTermsAndConditions, loadingResend, showVerificationEmail, handleVerificationEmailResend, errorVerificationEmail, 
		successVerificationEmail
	};
};

const useLoginViaEmail = () => {

    const [loading, setLoading] = useState(false);
	const [loadingResend, setLoadingResend] = useState(false);

    const [email, setEmail] = useState(null);
	const [stripped, setStripped] = useState(null);
	const [remember_me, setRememberMe] = useState(false);
	const [showOtp, setShowOtp] = useState(false);
    const [errorEmail, setErrorEmail] = useState(null);
	const [errorOtp, setErrorOtp] = useState(null);
	const [successOtp, setSuccessOtp] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);
    const [successLogin, setSuccessLogin] = useState(null);

    const {cookie, updateCookie} = useCookie(config.token, "");

    const navigate = useNavigate();

    const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
	const handleRememberMe = (e) => { e.preventDefault(); setRememberMe(!remember_me); };
	const handleStripped = (stripped) => { setStripped(stripped); };

    const handleSubmit = (e) => {
        e.preventDefault();

		if (!loading) {
			if (email.length === 0) {
				setErrorEmail("Email is required");
				setTimeout(function () {
					setErrorLogin(null);
				}, 2500)
			} else {
				setLoading(true);
				const loginRes = loginViaEmail(stripped, { email });
	
				loginRes.then(res => {
					setLoading(false);
					if (res.err) {
						if(!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorLogin(error);
							setTimeout(function () {
								setErrorLogin(null);
							}, 2500)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorLogin(error);
							setTimeout(function () {
								setErrorLogin(null);
							}, 2500)
						}
					} else {
						setErrorLogin(null);
						setSuccessLogin("OTP sent successfully!");
	
						setTimeout(function () {
							setShowOtp(true);
							setLoading(false);
							setSuccessLogin(null);
						}, 2000)
					}
				}).catch(err => {
					setLoading(false);
				})
			}
		}
    };

	const handleOtpSubmit = (otp) => {
		if (!loading) {
			setLoading(true);
			const verifyOtpRes = verifyEmailOtp(stripped, { email, otp, remember_me });
	
			verifyOtpRes.then(res => {
				setLoading(false);
				if (res.err) {
					if (!res.error.response.data.success) {
						const error = `${res.error.response.data.message}`;
						setErrorOtp(error);
						setTimeout(function () {
							setErrorOtp(null);
						}, 2500)
					} else {
						const error = `${res.error.code} - ${res.error.message}`;
						setErrorOtp(error);
						setTimeout(function () {
							setErrorOtp(null);
						}, 2500)
					}
				} else {
					setErrorOtp(null);
					setSuccessOtp("Login successful!");
					updateCookie(res.data.data.token, (remember_me ? 7 : 1));
	
					setTimeout(function () {
						setSuccessOtp(null);
						navigate(`/${stripped}/dashboard`);
						window.location.reload(true);
					}, 2000);
				}
			}).catch(err => {
				setLoading(false);
			})
		}
	};

	const handleOtpResend = () => {
		if (!loadingResend) {
			setLoadingResend(true);
			const resendOtpRes = loginViaEmail(stripped, { email });
	
			resendOtpRes.then(res => {
				setLoadingResend(false);
				if (res.err) {
					if (!res.error.response.data.success) {
						const error = `${res.error.response.data.message}`;
						setErrorOtp(error);
						setTimeout(function () {
							setErrorOtp(null);
						}, 2500)
					} else {
						const error = `${res.error.code} - ${res.error.message}`;
						setErrorOtp(error);
						setTimeout(function () {
							setErrorOtp(null);
						}, 2500)
					}
				} else {
					setErrorOtp(null);
					setSuccessOtp("OTP sent successfully!");
	
					setTimeout(function () {
						setSuccessOtp(null);
					}, 2000);
				}
			}).catch(err => {
				setLoadingResend(false);
			})
		}
	};
	
    return {
		email, remember_me, errorEmail, errorOtp, errorLogin, successLogin, cookie, loading, showOtp, 
		handleEmail, handleRememberMe, handleSubmit, handleStripped, handleOtpSubmit, setShowOtp, successOtp,
		handleOtpResend, loadingResend
    };
};

const useLoginViaToken = () => {

	const [loading, setLoading] = useState(false);
	const [stripped, setStripped] = useState(null);
	const [remember_me, setRememberMe] = useState(false);
	const [role, setRole] = useState("");
	const [token, setToken] = useState(null);
	const [errorTokenLogin, setErrorTokenLogin] = useState(null);
	const [successTokenLogin, setSuccessTokenLogin] = useState(null);

	const {cookie, updateCookie} = useCookie(config.token, "");

	const navigate = useNavigate();

	const handleRememberMe = (e) => { e.preventDefault(); setRememberMe(!remember_me); };
	const handleStripped = (stripped) => { setStripped(stripped); };
	const handleRole = (e) => { e.preventDefault(); setRole(e.target.value) };
	const handleToken = (e) => { e.preventDefault(); setToken(e.target.value) };

	const handleTokenSubmit = (e) => {
		e.preventDefault();

		if (!loading) {
			if (role !== "ADMIN" && role !== "USER") {
				setErrorTokenLogin("Role is required (ADMIN or USER)");
				setTimeout(function () {
					setErrorTokenLogin(null);
				}, 2500)
			} else if (token.length === 0) {
				setErrorTokenLogin("Token is required");
				setTimeout(function () {
					setErrorTokenLogin(null);
				}, 2500)
			} else {
				setLoading(true);
				const tokenLoginRes = loginViaToken(stripped, { role, token, remember_me });
	
				tokenLoginRes.then(res => {
					setLoading(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorTokenLogin(error);
							setTimeout(function () {
								setErrorTokenLogin(null);
							}, 2500)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorTokenLogin(error);
							setTimeout(function () {
								setErrorTokenLogin(null);
							}, 2500)
						}
					} else {
						setSuccessTokenLogin("Login successful!");
						updateCookie(res.data.data.token, (remember_me ? 7 : 1));
	
						setTimeout(function () {
							setSuccessTokenLogin(null);
							navigate(`/${stripped}/dashboard`);
							window.location.reload(true);
						}, 2000);
					}
				}).catch(err => {
					setLoading(false);
				})
			}
		}
	};

	return {
		role, token, remember_me, cookie, loading, handleRole, handleToken, errorTokenLogin, successTokenLogin,
		handleRememberMe, handleStripped, handleTokenSubmit, 
	};
};

const useResetMasterToken = () => {

	const [loading, setLoading] = useState(false);
	const [showTokenResetSuccess, setShowTokenResetSuccess] = useState(false);
	const [email, setEmail] = useState(null);
	const [errorMasterTokenReset, setErrorMasterTokenReset] = useState(null);
	const [successMasterTokenReset, setSuccessMasterTokenReset] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);

	const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!loading) {
			if (email.length === 0) {
				setErrorMasterTokenReset("Email is required");
				setTimeout(function () {
					setErrorMasterTokenReset(null);
				}, 2500)
			} else if (!validEmail.test(email)) {
				setErrorMasterTokenReset("Invalid email");
				setTimeout(function () {
					setErrorMasterTokenReset(null);
				}, 2500)
			} else {
				setLoading(true);
				const resetMasterTokenRes = resetMasterToken({ email });
	
				resetMasterTokenRes.then(res => {
					setLoading(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message}`;
							setErrorMasterTokenReset(error);
							setTimeout(function () {
								setErrorMasterTokenReset(null);
							}, 2500)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorMasterTokenReset(error);
							setTimeout(function () {
								setErrorMasterTokenReset(null);
							}, 2500)
						}
					} else {
						setErrorMasterTokenReset(null);
						setSuccessMasterTokenReset("Token reset successful!");
	
						setTimeout(function () {
							setSuccessMasterTokenReset(null);
							setShowTokenResetSuccess(true);
						}, 2000);
					}
				}).catch(err => {
					setLoading(false);
				})
			}
		}
	};

	return {
		email, loading, handleEmail, errorMasterTokenReset, successMasterTokenReset, handleSubmit, showTokenResetSuccess
	};
};

const useVerifyEmail = () => {

	const [loading, setLoading] = useState(false);
	const [accessDetails, setAccessDetails] = useState(null);
	const [errorVerifyEmail, setErrorVerifyEmail] = useState(null);
	const [successVerifyEmail, setSuccessVerifyEmail] = useState(null);

	const handleVerification = (email, verification_id) => {
		if (!loading) {
			setLoading(true);
			const verifyEmailRes = verifyEmail({ email, verification_id });
	
			verifyEmailRes.then(res => {
				setLoading(false);
				if (res.err) {
					if (!res.error.response.data.success) {
						const error = `${res.error.response.data.message}`;
						setErrorVerifyEmail(error);
						// setTimeout(function () {
						// 	setErrorVerifyEmail(null);
						// }, 2500)
					} else {
						const error = `${res.error.code} - ${res.error.message}`;
						setErrorVerifyEmail(error);
						// setTimeout(function () {
						// 	setErrorVerifyEmail(null);
						// }, 2500)
					}
				} else {
					setErrorVerifyEmail(null);
					setSuccessVerifyEmail(res.data.message);
					setAccessDetails(res.data.data);
				}
			}).catch(err => {
				setLoading(false);
			})
		}
	};

	return {
		loading, errorVerifyEmail, successVerifyEmail, accessDetails, handleVerification
	};
};

export { usePartnerSignUp, useLoginViaEmail, useLoginViaToken, useResetMasterToken, useVerifyEmail };