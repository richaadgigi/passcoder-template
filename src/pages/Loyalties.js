import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import { getAppUsers } from "../api/users";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { useAnnouncementList, useCheckoutLoyaltyPoint, useIssueLoyaltyPoint } from "../hooks/useLoyalties";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Plus from "../icons/Plus";
import Minus from "../icons/Minus";
import Check from "../icons/Check";
import Star from "../icons/Star";

export default function Loyalties() {
	const { cookie, forceLogout } = useCookie(config.token, "");

	const {
		errorAnnouncementList, handlePID: AnnouncementHandlePID, handleSubmitAnnouncementList, loadingAnnouncementList, pid: AnnouncementPID, 
		removeAnnouncementListModal, setRemoveAnnouncementListModal, successAnnouncementList
	} = useAnnouncementList();

	const {
		errorCheckoutLoyaltyPoint, handlePID: CheckoutHandlePID, handlePoints: CheckoutHandlePoints, handleSubmitCheckoutLoyaltyPoint, setRemoveCheckoutLoyaltyPointModal, 
		loadingCheckoutLoyaltyPoint, pid: CheckoutPID, points: CheckoutPoints, removeCheckoutLoyaltyPointModal, successCheckoutLoyaltyPoint, setPID: SetCheckoutPID
	} = useCheckoutLoyaltyPoint();

	const {
		errorIssueLoyaltyPoint, handlePID: IssueHandlePID, handlePoints: IssueHandlePoints, handleSubmitIssueLoyaltyPoint, setRemoveIssueLoyaltyPointModal,
		loadingIssueLoyaltyPoint, pid: IssuePID, points: IssuePoints, removeIssueLoyaltyPointModal, successIssueLoyaltyPoint, setPID: SetIssuePID
	} = useIssueLoyaltyPoint();

	const [appUsers, setAppUsers] = useState(null);
	const [errorAppUsers, setErrorAppUsers] = useState(null);
	const [loadingAppUsers, setLoadingAppUsers] = useState(false);

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

	useEffect(() => {
		if (appUsers === null) {
			_getAppUsers();
		}
	}, [appUsers]);

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
																			SetIssuePID(data.unmasked);
																		}}
																		className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-50" xui-modal-open="issueLoyaltyPoint">
																		<Plus width="20" height="20" />
																	</button>
																	<button title="Checkout Points"
																		onClick={() => {
																			SetCheckoutPID(data.unmasked);
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
			{/* <section className='xui-modal' xui-modal="addOffer" id="addOffer">
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
								<input type={"number"} value={points} onChange={handlePoints} placeholder="Minimum points" required ></input>
							</div>
							<div className="xui-mt-1">
								<label>Star</label>
								<input type={"number"} value={star} onChange={handleStar} placeholder="Minimum star" required ></input>
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
			</section> */}
		</>
	);
}