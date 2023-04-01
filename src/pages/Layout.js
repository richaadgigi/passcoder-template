import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from '../assets/images/logo-white.png';
import Category from '../icons/Category';
import Swap from '../icons/Swap';
import Wallet from '../icons/Wallet';
import Setting from '../icons/Setting';
import Logout from '../icons/Logout';
import '../assets/css/style.css';

function Truncate(string, len){
    return string.substring(0, len) + '...';
}

export default function Layout(){
    const loc = useLocation();
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
            <div className='xui-w-50 xui-h-50 xui-bdr-rad-half xui-bg-pos-center xui-bg-sz-cover' style={{backgroundImage: 'url("https://images.unsplash.com/photo-1597245514561-8858803ae955?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5pZ2VyaWFuJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")'}}></div>
            <div className='xui-pl-half' style={{width: "calc(100% - 50px)"}}>
                <h3 className='xui-font-sz-90 xui-font-w-normal'>Gabriel Eikwu</h3>
                <span className='xui-d-inline-block xui-font-sz-70 xui-opacity-5'>{Truncate('gigirichardofficial@gmail.com', 18)}</span>
            </div>
            </div>
            <Link to='/' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 " + (loc.pathname === '/' ? 'active' : '')}>
                <div className="icon">
                    <Category width="20" height="20" />
                </div>
                <div className="name xui-ml-half">
                    <span>Dashboard</span>
                </div>
            </Link>
            <Link to='/api-history' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 " + (loc.pathname === '/api-history' ? 'active' : '')}>
                <div className="icon">
                    <Swap width="20" height="20" />
                </div>
                <div className="name xui-ml-half">
                    <span>API History</span>
                </div>
            </Link>
            <Link to='/wallet' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6 " + (loc.pathname === '/wallet' ? 'active' : '')}>
                <div className="icon">
                    <Wallet width="20" height="20" />
                </div>
                <div className="name xui-ml-half">
                    <span>Wallet</span>
                </div>
            </Link>
            <Link to='/settings' className={"xui-text-inherit link-box xui-font-sz-90 xui-opacity-6" + (loc.pathname === '/settings' ? 'active' : '')}>
                <div className="icon">
                    <Setting />
                </div>
                <div className="name xui-ml-half">
                    <span>Settings</span>
                </div>
            </Link> 
            <div className="bottom-fixed xui-mt--5">
                <Link to='/' className="xui-text-inherit link-box xui-font-sz-90 xui-opacity-6">
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