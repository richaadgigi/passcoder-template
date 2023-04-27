import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import { getAppUsers } from "../api/users";
import { getPartnerOffers, getPartnerOffer } from "../api/offers";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { useAnnouncementList, useCheckoutLoyaltyPoint, useIssueLoyaltyPoint } from "../hooks/useLoyalties";
import { useOfferAuthenticateUser } from "../hooks/useRequests";
import { useAddOffer } from "../hooks/useOffers";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Plus from "../icons/Plus";
import Minus from "../icons/Minus";
import Check from "../icons/Check";
import Star from "../icons/Star";
import CheckCircle from "../icons/CheckCircle";

export default function Loyalties() {
	const { cookie, forceLogout } = useCookie(config.token, "");

	const {
		description, discount, end, errorAddOffer, handleDescription, handleDiscount, handleEnd, handleName, handleOfferLimit,
		handlePoints, handleSingle, handleStar, handleStart, handleSubmit, loading, name, offerLimit, points, removeAddOfferModal,
		setRemoveAddOfferModal, single, star, start, successAddOffer
	} = useAddOffer();

	const {
		errorAnnouncementList, handlePID: AnnouncementHandlePID, handleSubmitAnnouncementList, loadingAnnouncementList, pid: AnnouncementPID, 
		removeAnnouncementListModal, setRemoveAnnouncementListModal, successAnnouncementList
	} = useAnnouncementList();

	const {
		errorCheckoutLoyaltyPoint, handlePID: CheckoutHandlePID, handlePoints: CheckoutHandlePoints, handleSubmitCheckoutLoyaltyPoint, setRemoveCheckoutLoyaltyPointModal, 
		loadingCheckoutLoyaltyPoint, pid: CheckoutPID, points: CheckoutPoints, removeCheckoutLoyaltyPointModal, successCheckoutLoyaltyPoint, setPID: SetCheckoutPID, 
		setMaskedPID: SetCheckoutMaskedPID, maskedPID: CheckoutMaskedPID, setOldPoints: SetCheckoutOldPoints, oldPoints: CheckoutOldPoints
	} = useCheckoutLoyaltyPoint();

	const {
		errorIssueLoyaltyPoint, handlePID: IssueHandlePID, handlePoints: IssueHandlePoints, handleSubmitIssueLoyaltyPoint, setRemoveIssueLoyaltyPointModal,
		loadingIssueLoyaltyPoint, pid: IssuePID, points: IssuePoints, removeIssueLoyaltyPointModal, successIssueLoyaltyPoint, setPID: SetIssuePID, 
		setMaskedPID: SetIssueMaskedPID, maskedPID: IssueMaskedPID, setOldPoints: SetIssueOldPoints, oldPoints: IssueOldPoints
	} = useIssueLoyaltyPoint();

	const {
		errorOfferAuthenticateUser, handleOfferUniqueId, handlePID: OfferAuthenticateUserHandlePID, handleSubmitOfferAuthenticateUser, loadingOfferAuthenticateUser,
		offerUniqueId, pid: OfferAuthenticateUserPID, showOfferAuthenticateUserModal, setOfferUniqueId, setShowOfferAuthenticateUserModal, successOfferAuthenticateUser,
		authenticatedUserDetails, setAuthenticatedUserDetails
	} = useOfferAuthenticateUser();

	const [appUsers, setAppUsers] = useState(null);
	const [errorAppUsers, setErrorAppUsers] = useState(null);
	const [loadingAppUsers, setLoadingAppUsers] = useState(false);

	const [allOffers, setAllOffers] = useState(null);
	const [errorAllOffers, setErrorAllOffers] = useState(null);
	const [loadingAllOffers, setLoadingAllOffers] = useState(false);

	const [size, setSize] = useState(20);
	const [page, setPage] = useState(1);

	const handleSize = (e) => { e.preventDefault(); setSize(e.target.value); setPage(1); _getAppUsers(page, e.target.value); };

	async function previousAppUsers() {
		if (page !== 1) setPage(page - 1);
		if (page !== 1) getAppUsers(page - 1, size);
	};

	async function nextAppUsers() {
		if (page < appUsers.data.pages) setPage(page + 1);
		if (page < appUsers.data.pages) getAppUsers(page + 1, size);
	};

	async function _getAppUsers(_page, _size) {
		setLoadingAppUsers(true);
		const response = await getAppUsers(cookie, (_page || page), (_size || size));
		setAppUsers(response.data);
		if (response.response_code === 403) forceLogout();
		if (response.error) setErrorAppUsers(response.error.response.data.message);
		setLoadingAppUsers(false);
	};

	async function getAllOffers(_page, _size) {
		setLoadingAllOffers(true);
		const response = await getPartnerOffers(cookie, (_page || page), (_size || size));
		setAllOffers(response.data);
		if (response.response_code === 403) forceLogout();
		if (response.error) setErrorAllOffers(response.error.response.data.message);
		setLoadingAllOffers(false);
	};

	useEffect(() => {
		if (appUsers === null) {
			_getAppUsers();
		}
		if (allOffers === null) {
			getAllOffers(1, 20);
		}
	}, [appUsers, allOffers]);

	if (removeIssueLoyaltyPointModal) {
		const modalResponse = document.querySelector("#issueLoyaltyPoint");
		modalResponse.setAttribute("display", false);
		_getAppUsers();
		setRemoveIssueLoyaltyPointModal(null);
	}
	if (removeCheckoutLoyaltyPointModal) {
		const modalResponse = document.querySelector("#checkoutLoyaltyPoint");
		modalResponse.setAttribute("display", false);
		_getAppUsers();
		setRemoveCheckoutLoyaltyPointModal(null);
	}

	if (successAnnouncementList) _getAppUsers();

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
	return (
		<>
			<Screen aside="true" navbar="false">
				<Content>
					<Navbar placeholder="Search something..." makeHidden={true} />
					<section className=''>
						<div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
							<div className="xui-mb-1">
								<h1 className='xui-font-sz-110 xui-font-w-normal'>All Linked Users</h1>
								<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Issue loyalty points directly to your new and existing Passcoder users.</p>
							</div>
						</div>
						{
							loadingAppUsers ?
								<center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
								(
									appUsers && appUsers.success ?
										<div className='xui-table-responsive'>
											<table className='xui-table xui-font-sz-90'>
												<thead>
													<tr className='xui-text-left xui-opacity-6'>
														<th className='xui-min-w-20'>S/N</th>
														<th className='xui-min-w-250'>User</th>
														<th className='xui-min-w-150'>Star</th>
														<th className='xui-min-w-100'>Restriction</th>
														<th className='xui-min-w-100'>Points</th>
														<th className='xui-min-w-300'>Last Authenticated</th>
														<th className='xui-min-w-150'>Loyalty Point</th>
													</tr>
												</thead>
												<tbody>
													{appUsers.data.rows.sort((a, b) => new Date(a.updatedAt.date + " " + a.updatedAt.time).getTime() < new Date(b.updatedAt.date + " " + b.updatedAt.time).getTime() ? 1 : -1).map((data, i) => (
														<tr className='' key={i}>
															<td className='xui-opacity-5'>
																<div className='xui-d-inline-flex xui-flex-ai-center'>
																	{i + 1}
																</div>
															</td>
															<td className='xui-opacity-5'>
																<div className='xui-d-inline-flex xui-flex-ai-center'>
																	<p>{data.user_data ? data.user_data.firstname : "Null"} {data.user_data ? data.user_data.lastname : "Null"} ({data.user_data ? data.user_data.pid : ""})</p>
																</div>
															</td>
															<td className='xui-opacity-5'>
																{
																	data.user_data ?
																		(
																			<span>

																				{
																					data.user_data.star === 0 ?
																						<div className=''>
																							<p>No star</p>
																						</div>
																						: ""
																				}
																				{
																					data.user_data.star === 1 ?
																						<div className=''>
																							<Star width="18" height="18" />
																						</div>
																						: ""
																				}
																				{
																					data.user_data.star === 2 ?
																						<div className=''>
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																						</div>
																						: ""
																				}
																				{
																					data.user_data.star === 3 ?
																						<div className=''>
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																						</div>
																						: ""
																				}
																				{
																					data.user_data.star === 4 ?
																						<div className=''>
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																						</div>
																						: ""
																				}
																				{
																					data.user_data.star === 5 ?
																						<div className=''>
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																							<Star width="18" height="18" />
																						</div>
																						: ""
																				}
																			</span>
																		) :
																		<div className=''>
																			<p>No star</p>
																		</div>
																}
															</td>
															<td className='xui-opacity-5'>
																{
																	data.restricted ?
																		<span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>{"True"}</span> :
																		<span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>{"False"}</span>
																}
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.points.toLocaleString()}</span>
															</td>
															<td className='xui-opacity-5'>
																<span>{data.updatedAt.date} at {data.updatedAt.time}</span>
															</td>
															<td className=''>
																<div className="xui-d-flex xui-grid-gap-1">
																	<button title="Issue Points"
																		onClick={() => {
																			SetIssuePID(data.user_data.unmasked);
																			SetIssueMaskedPID(data.user_data.pid);
																			SetIssueOldPoints(data.points);
																		}}
																		className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-50" xui-modal-open="issueLoyaltyPoint">
																		<Plus width="20" height="20" />
																	</button>
																	<button title="Checkout Points"
																		onClick={() => {
																			SetCheckoutPID(data.user_data.unmasked);
																			SetCheckoutMaskedPID(data.user_data.pid);
																			SetCheckoutOldPoints(data.points);
																		}}
																		className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-50" xui-modal-open="checkoutLoyaltyPoint">
																		<Minus width="20" height="20" />
																	</button>
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div> :
										<div className="xui-d-grid xui-lg-grid-col-1 xui-grid-gap-2 xui-mt-2">
											<div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
												<center className="xui-text-red">
													<Close width="100" height="100" />
													<h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorAppUsers}</h3>
												</center>
											</div>
										</div>
								)
						}
						{
							loadingAppUsers ?
								<Loading width="12" height="12" /> :
								(
									appUsers && appUsers.success ?
										<div className='xui-d-flex xui-flex-jc-flex-end xui-py-1 xui-font-sz-85 xui-opacity-5 xui-mt-1'>
											<div className='xui-d-inline-flex xui-flex-ai-center'>
												<span>Rows per page:</span>
												<select value={size} onChange={handleSize} className='psc-select-rows-per-page xui-ml-half'>
													<option value={20}>20</option>
													<option value={50}>50</option>
													<option value={100}>100</option>
												</select>
											</div>
											<div className='xui-mx-1 xui-lg-mx-2'>
												<span><span className='xui-font-w-bold'>{page}</span> of {appUsers ? appUsers.data.pages : "..."}</span>
											</div>
											<div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
												<div className='xui-mr-half xui-cursor-pointer' title="Previous" onClick={previousAppUsers}>
													<Arrowleft width="18" height="18" />
												</div>
												<div className='xui-ml-half xui-cursor-pointer' title="Next" onClick={nextAppUsers}>
													<Arrowright width="18" height="18" />
												</div>
											</div>
										</div> :
										""
								)
						}
					</section>
				</Content>
				<div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
					<div className='xui-mb-3'>
						<div className='xui-d-flex xui-flex-ai-baseline xui-flex-jc-flex-end'>
							<div className='xui-pr-1 '>
								<img className='xui-img-100' src={FlowerPlant} alt='flower plant' />
							</div>
						</div>
						<div className='psc-bg-light-blue-ii xui-px-1 xui-pt-5 xui-pb-1 xui-mt--4'>
							<form className="xui-form" layout="2" onSubmit={handleSubmitOfferAuthenticateUser}>
								<h1 className='xui-font-sz-110 xui-mt-half'>Verify User for Offer</h1>
								<div className="xui-mt-2">
									<label>Offers</label>
									<select value={offerUniqueId} onChange={handleOfferUniqueId} className="xui-bdr-black" required>
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
								<div className="xui-mt-2">
									<label>Passcoder ID</label>
									<input type="text" className="xui-bdr-black" minLength={6} maxLength={6} value={OfferAuthenticateUserPID} onChange={OfferAuthenticateUserHandlePID} placeholder="Enter user Passcoder ID" required ></input>
								</div>
								<p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-black"><span className="xui-font-w-bold psc-text-red">{loadingOfferAuthenticateUser ? "Awaiting authentication" : ""}</span></p>
								<button disabled={loadingOfferAuthenticateUser} className={`xui-btn-block ${loadingOfferAuthenticateUser ? "psc-btn-blue xui-mt-1" : "psc-btn-blue-alt xui-mt-2"} xui-bdr-rad-half xui-text-center xui-font-sz-85`}>
									<center>
										{
											loadingOfferAuthenticateUser ?
												<Loading width="12" height="12" />
												: "Verify User"
										}
									</center>
								</button>
							</form>
							<p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorOfferAuthenticateUser}</span></p>
							<p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successOfferAuthenticateUser}</span></p>
						</div>
					</div>
					<div className='xui-mt-5'>
						<div className='xui-d-flex xui-flex-ai-baseline xui-flex-jc-space-between'>
							<div className='xui-pl-1'>
								<img className='xui-img-100' src={Boxes} alt='boxes' />
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
			<section className='xui-modal' xui-modal="issueLoyaltyPoint" id="issueLoyaltyPoint">
				<div className='xui-modal-content xui-max-h-500 xui-max-w-500 xui-overflow-auto xui-pos-relative'>
					<div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="issueLoyaltyPoint">
						<Close width="24" height="24" />
					</div>
					<h1>Issue Loyalty Point (+)</h1>
					<form className="xui-form" layout="2" onSubmit={handleSubmitIssueLoyaltyPoint}>
						<div className="xui-form-box xui-mt-2">
							<label>Passcoder ID</label>
							<input type="text" readOnly value={IssueMaskedPID} onChange={IssueHandlePID} placeholder="Enter user Passcoder ID" required ></input>
						</div>
						<div className="xui-form-box xui-mt-2">
							<label>Points</label>
							<input type={"number"} min={1} value={IssuePoints} onChange={IssueHandlePoints} placeholder="Points" required ></input>
						</div>
						<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
							<button type="submit" className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Continue</span>
								{
									loadingIssueLoyaltyPoint ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
					</form>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorIssueLoyaltyPoint}</span></p>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successIssueLoyaltyPoint}</span></p>
				</div>
			</section>
			<section className='xui-modal' xui-modal="checkoutLoyaltyPoint" id="checkoutLoyaltyPoint">
				<div className='xui-modal-content xui-max-h-500 xui-max-w-500 xui-overflow-auto xui-pos-relative'>
					<div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="checkoutLoyaltyPoint">
						<Close width="24" height="24" />
					</div>
					<h1>Checkout Loyalty Point (-)</h1>
					<form className="xui-form" layout="2" onSubmit={handleSubmitCheckoutLoyaltyPoint}>
						<div className="xui-form-box xui-mt-2">
							<label>Passcoder ID</label>
							<input type="text" readOnly value={CheckoutMaskedPID} onChange={CheckoutHandlePID} placeholder="Enter user Passcoder ID" required ></input>
						</div>
						<div className="xui-form-box xui-mt-2">
							<label>Points</label>
							<input type={"number"} min={1} max={CheckoutOldPoints} value={CheckoutPoints} onChange={CheckoutHandlePoints} placeholder="Points" required ></input>
						</div>
						<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
							<button type="submit" className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Continue</span>
								{
									loadingCheckoutLoyaltyPoint ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
					</form>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorCheckoutLoyaltyPoint}</span></p>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successCheckoutLoyaltyPoint}</span></p>
				</div>
			</section>	
			<section className='xui-modal' xui-modal="offerUserAuthenticated" id="offerUserAuthenticated">
				<div className='xui-modal-content xui-max-h-700 xui-max-w-800 xui-overflow-auto xui-pos-relative'>
					<h1>Offer Authentication</h1>
					<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Visible details of the user below</p>
					{
						authenticatedUserDetails ? 
						<>
							<center className="xui-m-2-half">
								<div className="xui-w-200 xui-h-200 xui-bdr-s-ridge xui-bdr-w-1 xui-bdr-black xui-bdr-rad-2 xui-mt-1 xui-d-flex xui-flex-dir-column xui-flex-ai-center xui-flex-jc-center xui-cursor-pointer">
									<img className="xui-img-200" src={authenticatedUserDetails.photo} alt={authenticatedUserDetails.name + " Selfie Image"} />
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
		</>
	);
}