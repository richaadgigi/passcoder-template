// import Filter from '../icons/Filter';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Navbar from '../components/Navbar';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import Arrowright from '../icons/Arrowright';

export default function Dashboard(){
    return(
        <>
        <Screen aside="true" navbar="false">
            <Content>
                <Navbar placeholder="Search something..." makeHidden={true} />
                <section className='xui-mb-3'>
                <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-lg-grid-gap-2'>
                    <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                    <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                        <h3 className='xui-font-sz-180 xui-font-w-normal'>517</h3>
                        <span className='xui-font-sz-90'>Your users</span>
                    </div>
                    </div>
                    <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')"}}>
                    <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                        <h3 className='xui-font-sz-180 xui-font-w-normal'>30,937</h3>
                        <span className='xui-font-sz-90'>Passcoder Total Users</span>
                    </div>
                    </div>
                </div>
                <div className='xui-mt-1-half xui-text-center'>
                    <p className='xui-font-sz-80'><span className='xui-opacity-5'>Profile URL: </span><span className='xui-opacity-5 xui-font-w-bold'>business.passcoder.io/business-name</span> - <span className='xui-cursor-pointer psc-text'>Click to copy</span></p>
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
                            <span className='xui-opacity-4 xui-font-sz-80 xui-font-w-700 xui-open-sidebar'>Click to open right sidebar (take if off later)</span>
                        </form>
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