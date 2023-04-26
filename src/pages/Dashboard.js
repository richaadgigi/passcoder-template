import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Screen from '../components/Screen';
import Content from '../components/Content';
import Navbar from '../components/Navbar';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import Arrowright from '../icons/Arrowright';
import Tag from '../icons/Tag';
import Team from '../icons/Team';
import Users from '../icons/Users';
import Arrowleft from '../icons/Arrowleft';
import Star from '../icons/Star';
import { useGetPartner, useGetPartnerMetrics } from "../hooks/usePartner";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Copy from "../icons/Copy";
import Check from "../icons/Check";

export default function Dashboard(){
    const { cookie } = useCookie(config.token, "");
    
    const loc = useLocation();
    const { pathname } = useLocation();
    const _stripped = pathname.replace("/", "");
    const stripped = _stripped.split("/")[0];

    const [copiedAccessUrl, setCopiedAccessURL] = useState(false);

    const { partnerDetails } = useGetPartner();
    const { partnerMetrics } = useGetPartnerMetrics();

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
    };

    const copyAccessURL = (AccessURL) => {
        copyText(AccessURL);
        setCopiedAccessURL(true);
        setTimeout(function () {
            setCopiedAccessURL(false);
        }, 2000)
    };
    return(
        <>
            <Screen aside="true" navbar="false">
                <Content>
                    <Navbar placeholder="Search something..." makeHidden={true} />
                    <section className='xui-mb-3'>
                    <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-lg-grid-gap-2'>
                        <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                        <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                            <h3 className='xui-font-sz-180 xui-font-w-normal'>{partnerMetrics ? partnerMetrics.data.total_partner_users.toLocaleString() : <Loading width="12" height="12" />}</h3>
                            <span className='xui-font-sz-90'>Your Users</span>
                        </div>
                        </div>
                        <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                        <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                            <h3 className='xui-font-sz-180 xui-font-w-normal'>{partnerMetrics ? partnerMetrics.data.total_general_users.toLocaleString() : <Loading width="12" height="12" />}</h3>
                            <span className='xui-font-sz-90'>Passcoder Total Users</span>
                        </div>
                        </div>
                    </div>
                    <div className='xui-mt-1-half xui-text-center'>
                        <p className='xui-font-sz-90'>
                            <span className='xui-opacity-5'>Profile URL: </span>
                            <a href={partnerDetails ? partnerDetails.data.access_url : ""} className='xui-cursor-pointer psc-text'>{partnerDetails ? partnerDetails.data.access_url : "..."}</a> 
                            {
                                partnerDetails ? 
                                <span className="xui-cursor-pointer xui-ml-1" onClick={() => { if (partnerDetails) copyAccessURL(partnerDetails.data.access_url); }}>
                                    {copiedAccessUrl ? <Check width="16" height="16" /> : <Copy width="16" height="16" />}
                                </span> : 
                                ""
                            }
                        </p> 
                    </div>
                    </section>
                    <section className=''>
                        <div className='xui-text-center'>
                            <h1 className='xui-font-sz-180'>Verify User</h1>
                            <form className='xui-form xui-max-w-450 xui-mx-auto'>
                                <div className='xui-form-box xui-max-w-300 xui-mx-auto'>
                                    <select className='xui-bdr-rad-half'>
                                        <option value={"Passcoder offer"}>Passcoder offer</option>
                                    </select>
                                </div>
                                <div className='xui-form-box'>
                                    <p className='xui-opacity-5 xui-font-sz-95 xui-w-fluid-70 xui-mx-auto xui-my-3'>Input the user’s Passcoder ID to verify their account for this offer</p>
                                </div>
                                <div className='xui-form-box'>
                                    <input className='xui-bdr-rad-half' type='text' placeholder='PID' />
                                </div>
                                <div className='xui-form-box'>
                                    <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                        <span className="xui-mr-half">Verify user</span>
                                        <Arrowright width="12" height="12" />
                                    </button>
                                </div>
                                <span className='xui-opacity-4 xui-font-sz-100 xui-font-w-700 xui-open-sidebar'>Click to open right sidebar</span>
                            </form>
                        </div>
                    </section>
                    <section className="xui-d-grid xui-lg-grid-col-1 xui-grid-gap-2 xui-mt-4 xui-bg-blue xui-text-white xui-bdr-rad-half">
                        <div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
                            <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-1 xui-grid-gap-2 xui-mt-2 xui-text-center">
                                <div>
                                    <p>Enjoy more features with premium, get increased efficiency in our partner when you upgrade</p>
                                </div>
                                <div>
                                    <Link to={`/${stripped}/transactions`} className="xui-text-dc-none" >
                                        <button className="xui-btn-block psc-btn-blue-alt-2 xui-bdr-rad-half xui-font-sz-85">
                                                Upgrade to Premium
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-3 xui-md-grid-col-1 xui-grid-gap-1 xui-mt-2 xui-text-center">
                                <p className="xui-font-sz-80 xui-my-1r">
                                    <div className="xui-d-inline-flex xui-flex-ai-center">
                                        <span><Tag /></span>
                                        <p className='xui-font-sz-150 xui-ml-1'>Offers</p>
                                    </div>
                                </p>
                                <p className="xui-font-sz-80 xui-my-1r">
                                    <div className="xui-d-inline-flex xui-flex-ai-center">
                                        <span><Team /></span>
                                        <p className='xui-font-sz-150 xui-ml-1'>Loyalties</p>
                                    </div>
                                </p>
                                <p className="xui-font-sz-80 xui-my-1r">
                                    <div className="xui-d-inline-flex xui-flex-ai-center">
                                        <span><Users width="20" height="20" /></span>
                                        <p className='xui-font-sz-150 xui-ml-1'>Teams</p>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </section>
                </Content>
                <div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
                    <p className='xui-opacity-5 xui-font-sz-90 xui-line-height-1-half xui-w-fluid-80'>Issue loyalty points directly to your new and existing Passcoder users.</p>
                    <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-mt-1-half'>
                        <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Loyalty</button>
                        <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Check out</button>
                    </div>
                    <div className='xui-mt-5'>
                        <div className='xui-d-flex xui-flex-ai-baseline xui-flex-jc-space-between'>
                            <div className='xui-pl-1'>
                                <img className='xui-img-100' src={Boxes} alt='boxes' />
                            </div>
                            <div className='xui-pr-1'>
                                <img className='xui-img-100' src={FlowerPlant} alt='flower plant' />
                            </div>
                        </div>
                        <div className='psc-bg-light-blue-ii xui-px-1 xui-pt-5 xui-pb-1 xui-mt--4'>
                            <h4 className='xui-font-sz-90 xui-mt-half'>Earn more with offers</h4>
                            <p className='xui-opacity-4 xui-font-sz-85 xui-line-height-1-half xui-mt-half xui-w-fluid-90'>Premium partners can earn more and attract more customers with amazing offers. Create yours now.</p>
                            <button className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85 xui-mt-2'>Create an offer</button>
                        </div>
                    </div>
                </div>
            </Screen>
        </>
    );
}