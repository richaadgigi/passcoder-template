import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from '../assets/images/logo-white.png';
import Category from '../icons/Category';
import Swap from '../icons/Swap';
import Users from '../icons/Users';
import Wallet from '../icons/Wallet';
import Setting from '../icons/Setting';
import Logout from '../icons/Logout';
import { config } from "../config";
import { getPlatform } from "../api/platform";
import useCookie from "../hooks/useCookie";
import Loading from "../icons/Loading";
import '../assets/css/style.css';

function Truncate(string, len){
    return string.substring(0, len) + '...';
}

export default function Layout(){
    const loc = useLocation();
    const { pathname } = useLocation();
    const _stripped = pathname.replace("/", "");
    const stripped = _stripped.split("/")[0];
    
    const [cookie, removeCookie] = useCookie(config.token, "");
    const [platformDetails, setPlatformDetails] = useState(null);

    useEffect(() => {
        async function getPlatformDetails() {
            const response = await getPlatform(cookie);
            setPlatformDetails(response.data);
        }
        if (platformDetails === null) {
            getPlatformDetails();
        }
    }, [platformDetails]);

    return(
        <>
        <section className="xui-dashboard">
        <div className="navigator xui-text-white xui-px-2 disable-scrollbars">
        <div className="brand xui-pt-2">
            <div className="maxified xui-d-flex xui-flex-ai-center">
            <Link className='xui-text-inherit xui-text-dc-none' to="/">
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
            <div onClick={removeCookie} className="bottom-fixed xui-mt--5">
                <Link to={`/access/${stripped}`} className="xui-text-inherit link-box xui-font-sz-90 xui-opacity-6">
                    <div className="icon">
                        <Logout width="20" height="20" />
                    </div>
                    <div className="name xui-ml-half">
                        <span>Logout</span>
                    </div>
                </Link>
            </div>
        </div>
        </div>
        <Outlet />
        </section>
        </>
    );
}