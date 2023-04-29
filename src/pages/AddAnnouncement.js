import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import BundledEditor from '../BundledEditor';
import { getPartnerOffers } from "../api/offers";
import { usePartnerAnnouncement } from "../hooks/useAnnouncements";
import { useAnnouncementList } from "../hooks/useLoyalties";
import { useOfferAuthenticateUser } from "../hooks/useRequests";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Check from "../icons/Check";
import Star from "../icons/Star";
import CheckCircle from "../icons/CheckCircle";

export default function AddAnnouncement() {

	const loc = useLocation();
	const { pathname } = useLocation();
	const _stripped = pathname.replace("/", "");
	const stripped = _stripped.split("/")[0];

	const navigate = useNavigate();

	const { cookie, forceLogout } = useCookie(config.token, "");

	const editorRef = useRef(null);

	const {
		description, errorPartnerAnnouncement, handleDescription, handleSubmitPartnerAnnouncement, handleTitle, loadingPartnerAnnouncement, title, 
		removePartnerAnnouncementModal, setRemovePartnerAnnouncementModal, successPartnerAnnouncement
	} = usePartnerAnnouncement();
	
	const setDescriptionContents = () => {
		if (editorRef.current) {
			handleDescription(editorRef.current.getContent());
		} 
	};

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

	const [allOffers, setAllOffers] = useState(null);
	const [errorAllOffers, setErrorAllOffers] = useState(null);
	const [loadingAllOffers, setLoadingAllOffers] = useState(false);

	async function getAllOffers(_page, _size) {
		setLoadingAllOffers(true);
		const response = await getPartnerOffers(cookie, _page, _size);
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
		setRemovePartnerAnnouncementModal(null);
		setTimeout(function () {
            navigate(`/${stripped}/announcements`);
        }, 1500)
	}

	return (
		<>
			<Screen aside="true" navbar="false">
				<Content>
					<Navbar placeholder="Search something..." makeHidden={true} />
					<section className=''>
						<div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
							<div className="xui-mb-1">
								<h1 className='xui-font-sz-110 xui-font-w-normal'>New Broadcast Announcement</h1>
								<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half"></p>
							</div>
						</div>
						<form className="xui-form" layout="2" onSubmit={(e) => e.preventDefault()}>
							<div className="xui-form-box xui-mt-2">
								<label className="">Title</label>
								<input type="text" value={title} onChange={handleTitle} placeholder="Enter title of announcement" required ></input>
							</div>
							<div className="xui-form-box xui-mt-2">
								<label className="">Description</label>
								<BundledEditor
									onInit={(evt, editor) => editorRef.current = editor}
									initialValue={description}
									init={{
									height: 500,
									menubar: false,
									plugins: [
										'advlist', 'anchor', 'autolink', 'help', 'image', 'link', 'lists',
										'searchreplace', 'table', 'wordcount'
									],
									toolbar: [
										'undo redo | styles | bold italic forecolor | bullist numlist outdent indent | link image | alignleft aligncenter alignright alignjustify | removeformat',
									],
									toolbar_mode: 'floating',
									content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
									}}
								/>
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
											<button disabled={title.length < 3 || description.length < 3} onClick={() => { setDescriptionContents(); setShowConfirmAddAnnouncement(true); }} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
												<span className="xui-mr-half">Send Announcement</span>
											</button>
										</div>
									</div>
									
							}
						</form>
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