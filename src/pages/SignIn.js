import { useState } from "react";
import { Link } from "react-router-dom";
import Wallet from "../icons/Wallet";
import Arrowright from "../icons/Arrowright";

export default function SignIn(){
    const [flipped, setFlipped] = useState(false);
    const flipCard = document.querySelector(".psc-flip-card");
    const flip = () => {
        if(flipped){
            setFlipped(false);
            flipCard.classList.remove("psc-flipped");
          }
          else {
            setFlipped(true);
            flipCard.classList.add("psc-flipped");
          }
    }
    return(
        <>
        <div className="psc-flip-card xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
        <div className="psc-flip-card-inner xui-w-fluid-100">
            <div className="psc-flip-card-front xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                <h2 className="xui-font-sz-125 xui-w-fluid-80">Welcome back <span className="psc-text">Genesis Cinemas</span></h2>
                <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Securely sign in to your Passcoder partner account</p>
                <p className="xui-font-sz-80 xui-my-2"><span className="xui-opacity-7">Don't have an account?</span> <Link to="/signup" className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                <form className="xui-form" layout="2">
                    <div className="xui-form-box xui-mt-4">
                        <input className="xui-font-sz-90" type="text" placeholder="Email Address"></input>
                    </div>
                    <div className="xui-d-flex xui-flex-jc-flex-end">
                        <Link to="/" className="psc-text xui-font-w-bold xui-font-sz-80">Forgot password?</Link>
                    </div>
                    <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                        <Link to="/otp-verification" className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                            <span className="xui-mr-half">Next</span>
                            <Arrowright width="12" height="12" />
                        </Link>
                    </div>
                </form>
                <div className="psc-broken-line-text xui-opacity-4">
                    <span className="xui-font-sz-80 xui-font-w-700">or</span>
                </div>
                <button className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5" onClick={flip}>
                    <Wallet width="16" height="16" />
                    <span className="xui-font-sz-90 xui-ml-2">Sign in via token</span>
                </button>
            </div>
            <div className="psc-flip-card-back xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-text-black">
                <h2 className="xui-font-sz-125 xui-w-fluid-80">Sign In</h2>
                <p className="xui-font-sz-80 xui-my-1"><span className="xui-opacity-7">Don't have an account?</span> <Link to="/signup" className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                <form className="xui-form" layout="2">
                    <div className="xui-form-box xui-mt-3">
                        <select>
                            <option value={"Admin"}>Admin</option>
                            <option value={"Member"}>Member</option>
                        </select>
                    </div>
                    <div className="xui-form-box">
                        <input className="xui-font-sz-90" type="password" placeholder="Token"></input>
                    </div>
                    <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-between">
                        <div className="xui-d-inline-flex xui-flex-ai-center">
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me" className="xui-ml-half" style={{marginBottom: '0'}}>Remember me</label>
                        </div>
                        <Link to="/" className="psc-text xui-font-w-bold xui-font-sz-80">Forgot token?</Link>
                    </div>
                    <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                        <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                            <span className="xui-mr-half">Sign In</span>
                            <Arrowright width="12" height="12" />
                        </button>
                    </div>
                </form>
                <div className="psc-broken-line-text xui-opacity-4">
                    <span className="xui-font-sz-80 xui-font-w-700">or</span>
                </div>
                <button className="xui-btn-block xui-btn-black xui-font-sz-90 xui-d-flex xui-flex-ai-center xui-flex-jc-center xui-mt-1-half xui-bdr-rad-5" onClick={flip}>
                    <Wallet width="16" height="16" />
                    <span className="xui-font-sz-90 xui-ml-2">Sign in via email</span>
                </button>
            </div>
        </div>
    </div>
        </>
    )
}