import Search from '../icons/Search';
import Headertext from '../components/Headertext';

export default function Navbar(props){
    return (
        <nav menu="2" className="xui-navbar xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-px-1-half xui-lg-px-3">
            <div>
                <h1 className='xui-font-sz-150 xui-font-w-bold'><Headertext /></h1>
            </div>
            <div className="">
            <form className='psc-navbar-search xui-d-inline-flex xui-flex-ai-center xui-bg-light xui-p-1 xui-bdr-rad-half'>
                <Search width="15" height="15" />
                <input className='xui-font-sz-85 xui-d-none xui-lg-d-block' type="text" placeholder={props.placeholder} />
            </form>
            <div className="menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </div>
        </nav>
    );
}