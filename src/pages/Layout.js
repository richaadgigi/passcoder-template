import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from '../assets/images/logo-white.png';
import Category from '../icons/Category';
import Swap from '../icons/Swap';
import Users from '../icons/Users';
import Wallet from '../icons/Wallet';
import Setting from '../icons/Setting';
import Check from '../icons/Check';
import Close from '../icons/Close';
import Logout from '../icons/Logout';
import { config } from "../config";
import useCookie from "../hooks/useCookie";
import { useGetPlatform } from "../hooks/usePlatform";
import Loading from "../icons/Loading";
import '../assets/css/style.css';

// function Truncate(string, len){
//     return string.substring(0, len) + '...';
// }

export default function Layout(){
    const loc = useLocation();
    const { pathname } = useLocation();
    const _stripped = pathname.replace("/", "");
    const stripped = _stripped.split("/")[0];
    
    const {removeCookie} = useCookie(config.token, "");
    const { platformDetails } = useGetPlatform();

    const navigate = useNavigate();

    const [loadingLogout, setLoadingLogout] = useState(false);

    const handleLogout = () => {
        setLoadingLogout(true);
        setTimeout(function () {
            removeCookie();
            window.location.reload(true);
            navigate(`/access/${stripped}`);
        }, 1500)
    }

    return(
        <>
            <section className="xui-dashboard">
                <div className="navigator xui-text-white xui-px-2 disable-scrollbars">
                    <div className="brand xui-pt-2">
                        <div className="maxified xui-d-flex xui-flex-ai-center">
                            <Link className='xui-text-inherit xui-text-dc-none' to={`/${stripped}/dashboard`}>
                                <div className='xui-d-inline-flex'>
                                <img className='xui-img-30' src={Logo} alt='logo' />
                                <div className='xui-pl-1'>
                                    <p className='xui-font-w-bold'>Passcoder</p>
                                    <span className='xui-font-sz-70 xui-opacity-7'>for business</span>
                                </div>
                                </div>
                            </Link>
                        </div>        
                    </div>
                    <div className="links xui-pt-2">
                        <div className='xui-d-flex psc-dashboard-profile'>
                        <div className='xui-w-50 xui-h-50 xui-bdr-rad-half xui-bg-pos-center xui-bg-sz-cover' style={{ backgroundImage: `url(${platformDetails ? platformDetails.data.photo : <Loading width="12" height="12" />})`}}></div>
                        <div className='xui-pl-half' style={{width: "calc(100% - 50px)"}}>
                            <h3 className='xui-font-sz-90 xui-font-w-normal'>{platformDetails ? platformDetails.data.name : <Loading width="12" height="12" />}</h3>
                            <span className='xui-d-inline-block xui-font-sz-70 xui-opacity-5'>
                                {platformDetails ? (
                                    platformDetails.data.verified ? 
                                    <span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Verified</span> :
                                    <span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Not verified</span>
                                ) : ""}
                            </span>
                            {/* <span className='xui-d-inline-block xui-font-sz-70 xui-opacity-5'>{Truncate('gigirichardofficial@gmail.com', 18)}</span> */}
                        </div>
                        </div>
                        <Link to={`/${stripped}/dashboard`} className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 " + (loc.pathname === `/${stripped}/dashboard` ? 'active' : '')}>
                            <div className="icon">
                                <Category width="20" height="20" />
                            </div>
                            <div className="name xui-ml-half">
                                <span>Dashboard</span>
                            </div>
                        </Link>
                        <Link to={`/${stripped}/api-history`} className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 " + (loc.pathname === `/${stripped}/api-history` ? 'active' : '')}>
                            <div className="icon">
                                <Swap width="20" height="20" />
                            </div>
                            <div className="name xui-ml-half">
                                <span>API History</span>
                            </div>
                        </Link>
                        <Link to={`/${stripped}/wallet`} className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 " + (loc.pathname === `/${stripped}/wallet` ? 'active' : '')}>
                            <div className="icon">
                                <Wallet width="20" height="20" />
                            </div>
                            <div className="name xui-ml-half">
                                <span>Wallet</span>
                            </div>
                        </Link>
                        <Link to={`/${stripped}/teams`} className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 " + (loc.pathname === `/${stripped}/teams` ? 'active' : '')}>
                            <div className="icon">
                                <Users width="20" height="20" />
                            </div>
                            <div className="name xui-ml-half">
                                <span>Teams</span>
                            </div>
                        </Link>
                        <Link to={`/${stripped}/settings`} className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6" + (loc.pathname === `/${stripped}/settings` ? 'active' : '')}>
                            <div className="icon">
                                <Setting />
                            </div>
                            <div className="name xui-ml-half">
                                <span>Settings</span>
                            </div>
                        </Link> 
                        <div xui-modal-open="logoutModal" className="bottom-fixed xui-mt--5 xui-cursor-pointer">
                            <div className="xui-text-inherit link-box xui-font-sz-90 xui-opacity-6">
                                <div className="icon">
                                    <Logout width="20" height="20" />
                                </div>
                                <div className="name xui-ml-half">
                                    <span>Logout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className='xui-modal' xui-modal="logoutModal" id="logoutModal">
                    <div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
                        <center>
                            <h1>Logout confirmation</h1>
                            <p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Are you sure you want to cotinue with this action?</p>
                        </center>
                        <div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
                            <div className="xui-d-inline-flex xui-flex-ai-center">
                                <button onClick={handleLogout} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                    <span className="xui-mr-half">Yes</span>
                                    {
                                        loadingLogout ?
                                            <Loading width="12" height="12" />
                                            : <Check width="20" height="20" />
                                    }
                                </button>
                            </div>
                            <div className="xui-d-inline-flex xui-flex-ai-center">
                                <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close="logoutModal">
                                    <span className="xui-mr-half">No</span>
                                    <Close width="20" height="20" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <Outlet />
            </section>
        </>
    );
}