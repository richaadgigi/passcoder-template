import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import Content from '../components/Content';
import Arrowright from '../icons/Arrowright';
import Arrowleft from '../icons/Arrowleft';
import {  getPlatformTokens } from "../api/tokens";
import useCookie from "../hooks/useCookie";
import { config } from "../config";
import { useAddToken, useDeleteToken, useEditToken, useResetToken } from "../hooks/useTokens";
import Loading from "../icons/Loading";
import Close from "../icons/Close";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";
import Reset from "../icons/Reset";
import Check from "../icons/Check";

export default function Teams() {
	const { cookie, forceLogout } = useCookie(config.token, "");
	const {
		alias, errorAddToken, expiration, handleAlias, handleExpiration, handleSubmit, handleValid, loading,
		removeAddTokenModal, setRemoveAddTokenModal, successAddToken, valid
	} = useAddToken();

	const {
		errorDeleteToken, handleDeleteToken, loadingDeleteToken, removeDeleteTokenModal, successDeleteToken, 
		setDeleteTokenUniqueId, setRemoveDeleteTokenModal
	} = useDeleteToken();

	const {
		aliasEdit, errorEditToken, expirationEdit, handleAliasEdit, handleEditToken, handleExpirationEdit, successEditToken, 
		handleValidEdit, loadingEditToken, removeEditTokenModal, setEditTokenUniqueId, setRemoveEditTokenModal, setValidEdit, 
		validEdit, setAliasEdit, setExpirationEdit
	} = useEditToken();

	const {
		errorResetToken, handleResetToken, loadingResetToken, removeResetTokenModal, setRemoveResetTokenModal, 
		setResetTokenUniqueId, successResetToken
	} = useResetToken();

	const return_expiration_reverse = (expiration) => {
		let _expiration = expiration.split(" ");
		return _expiration[0] + "T" + _expiration[1];
	};
	
	const [allTokens, setAllTokens] = useState(null);
	const [errorAllTokens, setErrorAllTokens] = useState(null);
	const [loadingAllTokens, setLoadingAllTokens] = useState(false);

	const [size, setSize] = useState(20);
	const [page, setPage] = useState(1);

	const handleSize = (e) => { e.preventDefault(); setSize(e.target.value); setPage(1); getAllTokens(page, e.target.value); };

	async function previousTokens() {
		if (page !== 1) setPage(page - 1);
		if (page !== 1) getAllTokens(page - 1, size);
	};

	async function nextTokens() {
		if (page < allTokens.data.pages) setPage(page + 1);
		if (page < allTokens.data.pages) getAllTokens(page + 1, size);
	};

	async function getAllTokens(_page, _size) {
		setLoadingAllTokens(true);
		const response = await getPlatformTokens(cookie, (_page || page), (_size || size));
		setAllTokens(response.data);
		if (response.response_code === 403) forceLogout();
		if (response.error) setErrorAllTokens(response.error.response.data.message);
		setLoadingAllTokens(false);
	};

	useEffect(() => {
		if (allTokens === null) {
			getAllTokens();
		}
	}, [allTokens]);

	if (removeAddTokenModal) {
		const modalResponse = document.querySelector("#addToken");
		modalResponse.setAttribute("display", false);
		getAllTokens();
		setRemoveAddTokenModal(null);
	}
	if (removeEditTokenModal) {
		const modalResponse = document.querySelector("#editToken");
		modalResponse.setAttribute("display", false);
		getAllTokens();
		setRemoveEditTokenModal(null);
	}
	if (removeResetTokenModal) {
        const modalResponse = document.querySelector("#resetToken");
        modalResponse.setAttribute("display", false);
		getAllTokens();
        setRemoveResetTokenModal(null);
    }
	if (removeDeleteTokenModal) {
		const modalResponse = document.querySelector("#deleteToken");
		modalResponse.setAttribute("display", false);
		getAllTokens();
		setRemoveDeleteTokenModal(null);
	}
	return (
		<>
			<Screen aside="false" navbar="false">
				<Content>
					<Navbar placeholder="Search something..." makeHidden={true} />
					<section className=''>
						<div className='xui-d-flex xui-flex-ai-center xui-flex-jc-space-between xui-py-1 psc-section-header'>
							<div className="xui-mb-1">
								<h1 className='xui-font-sz-110 xui-font-w-normal'>All Team Members</h1>
								<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">View, add and edit your team member's login tokens</p>
							</div>
							<div className="xui-mb-1">
								<div className='xui-d-inline-flex'>
									<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-80" xui-modal-open="addToken">
										<span>Add Member</span>
									</button>
								</div>
							</div>
						</div>
						{
							loadingAllTokens ?
								<center className='xui-font-sz-110 xui-py-3'><Loading width="12" height="12" /></center> :
								(
									allTokens && allTokens.success ?
										<div className='xui-table-responsive'>
											<table className='xui-table xui-font-sz-90'>
												<thead>
													<tr className='xui-text-left xui-opacity-6'>
														<th className='xui-min-w-200'>Alias</th>
														<th className='xui-min-w-150'>Token</th>
														<th className='xui-min-w-100'>Validity</th>
														<th className='xui-min-w-200'>Expiration</th>
														<th className='xui-min-w-300'>Date</th>
														<th className='xui-min-w-200'>Actions</th>
													</tr>
												</thead>
												<tbody>
													{allTokens.data.rows.map((data, i) => (
														<tr className='' key={i}>
															<td className='xui-opacity-5'>
																<div className='xui-d-inline-flex xui-flex-ai-center'>
																	<p>{data.alias}</p>
																</div>
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																<span>{data.token}</span>
															</td>
															<td className='xui-opacity-5'>
																{
																	data.valid ?
																		<span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>Valid</span> : 
																		<span className='xui-badge xui-badge-danger xui-font-sz-80 xui-bdr-rad-half'>Invalid</span>
																}
															</td>
															<td className='xui-opacity-5 xui-font-w-bold'>
																{
																	data.expiration ? 
																		<span>{data.expiration}</span> :
																		<span className='xui-badge xui-badge-success xui-font-sz-80 xui-bdr-rad-half'>No expiration</span>
																}
															</td>
															<td className='xui-opacity-5'>
																<span>{data.updatedAt.date} at {data.updatedAt.time}</span>
															</td>
															<td className=''>
																<div className="xui-d-flex xui-grid-gap-1">
																	<button title="Edit Member Details" onClick={() => { setEditTokenUniqueId(data.unique_id); setAliasEdit(data.alias); setValidEdit(data.valid); setExpirationEdit(data.expiration === null ? "" : return_expiration_reverse(data.expiration)) }} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-50" xui-modal-open="editToken">
																		<Edit width="20" height="20" />
																	</button>
																	<button title="Reset Member Token" onClick={() => { setResetTokenUniqueId(data.unique_id); }} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-50" xui-modal-open="resetToken">
																		<Reset width="20" height="20" />
																	</button>
																	<button title="Delete Member Token" onClick={() => { setDeleteTokenUniqueId(data.unique_id); }} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-50" xui-modal-open="deleteToken">
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
													<h3 className="xui-font-sz-120 xui-font-w-normal xui-mt-half">{errorAllTokens}</h3>
												</center>
											</div>
										</div>
								)
						}
						{
							loadingAllTokens ?
								<Loading width="12" height="12" /> :
								(
									allTokens && allTokens.success ?
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
												<span><span className='xui-font-w-bold'>{page}</span> of {allTokens ? allTokens.data.pages : "..."}</span>
											</div>
											<div className='xui-d-inline-flex xui-flex-ai-center xui-mx-1'>
												<div className='xui-mr-half xui-cursor-pointer' title="Previous" onClick={previousTokens}>
													<Arrowleft width="18" height="18" />
												</div>
												<div className='xui-ml-half xui-cursor-pointer' title="Next" onClick={nextTokens}>
													<Arrowright width="18" height="18" />
												</div>
											</div>
										</div> :
										""
								)
						}
					</section>
				</Content>
			</Screen>
			<section className='xui-modal' xui-modal="addToken" id="addToken">
				<div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
					<div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="addToken">
						<Close width="24" height="24" />
					</div>
					<h1>Create new member</h1>
					<form className="xui-form" layout="2" onSubmit={handleSubmit}>
						<div className="xui-form-box xui-mt-2">
							<label>Alias</label>
							<input className="xui-font-sz-90" type="text" value={alias} onChange={handleAlias} required placeholder="Enter member's name"></input>
						</div>
						<div className="xui-form-box xui-mt-2">
							<label>Expiration</label>
							<input className="xui-font-sz-90" type={"datetime-local"} value={expiration} onChange={handleExpiration}></input>
						</div>
						<div className="xui-form-box xui-d-flex xui-mt-half">
							<div className="xui-d-inline-flex xui-flex-ai-center">
								<input type="checkbox" onChange={handleValid} checked={valid} id="valid" />
								<label for="valid" className="xui-ml-half" style={{ marginBottom: '0' }}>Valid</label>
							</div>
						</div>
						<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
							<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Save member</span>
								{
									loading ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
					</form>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorAddToken}</span></p>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successAddToken}</span></p>
				</div>
			</section>
			<section className='xui-modal' xui-modal="editToken" id="editToken">
				<div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
					<div className="xui-w-40 xui-h-40 xui-bdr-rad-circle xui-d-flex xui-flex-ai-center xui-flex-jc-center psc-bg xui-text-white psc-modal-close" xui-modal-close="editToken">
						<Close width="24" height="24" />
					</div>
					<h1>Edit member details</h1>
					<form className="xui-form" layout="2" onSubmit={handleEditToken}>
						<div className="xui-form-box xui-mt-2">
							<label>Alias</label>
							<input className="xui-font-sz-90" type="text" value={aliasEdit} onChange={handleAliasEdit} required placeholder="Enter member's name"></input>
						</div>
						<div className="xui-form-box xui-mt-2">
							<label>Expiration</label>
							<input className="xui-font-sz-90" type={"datetime-local"} value={expirationEdit} onChange={handleExpirationEdit}></input>
						</div>
						<div className="xui-form-box xui-d-flex xui-mt-half">
							<div className="xui-d-inline-flex xui-flex-ai-center">
								<input type="checkbox" onChange={handleValidEdit} checked={validEdit} id="validEdit" />
								<label for="validEdit" className="xui-ml-half" style={{ marginBottom: '0' }}>Valid</label>
							</div>
						</div>
						<div className="xui-form-box xui-d-flex xui-flex-jc-flex-end">
							<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-blue xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Save changes</span>
								{
									loadingEditToken ?
										<Loading width="12" height="12" />
										: <Arrowright width="12" height="12" />
								}
							</button>
						</div>
					</form>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorEditToken}</span></p>
					<p className="xui-font-sz-100 xui-my-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successEditToken}</span></p>
				</div>
			</section>
			<section className='xui-modal' xui-modal="resetToken" id="resetToken">
				<div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
					<center>
						<h1>Reset Member Token</h1>
						<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Are you sure you want to cotinue with this action?</p>
					</center>
					<p className="xui-font-sz-100 xui-my-1 xui-mt-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorResetToken}</span></p>
					<p className="xui-font-sz-100 xui-my-1 xui-mt-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successResetToken}</span></p>
					<div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
						<div className="xui-d-inline-flex xui-flex-ai-center">
							<button onClick={handleResetToken} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Yes</span>
								{
									loadingResetToken ?
										<Loading width="12" height="12" />
										: <Check width="20" height="20" />
								}
							</button>
						</div>
						<div className="xui-d-inline-flex xui-flex-ai-center">
							<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingResetToken ? "" : "resetToken"}>
								<span className="xui-mr-half">No</span>
								<Close width="20" height="20" />
							</button>
						</div>
					</div>
				</div>
			</section>
			<section className='xui-modal' xui-modal="deleteToken" id="deleteToken">
				<div className='xui-modal-content xui-max-h-500 xui-overflow-auto xui-pos-relative'>
					<center>
						<h1>Delete Member Token</h1>
						<p className="xui-opacity-5 xui-font-sz-90 xui-mt-half">Are you sure you want to cotinue with this action?</p>
					</center>
					<p className="xui-font-sz-100 xui-my-1 xui-mt-1 xui-text-center xui-text-red"><span className="xui-font-w-bold psc-text-red">{errorDeleteToken}</span></p>
					<p className="xui-font-sz-100 xui-my-1 xui-mt-1 xui-text-center xui-text-green"><span className="xui-font-w-bold psc-text-red">{successDeleteToken}</span></p>
					<div className="xui-d-flex xui-flex-ai-center xui-flex-jc-space-evenly xui-mt-2">
						<div className="xui-d-inline-flex xui-flex-ai-center">
							<button onClick={handleDeleteToken} className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-green xui-bdr-rad-half xui-font-sz-85">
								<span className="xui-mr-half">Yes</span>
								{
									loadingDeleteToken ?
										<Loading width="12" height="12" />
										: <Check width="20" height="20" />
								}
							</button>
						</div>
						<div className="xui-d-inline-flex xui-flex-ai-center">
							<button className="xui-d-inline-flex xui-flex-ai-center xui-btn psc-btn-red xui-bdr-rad-half xui-font-sz-85" xui-modal-close={loadingDeleteToken ? "" : "deleteToken"}>
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