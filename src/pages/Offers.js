import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import Boxes from '../assets/images/boxes.png';
import FlowerPlant from '../assets/images/flower-plant.png';
import { getPartnerOffers, getPartnerOffer } from "../api/offers";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { useAddOffer, useDeleteOffer, useEditOffer } from "../hooks/useOffers";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import Check from "../icons/Check";

export default function Teams() {
	const { cookie, forceLogout } = useCookie(config.token, "");
	const {
		description, discount, end, errorAddOffer, handleDescription, handleDiscount, handleEnd, handleName, handleOfferLimit,
		handlePoints, handleSingle, handleStar, handleStart, handleSubmit, loading, name, offerLimit, points, removeAddOfferModal, 
		setRemoveAddOfferModal, single, star, start, successAddOffer
	} = useAddOffer();

	const {
		errorDeleteOffer, handleDeleteOffer, loadingDeleteOffer, removeDeleteOfferModal, setDeleteOfferUniqueId, setRemoveDeleteOfferModal, successDeleteOffer
	} = useDeleteOffer();

	const {
		descriptionEdit, discountEdit, editOfferUniqueId, endEdit, errorEditOffer, handleDescriptionEdit, handleDiscountEdit, 
		handleEditOfferCriteria, handleEditOfferDetails, handleEditOfferLimit, handleEndEdit, handleNameEdit, handleOfferLimitEdit, 
		handlePointsEdit, handleSingleEdit, handleStarEdit, handleStartEdit, loadingEditOffer, nameEdit, offerLimitEdit, pointsEdit, 
		removeEditOfferModal, setDescriptionEdit, setDiscountEdit, setEditOfferUniqueId, setEndEdit, setNameEdit, setOfferLimitEdit, 
		setPointsEdit, setRemoveEditOfferModal, setSingleEdit, setStarEdit, setStartEdit, singleEdit, starEdit, startEdit, successEditOffer, 
		editOfferDetails, getPartnerOfferDetails, showEditOfferCriteriaStatus, showEditOfferDetailsStatus, showEditOfferLimitStatus
	} = useEditOffer();

	const return_date_reverse = (date) => {
		let _date = date.split(" ");
		return _date[0] + "T" + _date[1];
	};

	const timestamp_str = (date) => {
		const d = new Date(date);
		return {
			fulldate: d.toDateString() + " at " + d.toLocaleTimeString(),
			date: d.toDateString(),
			time: d.toLocaleTimeString(),
		};
	};

	const [allOffers, setAllOffers] = useState(null);
	const [errorAllOffers, setErrorAllOffers] = useState(null);
	const [loadingAllOffers, setLoadingAllOffers] = useState(false);

	const [size, setSize] = useState(20);
	const [page, setPage] = useState(1);

	const handleSize = (e) => { e.preventDefault(); setSize(e.target.value); setPage(1); getAllOffers(page, e.target.value); };

	async function previousOffers() {
		if (page !== 1) setPage(page - 1);
		if (page !== 1) getAllOffers(page - 1, size);
	};

	async function nextOffers() {
		if (page < allOffers.data.pages) setPage(page + 1);
		if (page < allOffers.data.pages) getAllOffers(page + 1, size);
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
		if (allOffers === null) {
			getAllOffers();
		}
	}, [allOffers]);

	if (removeAddOfferModal) {
		const modalResponse = document.querySelector("#addOffer");
		modalResponse.setAttribute("display", false);
		getAllOffers();
		setRemoveAddOfferModal(null);
	}
	if (removeEditOfferModal) {
		const modalResponse = document.querySelector("#editOffer");
		modalResponse.setAttribute("display", false);
		getAllOffers();
		setRemoveEditOfferModal(null);
	}
	if (removeDeleteOfferModal) {
		const modalResponse = document.querySelector("#deleteOffer");
		modalResponse.setAttribute("display", false);
		getAllOffers();
		setRemoveDeleteOfferModal(null);
	}
	return (
		<>
			<Screen aside="true" navbar="false">
				<Content>
					<Navbar placeholder="Search something..." makeHidden={true} />
					<section className=''>
						<div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
							<div className="xui-mb-1">
								<h1 className='xui-font-sz-110 xui-font-w-normal'>All Personalized Offers</h1>
								<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Create new offer, edit criteria and set eligibility standards.</p>
							</div>
							<div className="xui-mb-1">
								<div className='xui-d-inline-flex'>
									<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-80" xui-modal-open="addOffer">
										<span>Create Offer</span>
									</button>
								</div>
							</div>
						</div>
						{
							loadingAllOffers ?
								<center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
								(
									allOffers && allOffers.success ?
										<div className='xui-table-responsive'>
											<table className='xui-table xui-font-sz-90'>
												<thead>
													<tr className='xui-text-left xui-opacity-6'>
														<th className='xui-min-w-20'>S/N</th>
														<th className='xui-min-w-200'>Name</th>
														<th className='xui-min-w-50'>Discount</th>
														<th className='xui-min-w-100'>Type</th>
														<th className='xui-min-w-100'>Points</th>
														<th className='xui-min-w-100'>Star</th>
														<th className='xui-min-w-300'>Duration</th>
														<th className='xui-min-w-300'>Date</th>
														<th className='xui-min-w-150'>Actions</th>
													</tr>
												</thead>
												<tbody>
													{allOffers.data.rows.map((data, i) => (
														<tr className='' key={i}>
															<td className='xui-opacity-5'>
																<div className='xui-d-inline-flex xui-flex-ai-center'>
																	{i + 1}
																</div>
															</td>
															<td className='xui-opacity-5'>
																<div className='xui-d-inline-flex xui-flex-ai-center'>
																	<p>{data.name}</p>
																</div>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.discount}%</span>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.single ? "Single" : "Multiple"}</span>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.points.toLocaleString()}</span>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.star}</span>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																{
																	data.start || data.end ?
																		<span>{data.start ? (data.end ? timestamp_str(data.start).fulldate + " to " : "Starts - " + timestamp_str(data.start).fulldate) : ""}{data.end ? (data.start ? timestamp_str(data.end).fulldate : "Ends - " + timestamp_str(data.end).fulldate) : ""}</span> :
																		<span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>No duration</span>
																}
															</td>
															<td className='xui-opacity-5'>
																<span>{data.updatedAt.date} at {data.updatedAt.time}</span>
															</td>
															<td className=''>
																<div className="xui-d-flex xui-grid-gap-1">
																	<button title="Edit Offer" 
																		onClick={() => { 
																			setEditOfferUniqueId(data.unique_id); 
																			setDescriptionEdit(""); 
																			setDiscountEdit(data.discount);
																			setEndEdit(data.end === null ? "" : return_date_reverse(data.end)); 
																			setNameEdit(data.name); 
																			setOfferLimitEdit(data.offer_limit);
																			setPointsEdit(data.points);
																			setSingleEdit(data.single); 
																			setStarEdit(data.star); 
																			setStartEdit(data.start === null ? "" : return_date_reverse(data.start));
																			getPartnerOfferDetails(data.unique_id);
																		}} 
																		className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-50" xui-modal-open="editOffer">
																		<Edit width="20" height="20" />
																	</button>
																	<button title="Delete Offer" onClick={() => { setDeleteOfferUniqueId(data.unique_id); }} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-50" xui-modal-open="deleteOffer">
																		<Delete width="20" height="20" />
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
													<h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorAllOffers}</h3>
												</center>
											</div>
										</div>
								)
						}
						{
							loadingAllOffers ?
								<Loading width="12" height="12" /> :
								(
									allOffers && allOffers.success ?
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
												<span><span className='xui-font-w-bold'>{page}</span> of {allOffers ? allOffers.data.pages : "..."}</span>
											</div>
											<div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
												<div className='xui-mr-half xui-cursor-pointer' title="Previous" onClick={previousOffers}>
													<Arrowleft width="18" height="18" />
												</div>
												<div className='xui-ml-half xui-cursor-pointer' title="Next" onClick={nextOffers}>
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
			</section>
			<section className='xui-modal' xui-modal="editOffer" id="editOffer">
				<div className='xui-modal-content xui-max-h-600 xui-max-w-800 xui-overflow-auto xui-pos-relative'>
					<div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="editOffer">
						<Close width="24" height="24" />
					</div>
					<h1>Edit offer</h1>
					<form className="xui-form" layout="2" onSubmit={(e) => e.preventDefault()}>
						<div className="xui-form-box xui-mt-2">
							<label>Name</label>
							<input type="text" value={nameEdit} onChange={handleNameEdit} placeholder="Enter offer name" required ></input>
						</div>
						<div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-3 xui-md-grid-col-3 xui-grid-gap-1">
							<div className="xui-mt-1">
								<label>Discount</label>
								<input type={"number"} min={1} max={100} value={discountEdit} onChange={handleDiscountEdit} placeholder="Enter discount" required ></input>
							</div>
							<div className="xui-mt-1">
								<label>Start</label>
								<input className="xui-font-sz-90" type={"datetime-local"} value={startEdit} onChange={handleStartEdit}></input>
							</div>
							<div className="xui-mt-1">
								<label>End</label>
								<input className="xui-font-sz-90" type={"datetime-local"} value={endEdit} onChange={handleEndEdit}></input>
							</div>
						</div>
						<div className="xui-form-box xui-d-flex xui-mt-2">
							<div className="xui-d-inline-flex xui-flex-ai-center">
								<input type="checkbox" onChange={handleSingleEdit} checked={singleEdit} id="single" />
								<label for="single" className="xui-ml-half" style={{ marginBottom: '0' }}>Single</label>
							</div>
						</div>
						<div className="xui-form-box xui-mt-2">
							<label>Description</label>
							<textarea type={"text"} value={descriptionEdit} onChange={handleDescriptionEdit} required></textarea>
						</div>
						{
							showEditOfferDetailsStatus ? 
							<>
								<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorEditOffer}</span></p>
								<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successEditOffer}</span></p>
							</> : ""
						}
						<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
							<button disabled={showEditOfferCriteriaStatus || showEditOfferLimitStatus} onClick={handleEditOfferDetails} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Update details</span>
								{
									showEditOfferDetailsStatus && loadingEditOffer ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
					</form>
					<form className="xui-form" layout="2" onSubmit={(e) => e.preventDefault()}>
						<div className="psc-broken-line-text xui-opacity-4">
							<span className="xui-font-sz-80 xui-font-w-700">Limit</span>
						</div>
						<div className="xui-form-box xui-mt-2">
							<label>Offer Limit</label>
							<input type={"number"} value={offerLimitEdit} onChange={handleOfferLimitEdit} placeholder="Enter limit" ></input>
						</div>
						{
							showEditOfferLimitStatus ? 
							<>
								<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorEditOffer}</span></p>
								<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successEditOffer}</span></p>
							</> : ""
						}
						<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
							<button disabled={showEditOfferCriteriaStatus || showEditOfferDetailsStatus} onClick={handleEditOfferLimit} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Update limit</span>
								{
									showEditOfferLimitStatus && loadingEditOffer ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
					</form>
					<form className="xui-form" layout="2" onSubmit={(e) => e.preventDefault()}>
						<div className="psc-broken-line-text xui-opacity-4">
							<span className="xui-font-sz-80 xui-font-w-700">Criteria</span>
						</div>
						<div className="xui-d-grid xui-grid-col-1 xui-lg-grid-col-2 xui-md-grid-col-2 xui-grid-gap-1 xui-mt-1">
							<div className="xui-form-box">
								<label>Points</label>
								<input type={"number"} value={pointsEdit} onChange={handlePointsEdit} placeholder="Minimum points" required ></input>
							</div>
							<div className="xui-form-box">
								<label>Star</label>
								<input type={"number"} value={starEdit} onChange={handleStarEdit} placeholder="Minimum star" required ></input>
							</div>
						</div>
						{
							showEditOfferCriteriaStatus ? 
							<>
								<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorEditOffer}</span></p>
								<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successEditOffer}</span></p>
							</> : ""
						}
						<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
							<button disabled={showEditOfferDetailsStatus || showEditOfferLimitStatus} onClick={handleEditOfferCriteria} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Update criteria</span>
								{
									showEditOfferCriteriaStatus && loadingEditOffer ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
					</form>
				</div>
			</section>
			<section className='xui-modal' xui-modal="deleteOffer" id="deleteOffer">
				<div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
					<center>
						<h1>Delete Offer</h1>
						<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Are you sure you want to cotinue with this action?</p>
					</center>
					<p className="xui-font-sz-100 xui-my-1 xui-mt-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorDeleteOffer}</span></p>
					<p className="xui-font-sz-100 xui-my-1 xui-mt-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successDeleteOffer}</span></p>
					<div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
						<div className="xui-d-inline-flex xui-flex-ai-center">
							<button onClick={handleDeleteOffer} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Yes</span>
								{
									loadingDeleteOffer ?
										<Loading width="12" height="12" />
										: <Check width="20" height="20" />
								}
							</button>
						</div>
						<div className="xui-d-inline-flex xui-flex-ai-center">
							<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingDeleteOffer ? "" : "deleteOffer"}>
								<span className="xui-mr-half">No</span>
								<Close width="20" height="20" />
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}