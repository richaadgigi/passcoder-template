import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCookie from './useCookie';
import { businessSignup, loginViaEmail, loginViaToken, resendVerificationEmail, resetMasterToken, verifyEmail, verifyEmailOtp } from "../api/auth";
import { config } from "../config";

const useBusinessSignUp = () => {

	const [loading, setLoading] = useState(false);

	// declaring and initializing (to null) values
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [description, setDescription] = useState("");
	const [hospitality, setHospitality] = useState("");
	const [country, setCountry] = useState("");

	// error & success prompts
	const [errorBusinessSignup, setErrorBusinessSignup] = useState(null);
	const [successBusinessSignup, setSuccessBusinessSignup] = useState(null);

	// validating values that need precision
	const validEmail = new RegExp(config.EMAIL_REGEX);

	const navigate = useNavigate();

	// handling all onChange states
	const handleName = (e) => { e.preventDefault(); setErrorBusinessSignup(null); setSuccessBusinessSignup(null); setName(e.target.value) };
	const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
	const handleDescription = (e) => { e.preventDefault(); setDescription(e.target.value) };
	const handleHospitality = (e) => { e.preventDefault(); setHospitality(e.target.value) };
	const handleCountry = (e) => { e.preventDefault(); setCountry(e.target.value) };

	const handleSubmit = (e) => {
		e.preventDefault();

		if (name.length < 2) {
			setErrorBusinessSignup(null);
			setSuccessBusinessSignup(null);
			setErrorBusinessSignup("Name is required | Min character - 2");
		} else if (name.length > 50) {
			setErrorBusinessSignup("Invalid Name | Max character - 50");
		} else if (email.length === 0) {
			setErrorBusinessSignup("Email is required");
		} else if (!validEmail.test(email)) {
			setErrorBusinessSignup("Invalid email");
		} else if (description.length < 3) {
			setErrorBusinessSignup("Description is required | Min character - 3");
		} else if (description.length > 500) {
			setErrorBusinessSignup("Invalid Description | Max character - 500");
		} else if (!country) {
			setErrorBusinessSignup("Country is required");
		} else {
			setErrorBusinessSignup(null);
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
						const error = `${res.error.responsedata.message} - ${res.error.response.data.data[0].msg}`;
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
						navigate(`/verify-email?${email=email}`);
						window.location.reload(true);
					}, 2000)

					// setName("");
					// setEmail("");
					// setDescription("");
					// setHospitality("");
					// setCountry("");
				}
			}).catch(err => {
				setLoading(false);
			})

		}
	};

	return {
		email, name, hospitality, description, country, errorBusinessSignup, successBusinessSignup, loading,
		handleEmail, handleName, handleHospitality, handleDescription, handleCountry, handleSubmit
	};
};

const useLoginViaEmail = () => {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorLogin, setErrorLogin] = useState(null);
    const [successLogin, setSuccessLogin] = useState(null);

    const [cookie, updateCookie] = useCookie(config.token, "");

    const navigate = useNavigate();

    const handleEmail = (e) => { e.preventDefault(); setEmail(e.target.value) };
    const handlePassword = (e) => { e.preventDefault(); setPassword(e.target.value) };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.length === 0) {
            setErrorEmail("Email is required");
        } else {
            setLoading(true);

            const loginRes = adminLogin({ email, password })

            loginRes.then(res => {
                setLoading(false);
                if (res.err) {
                    if(!res.error.response.data.success) {
                        const error = `${res.error.response.data.message}`;
                        setErrorLogin(error);
                        setTimeout(function () {
                            setErrorLogin(null);
                        }, 2000)
                    } else {
                        const error = `${res.error.code} - ${res.error.message}`;
                        setErrorLogin(error);
                        setTimeout(function () {
                            setErrorLogin(null);
                        }, 2000)
                    }
                } else {
                    setErrorLogin(null);
                    setSuccessLogin("Login successful ...");

                    setTimeout(function () {
                        updateCookie(res.data.data.token, 1);
                        navigate("/guests");
                        window.location.reload(true);
                    }, 2000)
                }
            }).catch(err => {
                setLoading(false);
            })

        }
    };

    return {
        email, password, errorEmail, errorPassword, errorLogin, successLogin, cookie, loading,
        handleEmail, handlePassword, handleSubmit
    };
};