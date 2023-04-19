import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Swap from "../../icons/Swap";
import Arrowright from "../../icons/Arrowright";
import { useLoginViaEmail, useLoginViaToken } from '../../hooks/useAuth';
import { getAccessDetails } from "../../api/platform";
import { useRef } from "react";
import Loading from "../../icons/Loading";

export default function SignIn(){
    const { 
        errorLogin, errorOtp, handleEmail, handleOtpSubmit, handleRememberMe, handleOtpResend, successOtp,
        handleStripped, handleSubmit, loading, successLogin, remember_me, showOtp, setShowOtp, loadingResend
    } = useLoginViaEmail();
    const { 
        errorTokenLogin, handleRememberMe: tokenHandleRememberMe, handleRole, handleStripped: tokenHandleStripped, 
        handleToken, handleTokenSubmit, loading: tokenLoading, remember_me: tokenRememberMe, successTokenLogin
    } = useLoginViaToken();
    const [accessDetails, setAccessDetails] = useState(null);
    const [otpError, setOtpError] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const flipCard = document.querySelector(".psc-flip-card");
    const flip = () => {
        if(flipped){
            setFlipped(false);
            flipCard.classList.remove("psc-flipped");
            setShowOtp(false);
        } else {
            setFlipped(true);
            flipCard.classList.add("psc-flipped");
        }
    }

    useEffect(() => {
        if (successLogin) setTimeout(function () { flip(); }, 2000)
    }, [successLogin]);
    const { pathname } = useLocation();
    const stripped = pathname.replace("/access/", "");
    const reset_master_token_url = "/reset-master-token?business=" + stripped;

    useEffect(() => {
        async function getPlatformAccessDetails() {
            const response = await getAccessDetails(stripped);
            setAccessDetails(response.data)
        }
        if (accessDetails === null) {
            getPlatformAccessDetails();
            handleStripped(stripped);
            tokenHandleStripped(stripped);
        }
    }, [accessDetails]);

    const inputRefs = useRef([]);
    const handleSubmitOtp = async (event) => {
        event.preventDefault();
        const otp = inputRefs.current.map((ref) => ref.value).join("");
        if (otp.length < 6) {
            setOtpError(true);
        } else {
            handleOtpSubmit(otp);
        }
    };

    const handleInput = (index, event) => {
        const { value } = event.target;
        if (index >= 5) setOtpError(false);
        if (value.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        if (event.key === "Backspace" && index > 0 && index <= 6) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (index, event) => {
        setOtpError(false);
        const pastedData = event.clipboardData.getData("text/plain");
        const digits = pastedData.split("");
        let currentInputIndex = index;
        digits.forEach((digit) => {
            if (currentInputIndex >= inputRefs.current.length) {
                return;
            }
            inputRefs.current[currentInputIndex].value = digit;
            currentInputIndex++;
        });
        event.preventDefault();
    };

    const inputFields = [];

    for (let i = 0; i < 6; i++) {
        inputFields.push(
            <input
                key={i}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                ref={(ref) => (inputRefs.current[i] = ref)}
                onInput={(event) => handleInput(i, event)}
                onKeyUp={(event) => handleInput(i, event)}
                onPaste={(event) => handlePaste(i, event)}
            />
        );
    }
    return(
        <>
            <div className="psc-flip-card xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
                <div className="psc-flip-card-inner xui-w-fluid-100">
                    <div className="psc-flip-card-front xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                        <h2 className="xui-font-sz-125 xui-w-fluid-80">Welcome back <span className="psc-text">{accessDetails !== null ? accessDetails.data.name : ""}</span></h2>
                        <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Securely sign in to your Passcoder business account</p>
                        <p className="xui-font-sz-80 xui-my-2"><span className="xui-opacity-7">Don't have an account?</span> <Link to="/signup" className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                        <form className="xui-form" layout="2" onSubmit={handleSubmit}>
                            <div className="xui-form-box xui-mt-4">
                                <input className="xui-font-sz-90" type="email" onChange={handleEmail} required placeholder="Email Address"></input>
                            </div>
                            <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-between">
                                <div className="xui-d-inline-flex xui-flex-ai-center">
                                    <input type="checkbox" onChange={handleRememberMe} checked={remember_me} id="remember-me-email" />
                                    <label for="remember-me-email" className="xui-ml-half" style={{ marginBottom: '0' }}>Remember me</label>
                                </div>
                            </div>
                            <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                                <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                    <span className="xui-mr-half">Next</span>
                                    {
                                        loading ? 
                                        <Loading width="12" height="12" />
                                        : <Arrowright width="12" height="12" />
                                    }
                                </button>
                            </div>
                        </form>
                        <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorLogin}</span></p>
                        <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successLogin}</span></p>
                        <div className="psc-broken-line-text xui-opacity-4">
                            <span className="xui-font-sz-80 xui-font-w-700">or</span>
                        </div>
                        <button className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5" onClick={flip}>
                            <Swap width="16" height="16" />
                            <span className="xui-font-sz-90 xui-ml-2">Sign in via token</span>
                        </button>
                    </div>
                    <div className="psc-flip-card-back xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-text-black">
                        <h2 className="xui-font-sz-125 xui-w-fluid-80">Sign In to <span className="psc-text">{accessDetails !== null ? accessDetails.data.name : ""}</span></h2>
                        <p className="xui-font-sz-80 xui-my-1"><span className="xui-opacity-7">Don't have an account?</span> <Link to="/signup" className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                        <form className="xui-form" layout="2" onSubmit={handleTokenSubmit}>
                            <div className="xui-form-box xui-mt-2">
                                <select onChange={handleRole} required>
                                    <option selected disabled>Select role</option>
                                    <option value={"ADMIN"}>Admin</option>
                                    <option value={"USER"}>User</option>
                                </select>
                            </div>
                            <div className="xui-form-box">
                                <input className="xui-font-sz-90" type="password" onChange={handleToken} required placeholder="Token"></input>
                            </div>
                            <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-between">
                                <div className="xui-d-inline-flex xui-flex-ai-center">
                                    <input type="checkbox" onChange={tokenHandleRememberMe} checked={tokenRememberMe} id="remember-me" />
                                    <label for="remember-me" className="xui-ml-half" style={{marginBottom: '0'}}>Remember me</label>
                                </div>
                                <Link to={reset_master_token_url} className="psc-text xui-font-w-bold xui-font-sz-80">Forgot admin token?</Link>
                            </div>
                            <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                                <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                    <span className="xui-mr-half">Sign In</span>
                                    {
                                        tokenLoading ?
                                            <Loading width="12" height="12" />
                                            : <Arrowright width="12" height="12" />
                                    }
                                </button>
                            </div>
                        </form>
                        <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorTokenLogin}</span></p>
                        <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successTokenLogin}</span></p>
                        <div className="psc-broken-line-text xui-opacity-4">
                            <span className="xui-font-sz-80 xui-font-w-700">or</span>
                        </div>
                        <button className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5" onClick={flip}>
                            <Swap width="16" height="16" />
                            <span className="xui-font-sz-90 xui-ml-2">Sign in via email</span>
                        </button>
                    </div>
                    {
                        showOtp ? 
                        <div className="psc-flip-card-back xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-p-1-half xui-text-black">
                            <h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center">OTP Verfication</h2>
                            <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half xui-text-center xui-w-fluid-70 xui-mx-auto xui-line-height-1-half">A one time password has been sent to your email, kindly fill it in below.</p>
                            <form onSubmit={handleSubmitOtp}>
                                <div class="otp-field xui-d-flex xui-flex-jc-center xui-my-2">
                                    {inputFields}
                                </div>
                                <p className="xui-font-sz-80 xui-my-2 xui-text-center"><span className="xui-opacity-7">Didn't get it?</span> <span style={{ cursor: "pointer" }} className="xui-font-w-bold psc-text xui-text-dc-underline" onClick={handleOtpResend}>Resend OTP</span></p>
                                {
                                    otpError ? 
                                    <p className="xui-font-sz-80 xui-my-2 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">Incomplete OTP code</span></p>
                                    : ""
                                }
                                <div className="xui-mt-3 xui-d-flex xui-flex-jc-flex-end">
                                    <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                        <span className="xui-mr-half">{loadingResend ? "Resending" : "Sign in"}</span>
                                        {
                                            loading || loadingResend ?
                                                <Loading width="12" height="12" />
                                                : <Arrowright width="12" height="12" />
                                        }
                                    </button>
                                </div>
                                <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorOtp}</span></p>
                                <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successOtp}</span></p>
                            </form>

                            <div className="psc-broken-line-text xui-opacity-4">
                                <span className="xui-font-sz-80 xui-font-w-700">or</span>
                            </div>
                            <button className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5" onClick={flip}>
                                <Swap width="16" height="16" />
                                <span className="xui-font-sz-90 xui-ml-2">Sign in via token</span>
                            </button>
                        </div> 
                        : ""
                    }
                </div>
            </div>
        </>
    )
}