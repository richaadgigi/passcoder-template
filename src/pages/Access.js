import { Outlet } from "react-router-dom";
import Logo from '../assets/images/logo-white.png';

export default function Access(){
    return(
        <>
        <section className="xui-bg-pos-center xui-bg-sz-cover xui-bg-blue" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1665686306265-c52ee9054479?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")'}}>
            <div className="psc-cover-page xui-overlay xui-d-flex xui-container xui-py-2 xui-flex-jc-center xui-md-flex-jc-space-between xui-flex-ai-center">
                <div className="xui-w-100 xui-h-100 xui-bdr-rad-half psc-bg xui-d-inline-flex xui-flex-ai-center xui-flex-jc-center xui-text-center">
                    <div>
                        <img className='xui-img-30 xui-d-block xui-mx-auto' src={Logo} alt='logo' />
                        <span className="xui-d-block xui-font-sz-70 xui-text-uppercase xui-font-w-700 xui-mt-half">Partner</span>
                    </div>
                </div>
                <Outlet />
            </div>
        </section>
        </>
    );
}