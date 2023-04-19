import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from './useCookie';
import { businessSignup, loginViaEmail, loginViaToken, resendVerificationEmail, resetMasterToken, verifyEmail, verifyEmailOtp } from "../api/auth";
import { config } from "../config";

const useBusinessSignUp = () => {

	const [loading, setLoading] = useState(false);
	const [loadingResend, setLoadingResend] = useState(false);
	const [showVerificationEmail, setShowVerificationEmail] = useState(false);

	// declaring and initializing (to null) values
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [description, setDescription] = useState("");
	const [hospitality, setHospitality] = useState(false);
	const [country, setCountry] = useState("");
	const [terms_and_conditions, setTermsAndConditions] = useState(false);

	// error & success prompts
	const [errorBusinessSignup, setErrorBusinessSignup] = useState(null);
	const [successBusinessSignup, setSuccessBusinessSignup] = useState(null);
	const [errorVerificationEmail, setErrorVerificationEmail] = useState(null);
	const [successVerificationEmail, setSuccessVerificationEmail] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);
	
	// handling all onChange states
	const handleName = (e) => { e.preventDefault(); setErrorBusinessSignup(null); setSuccessBusinessSignup(null); setName(e.target.value) };
	const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
	const handleDescription = (e) => { e.preventDefault(); setDescription(e.target.value) };
	const handleHospitality = (e) => { e.preventDefault(); setHospitality(!hospitality); };
	const handleCountry = (e) => { e.preventDefault(); setCountry(e.target.value) };
	const handleTermsAndConditions = (e) => { e.preventDefault(); setTermsAndConditions(!terms_and_conditions); };

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!loading) {
			if (name.length < 2) {
				setErrorBusinessSignup(null);
				setSuccessBusinessSignup(null);
				setErrorBusinessSignup("Name is required | Min character - 2");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else if (name.length > 50) {
				setErrorBusinessSignup("Invalid Name | Max character - 50");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else if (email.length === 0) {
				setErrorBusinessSignup("Email is required");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else if (!validEmail.test(email)) {
				setErrorBusinessSignup("Invalid email");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else if (description.length < 3) {
				setErrorBusinessSignup("Description is required | Min character - 3");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else if (description.length > 500) {
				setErrorBusinessSignup("Invalid Description | Max character - 500");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else if (!country) {
				setErrorBusinessSignup("Country is required");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else if (!terms_and_conditions) {
				setErrorBusinessSignup("Accept terms and conditions");
				setTimeout(function () {
					setErrorBusinessSignup(null);
				}, 2500)
			} else {
				setLoading(true);
	
				const businessSignupRes = businessSignup({
					name,
					email,
					description,
					hospitality,
					country
				})
	
				businessSignupRes.then(res => {
					setLoading(false);
					if (res.err) {
						if (!res.error.response.data.success) {
							const error = `${res.error.response.data.message} - ${res.error.response.data.data[0].msg}`;
							setErrorBusinessSignup(error);
							setTimeout(function () {
								setErrorBusinessSignup(null);
							}, 2000)
						} else {
							const error = `${res.error.code} - ${res.error.message}`;
							setErrorBusinessSignup(error);
							setTimeout(function () {
								setErrorBusinessSignup(null);
							}, 2000)
						}
					} else {
						setErrorBusinessSignup(null);
						setSuccessBusinessSignup(`Sign up successful ...`);
	
						setTimeout(function () {
							setShowVerificationEmail(true);
							setSuccessBusinessSignup(null);
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
		email, name, hospitality, description, country, errorBusinessSignup, successBusinessSignup, loading,
		handleEmail, handleName, handleHospitality, handleDescription, handleCountry, handleSubmit, terms_and_conditions,
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

    const [cookie, updateCookie] = useCookie(config.token, "");

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

	const [cookie, updateCookie] = useCookie(config.token, "");

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

export { useBusinessSignUp, useLoginViaEmail, useLoginViaToken, useResetMasterToken, useVerifyEmail };