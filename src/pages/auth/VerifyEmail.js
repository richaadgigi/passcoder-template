import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Arrowright from "../../icons/Arrowright";
import SuccessTick from "../../assets/images/success-tick.png";
import Boxes from '../../assets/images/boxes.png';
import { useVerifyEmail } from "../../hooks/useAuth";

export default function VerifyEmail(){
    const {
        errorVerifyEmail, successVerifyEmail, accessDetails, handleVerification
    } = useVerifyEmail();
    const [params, setParams] = useSearchParams();
    const _email = params.get('email');
    const _verification_id = params.get('verification_id');
    
    const sign_in_url = (accessDetails ? "/access/" + accessDetails.stripped : "/signup");

    useEffect(() => {
        setTimeout(function () {
            if (accessDetails === null) {
                handleVerification(_email, _verification_id);
            }
        }, 2000)
    }, [accessDetails]);

    return(
        <>
        <div className="xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
            <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                {
                    accessDetails ? 
                    <div className="xui-my-3">
                        <img src={SuccessTick} className="xui-img-100 xui-mx-auto" alt="success-tick" />
                        <h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center xui-mt-1-half">{successVerifyEmail}</h2>
                        <p className="xui-font-sz-100 xui-w-fluid-80 xui-mx-auto xui-text-center xui-text-red xui-mt-1-half">{errorVerifyEmail}</p>
                    </div> : 
                    <div className="xui-my-3">
                        <img className='xui-img-100 xui-mx-auto' src={Boxes} alt='logo' />
                        <h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center xui-mt-1-half">{successVerifyEmail || "Processing verification ..."}</h2>
                        <p className="xui-font-sz-100 xui-w-fluid-80 xui-mx-auto xui-text-center xui-text-red xui-mt-1-half">{errorVerifyEmail}</p>
                    </div>
                }
                <div className="xui-mt-3 xui-d-flex xui-flex-jc-flex-end">
                    <Link to={sign_in_url} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                        <span className="xui-mr-half">{accessDetails ? "Login" : "Sign Up"}</span>
                        <Arrowright width="12" height="12" />
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}