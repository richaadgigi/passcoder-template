import { Link, useSearchParams } from "react-router-dom";
import { useResetMasterToken } from "../../hooks/useAuth";
import Loading from "../../icons/Loading";
import SuccessTick from "../../assets/images/success-tick.png";
import Arrowleft from "../../icons/Arrowleft";
import Arrowright from "../../icons/Arrowright";

export default function ResetToken(){
    const {
        email, errorMasterTokenReset, handleEmail, handleSubmit, loading, showTokenResetSuccess, successMasterTokenReset
    } = useResetMasterToken();
    const [params, setParams] = useSearchParams();
    const partner = params.get('partner');
    const sign_in_url = "/access/" + partner;
    return(
        <>
        <div className="xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
            {
                !showTokenResetSuccess ?
                    <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                        <Link to={sign_in_url} className="xui-w-40 xui-h-40 xui-bdr-rad-half psc-bg xui-text-white xui-d-inline-flex xui-flex-ai-center xui-flex-jc-center xui-mb-1-half">
                            <Arrowleft width="18" height="18" />
                        </Link>
                        <h2 className="xui-font-sz-125 xui-w-fluid-80">Reset Token</h2>
                        <p className="xui-font-sz-80 xui-my-1"><span className="xui-opacity-7">Don't have an account?</span> <Link to="/signup" className="xui-font-w-bold psc-text xui-text-dc-none">Sign up</Link></p>
                        <form className="xui-form" layout="2" onSubmit={handleSubmit}>
                            <div className="xui-form-box xui-mt-4">
                                <input className="xui-font-sz-90" type="email" value={email} onChange={handleEmail} required placeholder="Email Address"></input>
                            </div>
                            <div className="xui-d-flex xui-flex-jc-flex-end">
                                <div>
                                    <p className="xui-font-sz-80">Remembered token? <Link to={sign_in_url} className="xui-font-w-bold psc-text xui-text-dc-none">Sign in</Link></p>
                                </div>
                            </div>
                            <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                                <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                    <span className="xui-mr-half">Continue</span>
                                    {
                                        loading ?
                                            <Loading width="12" height="12" />
                                            : <Arrowright width="12" height="12" />
                                    }
                                </button>
                            </div>
                        </form>
                        <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorMasterTokenReset}</span></p>
                        <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successMasterTokenReset}</span></p>
                    </div> :
                    <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                        <div className="xui-my-3">
                            <img src={SuccessTick} className="xui-img-100 xui-mx-auto" alt="success-tick" />
                            <h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center xui-mt-1-half">Token sent successfully</h2>
                            <p className="xui-font-sz-90 xui-w-fluid-80 xui-mx-auto xui-text-center xui-mt-1-half">We have reset your master token and sent an email with a new token to {email}.</p>
                        </div>
                        <p className="xui-font-sz-90 xui-my-3 xui-text-center xui-opacity-7"><span className="xui-opacity-7">Didn't receive the email? Check spam or promotion folder.</span></p>

                        <div className="xui-mt-3 xui-d-flex xui-flex-jc-flex-end">
                            <Link to={sign_in_url} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Login</span>
                                <Arrowright width="12" height="12" />
                            </Link>
                        </div>
                    </div>
            }
        </div>
        </>
    )
}