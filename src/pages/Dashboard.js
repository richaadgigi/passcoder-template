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
import { getPartnerOffers, getPartnerOffer } from "../api/offers";
import { useCheckoutLoyaltyPoint, useIssueLoyaltyPoint } from "../hooks/useLoyalties";
import { useAddOffer } from "../hooks/useOffers";
import { useOfferAuthenticateUser } from "../hooks/useRequests";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Copy from "../icons/Copy";
import Plus from "../icons/Plus";
import Minus from "../icons/Minus";
import Check from "../icons/Check";
import CheckCircle from "../icons/CheckCircle";

export default function Dashboard(){
    const { cookie, forceLogout } = useCookie(config.token, "");
    
    const loc = useLocation();
    const { pathname } = useLocation();
    const _stripped = pathname.replace("/", "");
    const stripped = _stripped.split("/")[0];

    const [copiedAccessUrl, setCopiedAccessURL] = useState(false);
    const [showIssuePointsCard, setShowIssuePointsCard] = useState(false);
    const [showCheckoutPointsCard, setShowCheckoutPointsCard] = useState(false);

    const {
        errorCheckoutLoyaltyPoint, handlePID: CheckoutHandlePID, handlePoints: CheckoutHandlePoints, handleSubmitCheckoutLoyaltyPoint,
        loadingCheckoutLoyaltyPoint, pid: CheckoutPID, points: CheckoutPoints, successCheckoutLoyaltyPoint
    } = useCheckoutLoyaltyPoint();

    const {
        errorIssueLoyaltyPoint, handlePID: IssueHandlePID, handlePoints: IssueHandlePoints, handleSubmitIssueLoyaltyPoint,
        loadingIssueLoyaltyPoint, pid: IssuePID, points: IssuePoints, successIssueLoyaltyPoint
    } = useIssueLoyaltyPoint();

    const {
        description, discount, end, errorAddOffer, handleDescription, handleDiscount, handleEnd, handleName, handleOfferLimit,
        handlePoints, handleSingle, handleStar, handleStart, handleSubmit, loading, name, offerLimit, points, removeAddOfferModal,
        setRemoveAddOfferModal, single, star, start, successAddOffer
    } = useAddOffer();

    const {
		errorOfferAuthenticateUser, handleOfferUniqueId, handlePID: OfferAuthenticateUserHandlePID, handleSubmitOfferAuthenticateUser, loadingOfferAuthenticateUser,
		offerUniqueId, pid: OfferAuthenticateUserPID, showOfferAuthenticateUserModal, setOfferUniqueId, setShowOfferAuthenticateUserModal, successOfferAuthenticateUser,
		authenticatedUserDetails, setAuthenticatedUserDetails
	} = useOfferAuthenticateUser();

    const { partnerDetails } = useGetPartner();
    const { partnerMetrics } = useGetPartnerMetrics();

    const [allOffers, setAllOffers] = useState(null);
	const [errorAllOffers, setErrorAllOffers] = useState(null);
	const [loadingAllOffers, setLoadingAllOffers] = useState(false);

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

    async function getAllOffers(_page, _size) {
		setLoadingAllOffers(true);
		const response = await getPartnerOffers(cookie, (_page || 1), (_size || 20));
		setAllOffers(response.data);
		if (response.response_code === 403) forceLogout();
		if (response.error) setErrorAllOffers(response.error.response.data.message);
		setLoadingAllOffers(false);
	};

    useEffect(() => {
		if (allOffers === null) {
			getAllOffers(1, 20);
		}
	}, [allOffers]);

    if (removeAddOfferModal) {
        const modalResponse = document.querySelector("#addOffer");
        modalResponse.setAttribute("display", false);
        setRemoveAddOfferModal(null);
    }

    if (successOfferAuthenticateUser) {
        const modalResponse = document.querySelector("#offerUserAuthenticated");
        modalResponse.setAttribute("display", true);
    }

    async function continueSuccessOfferAuthenticateUser() {
        const modalResponse = document.querySelector("#offerUserAuthenticated");
        modalResponse.setAttribute("display", false);
        setAuthenticatedUserDetails(null);
    }
    return(
        <>
            <Screen aside="true" navbar="false">
                <Content>
                    <Navbar placeholder="Search something..." makeHidden={true} />
                    <section className='xui-mb-3'>
                        <div className='xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-grid-gap-1 xui-lg-grid-gap-2'>
                            <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{ backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')" }}>
                                <div className='xui-py-1 xui-px-2 xui-overlay xui-h-fluid-100'>
                                    <h3 className='xui-font-sz-180 xui-font-w-normal'>{partnerMetrics ? partnerMetrics.data.total_partner_users.toLocaleString() : <Loading width="12" height="12" />}</h3>
                                    <span className='xui-font-sz-90'>Your Users</span>
                                </div>
                            </div>
                            <div className='xui-bg-pos-center xui-bg-sz-cover xui-bdr-rad-half xui-overflow-hidden' style={{ backgroundImage: "url('https://res.cloudinary.com/xnyder/image/upload/v1679054785/passcoder-for-business/17-athletics_y2m7nj.png')" }}>
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
                            <form className='xui-form xui-max-w-450 xui-mx-auto' onSubmit={handleSubmitOfferAuthenticateUser}>
                                <div className='xui-form-box xui-max-w-300 xui-mx-auto'>
                                    <select value={offerUniqueId} onChange={handleOfferUniqueId} className='xui-bdr-rad-half' required>
                                        <option selected disabled>Select Offer</option>
                                        {
                                            allOffers ? (
                                                allOffers.data.rows.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.unique_id}>{item.name}</option>
                                                    )
                                                })
                                            ) : ""
                                        }
                                    </select>
                                </div>
                                <div className='xui-form-box'>
                                    <p className='xui-opacity-5 xui-font-sz-95 xui-w-fluid-70 xui-mx-auto xui-my-3'>Input a user’s Passcoder ID to authenticate their account for an offer</p>
                                </div>
                                <div className='xui-form-box'>
                                    <input type="text" className="xui-bdr-rad-half" minLength={6} maxLength={6} value={OfferAuthenticateUserPID} onChange={OfferAuthenticateUserHandlePID} placeholder="Enter user PID" required ></input>
                                </div>
                                <div className='xui-form-box'>
                                    <button disabled={loadingOfferAuthenticateUser} className={`xui-d-inline-flex ${loadingOfferAuthenticateUser ? "psc-btn-blue-alt xui-mt-1" : "psc-btn-blue xui-mt-2"}s xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85`}>
                                        {
                                            loadingOfferAuthenticateUser ?
                                                <>
                                                    <span className="xui-mr-half">Awaiting authentication</span>
                                                    <Loading width="12" height="12" />
                                                </>
                                                : <>
                                                    <span className="xui-mr-half">Verify user</span>
                                                    <Arrowright width="12" height="12" />
                                                </>
                                        }
                                    </button>
                                </div>
                            </form>
                            <p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorOfferAuthenticateUser}</span></p>
							<p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successOfferAuthenticateUser}</span></p>
                            <span className='xui-opacity-4 xui-font-sz-100 xui-font-w-700 xui-open-sidebar xui-lg-d-none'>Click to open right sidebar</span>
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
                        <button onClick={() => { setShowIssuePointsCard(!showIssuePointsCard); setShowCheckoutPointsCard(false); }} className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Issue</button>
                        <button onClick={() => { setShowCheckoutPointsCard(!showCheckoutPointsCard); setShowIssuePointsCard(false); }} className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85'>Checkout</button>
                    </div>
                    {
                        showIssuePointsCard ?
                            <div className='psc-bg-light-blue-ii xui-mt-1 xui-px-1 xui-pt-1 xui-pb-1 xui-bdr-rad-half'>
                                <form className="xui-form" layout="2" onSubmit={handleSubmitIssueLoyaltyPoint}>
                                    <div className="xui-mt-1">
                                        <label>Passcoder ID</label>
                                        <input type="text" className="xui-bdr-black" minLength={6} maxLength={6} value={IssuePID} onChange={IssueHandlePID} placeholder="Enter user Passcoder ID" required ></input>
                                    </div>
                                    <div className="xui-mt-2">
                                        <label>Issue Points</label>
                                        <input type={"number"} className="xui-bdr-black" min={1} value={IssuePoints} onChange={IssueHandlePoints} placeholder="Points" required ></input>
                                    </div>
                                    <div className="xui-mt-1 xui-d-flex xui-flex-jc-flex-end">
                                        <button type="submit" className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
                                            {
                                                loadingIssueLoyaltyPoint ?
                                                    <Loading width="12" height="12" />
                                                    : <Plus width="20" height="20" />
                                            }
                                        </button>
                                    </div>
                                </form>
                                <p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorIssueLoyaltyPoint}</span></p>
                                <p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successIssueLoyaltyPoint}</span></p>
                            </div> : ""
                    }
                    {
                        showCheckoutPointsCard ?
                            <div className='psc-bg-light-blue-ii xui-mt-1 xui-px-1 xui-pt-1 xui-pb-1 xui-bdr-rad-half'>
                                <form className="xui-form" layout="2" onSubmit={handleSubmitCheckoutLoyaltyPoint}>
                                    <div className="xui-mt-1">
                                        <label>Passcoder ID</label>
                                        <input type="text" className="xui-bdr-black" minLength={6} maxLength={6} value={CheckoutPID} onChange={CheckoutHandlePID} placeholder="Enter user Passcoder ID" required ></input>
                                    </div>
                                    <div className="xui-mt-2">
                                        <label>Checkout Points</label>
                                        <input type={"number"} className="xui-bdr-black" min={1} value={CheckoutPoints} onChange={CheckoutHandlePoints} placeholder="Points" required ></input>
                                    </div>
                                    <div className="xui-mt-1 xui-d-flex xui-flex-jc-flex-end">
                                        <button type="submit" className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85">
                                            {
                                                loadingCheckoutLoyaltyPoint ?
                                                    <Loading width="12" height="12" />
                                                    : <Minus width="20" height="20" />
                                            }
                                        </button>
                                    </div>
                                </form>
                                <p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorCheckoutLoyaltyPoint}</span></p>
                                <p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successCheckoutLoyaltyPoint}</span></p>
                            </div> : ""
                    }
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
                            <button xui-modal-open="addOffer" className='xui-btn-block psc-btn-blue-alt xui-bdr-rad-half xui-font-sz-85 xui-mt-2'>Create an offer</button>
                        </div>
                    </div>
                </div>
            </Screen>
            <section className='xui-modal' xui-modal="addOffer" id="addOffer">
                <div className='xui-modal-content xui-max-h-600 xui-max-w-800 xui-overflow-auto xui-pos-relative'>
                    <div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="addOffer">
                        <Close width="24" height="24" />
                    </div>
                    <h1>New offer</h1>
                    <form className="xui-form" layout="2" onSubmit={handleSubmit}>
                        <div className="xui-form-box xui-mt-2">
                            <label>Name</label>
                            <input type="text" value={name} onChange={handleName} placeholder="Enter offer name" required ></input>
                        </div>
                        <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-3 xui-md-grid-col-3 xui-grid-gap-1">
                            <div className="xui-mt-1">
                                <label>Discount</label>
                                <input type={"number"} min={1} max={100} value={discount} onChange={handleDiscount} placeholder="Enter discount" required ></input>
                            </div>
                            <div className="xui-mt-1">
                                <label>Points</label>
                                <input type={"number"} min={1} value={points} onChange={handlePoints} placeholder="Minimum points" required ></input>
                            </div>
                            <div className="xui-mt-1">
                                <label>Star</label>
                                <input type={"number"} min={1} value={star} onChange={handleStar} placeholder="Minimum star" required ></input>
                            </div>
                        </div>
                        <div className="xui-form-box xui-d-flex xui-mt-2">
                            <div className="xui-d-inline-flex xui-flex-ai-center">
                                <input type="checkbox" onChange={handleSingle} checked={single} id="single" />
                                <label for="single" className="xui-ml-half" style={{ marginBottom: '0' }}>Single</label>
                            </div>
                        </div>
                        <div className="xui-form-box xui-mt-2">
                            <label>Description</label>
                            <textarea type={"text"} value={description} onChange={handleDescription} placeholder="Enter offer description" required></textarea>
                        </div>
                        <div className="psc-broken-line-text xui-opacity-4">
                            <span className="xui-font-sz-80 xui-font-w-700">Optional</span>
                        </div>
                        <div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-3 xui-md-grid-col-3 xui-grid-gap-1">
                            <div className="xui-mt-1">
                                <label>Offer Limit</label>
                                <input type={"number"} value={offerLimit} onChange={handleOfferLimit} placeholder="Enter limit" ></input>
                            </div>
                            <div className="xui-mt-1">
                                <label>Start</label>
                                <input className="xui-font-sz-90" type={"datetime-local"} value={start} onChange={handleStart}></input>
                            </div>
                            <div className="xui-mt-1">
                                <label>End</label>
                                <input className="xui-font-sz-90" type={"datetime-local"} value={end} onChange={handleEnd}></input>
                            </div>
                        </div>
                        <div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
                            <button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
                                <span className="xui-mr-half">Save offer</span>
                                {
                                    loading ?
                                        <Loading width="12" height="12" />
                                        : <Arrowright width="12" height="12" />
                                }
                            </button>
                        </div>
                    </form>
                    <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorAddOffer}</span></p>
                    <p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successAddOffer}</span></p>
                </div>
            </section>
            <section className='xui-modal' xui-modal="offerUserAuthenticated" id="offerUserAuthenticated">
				<div className='xui-modal-content xui-max-h-700 xui-max-w-800 xui-overflow-auto xui-pos-relative'>
					<h1>Offer Authentication</h1>
					<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Visible details of the user below</p>
					{
						authenticatedUserDetails ? 
						<>
                            <center className="xui-m-1-half">
                                <div className="xui-w-200 xui-h-200">
                                    <img className="xui-img-200 xui-bdr-rad-circle" src={authenticatedUserDetails.photo} alt={authenticatedUserDetails.name + " Selfie Image"} />
                                </div>
                            </center>
							<center>
								<p className="xui-opacity-4 xui-font-sz-150 xui-m-half">{authenticatedUserDetails.name}</p>
								<b className="xui-opacity-4 xui-font-sz-100 xui-m-half">PID - {authenticatedUserDetails.pid}</b>
								<center>
									<div className="xui-d-inline-flex xui-flex-ai-center">
										<span>
											{
												authenticatedUserDetails.star === 0 ?
													<div className='xui-m-half'>
														<p>No star</p>
													</div>
													: ""
											}
											{
												authenticatedUserDetails.star === 1 ?
													<div className='xui-m-half'>
														<Star width="18" height="18" />
													</div>
													: ""
											}
											{
												authenticatedUserDetails.star === 2 ?
													<div className='xui-m-half'>
														<Star width="18" height="18" />
														<Star width="18" height="18" />
													</div>
													: ""
											}
											{
												authenticatedUserDetails.star === 3 ?
													<div className='xui-m-half'>
														<Star width="18" height="18" />
														<Star width="18" height="18" />
														<Star width="18" height="18" />
													</div>
													: ""
											}
											{
												authenticatedUserDetails.star === 4 ?
													<div className='xui-m-half'>
														<Star width="18" height="18" />
														<Star width="18" height="18" />
														<Star width="18" height="18" />
														<Star width="18" height="18" />
													</div>
													: ""
											}
											{
												authenticatedUserDetails.star === 5 ?
													<div className='xui-m-half'>
														<Star width="18" height="18" />
														<Star width="18" height="18" />
														<Star width="18" height="18" />
														<Star width="18" height="18" />
														<Star width="18" height="18" />
													</div>
													: ""
											}
										</span>
									</div>
								</center>
								<div className="xui-d-inline-flex xui-flex-ai-center">
									<span><CheckCircle width="20" height="20" /></span>
									<p className="xui-opacity-4 xui-font-sz-90 xui-m-half">Authenticated {authenticatedUserDetails.verification_count > 1 ? authenticatedUserDetails.verification_count.toLocaleString() + " times." : "once, just now."}</p>
								</div>
							</center>
							<div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly ">
								<p className="xui-opacity-4 xui-font-sz-90 xui-m-half">Total Points: <b>{authenticatedUserDetails.user_points.toLocaleString()}</b></p>
								<p className="xui-opacity-4 xui-font-sz-90 xui-m-half">Points with you: <b>{authenticatedUserDetails.user_partner_points.toLocaleString()}</b></p>
							</div>
							<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
								<button onClick={continueSuccessOfferAuthenticateUser} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
									<span className="xui-mr-half">Complete</span>
									<Arrowright width="12" height="12" />
								</button>
							</div>
						</> : 
						<center>
							<Loading width="12" height="12" />
						</center>
					}
				</div>
			</section>
        </>
    );
}