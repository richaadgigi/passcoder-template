import { Link } from "react-router-dom";
import Arrowleft from "../icons/Arrowleft";
import Arrowright from "../icons/Arrowright";

export default function VerifyEmail(){
    return(
        <>
        <div className="xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
            <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                <Link to="/forgot-password" className="xui-w-40 xui-h-40 xui-bdr-rad-half psc-bg xui-text-white xui-d-inline-flex xui-flex-ai-center xui-flex-jc-center xui-mb-1-half">
                    <Arrowleft width="18" height="18" />
                </Link>
                <h2 className="xui-font-sz-125 xui-w-fluid-80">Check your email</h2>
                <p className="xui-font-sz-90 xui-mt-half"><span className="xui-opacity-5">We have sent an email with token reset information to </span><span className="psc-text">n****e@e***e.com</span></p>
                <p className="xui-font-sz-80 xui-my-4 xui-w-fluid-60"><span className="xui-opacity-7">Didn’t receive the email? Check spam or promotion folder</span></p>
                <div className="xui-d-flex xui-flex-jc-flex-end">
                    <div>
                        <span className="xui-font-sz-80"><Link to="/" className="psc-text xui-font-w-bold">Resend token</Link></span>
                    </div>
                </div>
                <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                    <Link to="/token-success" className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                        <span className="xui-mr-half">Continue</span>
                        <Arrowright width="12" height="12" />
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}