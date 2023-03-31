import { Link } from "react-router-dom";
import SuccessTick from "../assets/images/success-tick.png";

export default function TokenSuccess(){
    return(
        <>
        <div className="xui-max-w-500 xui-w-fluid-100 xui-mt-2 xui-md-mt-none">
            <div className="xui-bg-white xui-bdr-rad-half xui-w-fluid-100 xui-p-1-half xui-pb-3 xui-text-black">
                <div className="xui-my-3">
                    <img src={SuccessTick} className="xui-img-100 xui-mx-auto" alt="success-tick" />
                    <h2 className="xui-font-sz-125 xui-w-fluid-80 xui-mx-auto xui-text-center xui-mt-1-half">Token reset successful</h2>
                </div>
                <div className="xui-d-flex xui-flex-jc-flex-end xui-mt-6">
                    <div>
                        <span className="xui-font-sz-80">Go back to <Link to="/sign-in" className="psc-text xui-font-w-bold">sign in</Link></span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}