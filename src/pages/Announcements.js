import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import { getPartnerAnnouncement, getPartnerAnnouncements } from "../api/announcements";
import { getPartnerOffers, getPartnerOffer } from "../api/offers";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { usePartnerAnnouncement } from "../hooks/useAnnouncements";
import { useAnnouncementList } from "../hooks/useLoyalties";
import { useOfferAuthenticateUser } from "../hooks/useRequests";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import EyeOpenAlt from "../icons/EyeOpenAlt";
import Check from "../icons/Check";
import Star from "../icons/Star";
import CheckCircle from "../icons/CheckCircle";

export default function Announcements() {
	const { cookie, forceLogout } = useCookie(config.token, "");

	const {
		description, errorPartnerAnnouncement, handleDescription, handleSubmitPartnerAnnouncement, handleTitle, loadingPartnerAnnouncement, title, 
		removePartnerAnnouncementModal, setRemovePartnerAnnouncementModal, successPartnerAnnouncement
	} = usePartnerAnnouncement();

	const {
		errorAnnouncementList, handlePID: AnnouncementHandlePID, handleSubmitAnnouncementList, loadingAnnouncementList, pid: AnnouncementPID,
		removeAnnouncementListModal, setRemoveAnnouncementListModal, successAnnouncementList
	} = useAnnouncementList();

	const [showConfirmAddAnnouncement, setShowConfirmAddAnnouncement] = useState(false);

	const {
		errorOfferAuthenticateUser, handleOfferUniqueId, handlePID: OfferAuthenticateUserHandlePID, handleSubmitOfferAuthenticateUser, loadingOfferAuthenticateUser,
		offerUniqueId, pid: OfferAuthenticateUserPID, showOfferAuthenticateUserModal, setOfferUniqueId, setShowOfferAuthenticateUserModal, successOfferAuthenticateUser,
		authenticatedUserDetails, setAuthenticatedUserDetails
	} = useOfferAuthenticateUser();

	const [allAnnouncements, setAllAnnouncements] = useState(null);
	const [errorAllAnnouncements, setErrorAllAnnouncements] = useState(null);
	const [loadingAllAnnouncements, setLoadingAllAnnouncements] = useState(false);

	const [viewAnnouncement, setViewAnnouncement] = useState(null);
	const [errorViewAnnouncement, setErrorViewAnnouncement] = useState(null);
	const [loadingViewAnnouncement, setLoadingViewAnnouncement] = useState(false);

	const [allOffers, setAllOffers] = useState(null);
	const [errorAllOffers, setErrorAllOffers] = useState(null);
	const [loadingAllOffers, setLoadingAllOffers] = useState(false);

	const [size, setSize] = useState(20);
	const [page, setPage] = useState(1);

	const handleSize = (e) => { e.preventDefault(); setSize(e.target.value); setPage(1); getAllAnnouncements(page, e.target.value); };

	async function previousAnnouncements() {
		if (page !== 1) setPage(page - 1);
		if (page !== 1) getAllAnnouncements(page - 1, size);
	};

	async function nextAnnouncements() {
		if (page < allAnnouncements.data.pages) setPage(page + 1);
		if (page < allAnnouncements.data.pages) getAllAnnouncements(page + 1, size);
	};

	async function getAllAnnouncements(_page, _size) {
		setLoadingAllAnnouncements(true);
		const response = await getPartnerAnnouncements(cookie, (_page || page), (_size || size));
		setAllAnnouncements(response.data);
		if (response.response_code === 403) forceLogout();
		if (response.error) setErrorAllAnnouncements(response.error.response.data.message);
		setLoadingAllAnnouncements(false);
	};

	async function getAnnouncement(unique_id) {
		setLoadingViewAnnouncement(true);
		const response = await getPartnerAnnouncement(cookie, unique_id);
		setViewAnnouncement(response.data);
		if (response.response_code === 403) forceLogout();
		if (response.error) setErrorViewAnnouncement(response.error.response.data.message);
		setLoadingViewAnnouncement(false);
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
		if (allAnnouncements === null) {
			getAllAnnouncements();
		}
		if (allOffers === null) {
			getAllOffers(1, 20);
		}
	}, [allAnnouncements, allOffers]);

	if (successOfferAuthenticateUser) {
		const modalResponse = document.querySelector("#offerUserAuthenticated");
		modalResponse.setAttribute("display", true);
	}

	async function continueSuccessOfferAuthenticateUser() {
		const modalResponse = document.querySelector("#offerUserAuthenticated");
		modalResponse.setAttribute("display", false);
		setAuthenticatedUserDetails(null);
	}

	if (removePartnerAnnouncementModal) {
		const modalResponse = document.querySelector("#addAnnouncement");
		modalResponse.setAttribute("display", false);
		getAllAnnouncements();
		setRemovePartnerAnnouncementModal(null);
	}

	return (
		<>
			<Screen aside="true" navbar="false">
				<Content>
					<Navbar placeholder="Search something..." makeHidden={true} />
					<section className=''>
						<div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
							<div className="xui-mb-1">
								<h1 className='xui-font-sz-110 xui-font-w-normal'>All Broadcasted Announcements</h1>
								<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Curate updates / announcements and send to all your linked users, see statistics and more.</p>
							</div>
							<div className="xui-mb-1">
								<div className='xui-d-inline-flex'>
									<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-80" xui-modal-open="addAnnouncement">
										<span>New Announcement</span>
									</button>
								</div>
							</div>
						</div>
						{
							loadingAllAnnouncements ?
								<center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
								(
									allAnnouncements && allAnnouncements.success ?
										<div className='xui-table-responsive'>
											<table className='xui-table xui-font-sz-90'>
												<thead>
													<tr className='xui-text-left xui-opacity-6'>
														<th className='xui-min-w-20'>S/N</th>
														<th className='xui-min-w-200'>Title</th>
														<th className='xui-min-w-100'>Users</th>
														<th className='xui-min-w-100'>Views</th>
														<th className='xui-min-w-100'>Status</th>
														<th className='xui-min-w-300'>Date</th>
														<th className='xui-min-w-50'>Actions</th>
													</tr>
												</thead>
												<tbody>
													{allAnnouncements.data.rows.map((data, i) => (
														<tr className='' key={i}>
															<td className='xui-opacity-5'>
																<div className='xui-d-inline-flex xui-flex-ai-center'>
																	{i + 1}
																</div>
															</td>
															<td className='xui-opacity-5'>
																<div className='xui-d-inline-flex xui-flex-ai-center'>
																	<p>{data.title}</p>
																</div>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.pids.toLocaleString()}</span>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.views.toLocaleString()}</span>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<>
																	{
																		data.status === 1 ? 
																			<span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Success</span> : ""
																	}
																	{
																		data.status === 0 ?
																			<span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Error</span> : ""
																	}
																	{
																		data.status === 2 || data.status === 3 ?
																			<span className='xui-badge xui-badge-warning xui-font-sz-80 xui-bdr-rad-half'>Pending</span> : ""
																	}
																</>
															</td>
															<td className='xui-opacity-5'>
																<span>{data.updatedAt.date} at {data.updatedAt.time}</span>
															</td>
															<td className=''>
																<div className="xui-d-flex xui-grid-gap-1">
																	<button title="View Announcement"
																		onClick={() => {
																			getAnnouncement(data.unique_id);
																		}}
																		className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-50" xui-modal-open="viewAnnouncement">
																		<EyeOpenAlt width="20" height="20" />
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
													<h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorAllAnnouncements}</h3>
												</center>
											</div>
										</div>
								)
						}
						{
							loadingAllAnnouncements ?
								<Loading width="12" height="12" /> :
								(
									allAnnouncements && allAnnouncements.success ?
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
												<span><span className='xui-font-w-bold'>{page}</span> of {allAnnouncements ? allAnnouncements.data.pages : "..."}</span>
											</div>
											<div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
												<div className='xui-mr-half xui-cursor-pointer' title="Previous" onClick={previousAnnouncements}>
													<Arrowleft width="18" height="18" />
												</div>
												<div className='xui-ml-half xui-cursor-pointer' title="Next" onClick={nextAnnouncements}>
													<Arrowright width="18" height="18" />
												</div>
											</div>
										</div> :
										""
								)
						}
					</section>
					<center className="xui-mt-4 xui-lg-d-none xui-md-d-none">
						<span className='xui-opacity-4 xui-font-sz-100 xui-font-w-700 xui-open-sidebar'>Click to open right sidebar</span>
					</center>
				</Content>
				<div className="aside psc-bg-light-blue xui-py-2 xui-px-1-half">
					<div className='xui-mt-1 xui-mb-3'>
						<div className='xui-d-flex xui-flex-ai-baseline xui-flex-jc-flex-end'>
							<div className='xui-pr-1 '>
								<img className='xui-img-100' src={Boxes} alt='flower plant' />
							</div>
						</div>
						<div className='psc-bg-light-blue-ii xui-px-1 xui-pt-5 xui-pb-1 xui-mt--4'>
							<form className="xui-form" layout="2" onSubmit={handleSubmitAnnouncementList}>
								<h1 className='xui-font-sz-110 xui-mt-half'>Link new user to announcement list</h1>
								<div className="xui-mt-2">
									<label>Passcoder ID</label>
									<input type="text" className="xui-bdr-black" minLength={6} maxLength={6} value={AnnouncementPID} onChange={AnnouncementHandlePID} placeholder="Enter user Passcoder ID" required ></input>
								</div>
								<button disabled={loadingAnnouncementList} className={`xui-btn-block ${loadingAnnouncementList ? "psc-btn-blue xui-mt-1" : "psc-btn-blue-alt xui-mt-2"} xui-bdr-rad-half xui-text-center xui-font-sz-85`}>
									<center>
										{
											loadingAnnouncementList ?
												<Loading width="12" height="12" />
												: "Initiate Link"
										}
									</center>
								</button>
							</form>
							<p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorAnnouncementList}</span></p>
							<p className="xui-font-sz-90 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successAnnouncementList}</span></p>
						</div>
					</div>
					<div className='xui-mt-2 xui-mb-3'>
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
				</div>
			</Screen>
			<section className='xui-modal' xui-modal="addAnnouncement" id="addAnnouncement">
				<div className='xui-modal-content xui-max-h-600 xui-max-w-800 xui-overflow-auto xui-pos-relative'>
					<div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="addAnnouncement">
						<Close width="24" height="24" />
					</div>
					<h1 className="xui-mt-3">New Broadcast Announcement</h1>
					<form className="xui-form" layout="2" onSubmit={(e) => e.preventDefault()}>
						<div className="xui-form-box xui-mt-2">
							<label>Title</label>
							<input type="text" value={title} onChange={handleTitle} placeholder="Enter title of announcement" required ></input>
						</div>
						<div className="xui-form-box xui-mt-2">
							<label>Description</label>
							<textarea type={"text"} value={description} onChange={handleDescription} placeholder="Enter announcement description" required></textarea>
						</div>
						{
							showConfirmAddAnnouncement ? 
								<div className="xui-m-3">
									<center>
										<h4>Confirm Announcement Broadcast</h4>
										<p className="xui-opacity-5 xui-font-sz-90 xui-m-half">Are you sure you want to cotinue with this action?</p>
										<p className="xui-opacity-5 xui-font-sz-90">You can't edit or undo this, please check your contents again before sending ...</p>
									</center>
									<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorPartnerAnnouncement}</span></p>
									<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successPartnerAnnouncement}</span></p>
									<div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
										<div className="xui-d-inline-flex xui-flex-ai-center">
											<button onClick={handleSubmitPartnerAnnouncement} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
												<span className="xui-mr-half">Yes</span>
												{
													loadingPartnerAnnouncement ?
														<Loading width="12" height="12" />
														: <Check width="20" height="20" />
												}
											</button>
										</div>
										<div className="xui-d-inline-flex xui-flex-ai-center">
											<button onClick={() => setShowConfirmAddAnnouncement(false)} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85">
												<span className="xui-mr-half">No</span>
												<Close width="20" height="20" />
											</button>
										</div>
									</div>
								</div> :
								<div>
									<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorPartnerAnnouncement}</span></p>
									<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successPartnerAnnouncement}</span></p>
									<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
										<button disabled={title.length < 3 || description.length < 3} onClick={() => setShowConfirmAddAnnouncement(true)} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
											<span className="xui-mr-half">Send Announcement</span>
										</button>
									</div>
								</div>
								
						}
					</form>
				</div>
			</section>
			<section className='xui-modal' xui-modal="viewAnnouncement" id="viewAnnouncement">
				<div className='xui-modal-content xui-max-h-700 xui-overflow-auto xui-pos-relative'>
					{
						loadingViewAnnouncement ? 
						<center>
							<Loading width="12" height="12" />
						</center> :
						(
							viewAnnouncement && viewAnnouncement.success ? 
								<>
									<h2 className='xui-font-sz-110 xui-mt-half xui-mb-1'><span className='xui-opacity-5 xui-font-w-bold'>Title: </span>{viewAnnouncement.data.title}</h2>
									<hr></hr>
									<div className='xui-mt-1 xui-mb-half' dangerouslySetInnerHTML={{ __html: viewAnnouncement.data.description}}></div>
								</> : 
								<div className="xui-d-grid xui-lg-grid-col-1 xui-grid-gap-2 xui-mt-2">
									<div className="xui-bdr-w-1 xui-bdr-s-solid xui-bdr-fade xui-py-2 xui-px-1">
										<center className="xui-text-red">
											<Close width="100" height="100" />
											<h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorViewAnnouncement}</h3>
										</center>
									</div>
								</div>
						)
					}
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